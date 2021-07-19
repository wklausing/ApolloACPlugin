const yaml = require('js-yaml');
const fs = require('fs');
let rules = require('./rules.json');
let ruleMap = new Map();

const ControlPolicy = {
	EMPTYSTRING: "EMPTYSTRING",
	DELETE: "DELETE",
	BLOCKREQUEST: "BLOCKREQUEST"
}

const policy = ControlPolicy.DELETE;

class HeaderRule {
	constructor(operation, comparison, value) {
		this.operation = operation;
		this.comparison = comparison;
		this.value = value;
	}
}

class PurposeRule {
	constructor(purpose, exception) {
		this.purpose = purpose;
		this.exception = exception;
	}
}

processRules(rules);

let purposes = null;
let allPurposes = [];


module.exports = (options) => {
	return {
		serverWillStart() {
			try {
				purposesYaml = yaml.load(fs.readFileSync(__dirname + '/purpose.yml', 'utf8'));
				purposes = new Map();
				createPurposeTree(purposesYaml);
			} catch (e) {
				console.log(e);
				console.log("No purpose in the correct format given");
			}
		},
		requestDidStart(requestContext) {
			if (requestContext.request.operationName != 'IntrospectionQuery') {
				// See request header information
				//console.log(requestContext.request.http.headers);

				if (purposes != null) {
					let validation = purposeExist(requestContext.request);
					if (!validation)
						blockRequest(requestContext);
				}
				if (ruleMap["*"] != undefined)
					ruleMap["*"].forEach(element => {
						if (!verifyRule(requestContext, element)) {
							// block request
							console.log("False: " + element);
							requestContext.request.query = undefined;
						} else {
							// ignore
							//console.log("true: " + element);
						}
					});
				return {
					willSendResponse(requestContext) {
						deepFilter(requestContext.response.data, requestContext);
					}
				}
			}
		}

	};
};

/**
Parameters
----------
purposesYaml: yml tree

Functionality
----------
Starts saving the yml tree into purposes
**/
function createPurposeTree(purposesYaml) {
	Object.keys(purposesYaml.purpose).forEach(element => {
		allPurposes.push(element.toUpperCase());
		let below = iterateTree(purposesYaml.purpose[element]);
		purposes.set(element.toUpperCase(), below);
	});
	console.log("---");
	console.log(purposes)
	console.log("---");
}

/**
Parameters
----------
purposesYaml: yml tree

Functionality
----------
Iterates the yml tree and saves all purposes in the var purposes
**/
function iterateTree(purposeYaml) {
	let below = [];
	if (Array.isArray(purposeYaml)) {
		purposeYaml.forEach(element => {
			if (typeof (element) == "string") {
				allPurposes.push(element.toUpperCase());
				purposes.set(element.toUpperCase(), []);
				below.push(element.toUpperCase());
			} else {
				Object.keys(element).forEach(element2 => {
					allPurposes.push(element2.toUpperCase());
					let lower = iterateTree(element[element2]);
					purposes.set(element2.toUpperCase(), lower);
					below.push(...lower);
				});
			}
		});
	} else {
		Object.keys(purposesYaml).forEach(element => {
			allPurposes.push(element.toUpperCase());
			let lower = iterateTree(purposesYaml[element]);
			purposes.set(element.toUpperCase(), lower);
			below.push(...lower);
		});
	}
	return below;
}

/**
Parameters
----------
purpose: JSON

Functionality
----------
Checks if a purpose was given as a request variable and verifies it
 */
function purposeExist(request) {
	if (request.variables == undefined) return false;
	if (request.variables.purpose == undefined) return false;
	return validPurpose(request.variables.purpose.toUpperCase());
}

/**
Parameters
----------
purpose: String

Functionality
----------
Checks if the purpose is valid (existing)
**/
function validPurpose(purpose) {
	let exist = false;
	allPurposes.forEach(element => {
		if (element == purpose) exist = true;
	});
	return exist;
}

function deepFilter(obj, requestContext) {
	if (typeof (obj) == "object") {
		Object.keys(obj).forEach(element => {
			if (ruleMap[element] != null) {
				ruleMap[element].forEach(rule => {
					if(!verifyRule(requestContext, rule)) {
						switch (policy) {
							case ControlPolicy.EMPTYSTRING:
								obj[element] = "";
								break;
							case ControlPolicy.DELETE:
								delete obj[element];
								break;
							case ControlPolicy.BLOCKREQUEST:
								console.log("TODO");
								break;
						}
						
					}
				});
			}
			deepFilter(obj[element], requestContext);
		})
	}
	if (typeof (obj) == "array") {
		obj.forEach(element => {
			deepFilter(element, requestContext);
		})
	}
}

/**
Parameters
----------
rules: JSON

Functionality
----------
Goes through the JSON array and adds the rules into ruleMap
**/
function processRules(rules) {
	rules.forEach(element => {
		if (ruleMap[element.field] == null) {
			ruleMap[element.field] = [getOperation(element)];
		} else {
			ruleMap[element.field].push(getOperation(element));
		}
	});
}

/**
Parameters
----------
element: JSON Object

Functionality
----------
Creates a rule object for the current element
**/
function getOperation(element) {
	switch (element.category.toUpperCase()) {
		case "HEADER":
			console.log("Header-Rule: " + element.operation + " " + element.compare + " " + element.value);
			let value = Array.isArray(element.value) ? element.value : [element.value];
			value = value.map(function(x){ return x.toUpperCase(); })
			return new HeaderRule(element.operation, element.compare, value);
		case "PURPOSE":
			console.log("Purpose-Rule: " + element.purpose + " " + (element.exception ? element.exception : "null"));
			let purpose = Array.isArray(element.purpose) ? element.purpose : [element.purpose];
			purpose = purpose.map(function(x){ return x.toUpperCase(); })
			let exception = element.exception ? Array.isArray(element.exception) ? element.exception : [element.exception] : null;
			exception = exception.map(function(x){ return x.toUpperCase(); })
			return new PurposeRule(purpose, exception);
		default:
			console.log("unknown");
	}
}

/**
Parameters
----------
Rule: HeaderRule or PurposeRule

Functionality
----------
Checks if the request meets the rule's condition
 */
function verifyRule(requestContext, rule) {
	let valid = false;
	if(rule instanceof HeaderRule) {
		let headerInfo = requestContext.request.http.headers.get(rule.comparison);
		if(headerInfo == null) 
			return false;
		headerInfo = headerInfo.toUpperCase();
		switch (rule.operation) {
			case "CONTAINS":
				valid = rule.value.some(v => {
					if(headerInfo.includes(v)) {
						return true;
					}
				});
				break;
			case "EQUAL":
				valid = rule.value.some(v => {
					if(headerInfo == v) {
						return true;
					}
				});
				break;
			case "UNEQUAL":
				valid = rule.value.some(v => {
					if(headerInfo != v) {
						return true;
					}
				});
				break;
			case "GREATER":
				valid = rule.value.some(v => {
					if(headerInfo > v) {
						return true;
					}
				});
				break;
			case "LESS":
				case "GREATER":
				valid = rule.value.some(v => {
					if(headerInfo < v) {
						return true;
					}
				});
				break;
			case "GEQ":
				case "GREATER":
				valid = rule.value.some(v => {
					if(headerInfo >= v) {
						return true;
					}
				});
				break;
			case "LEQ":
				case "GREATER":
				valid = rule.value.some(v => {
					if(headerInfo <= v) {
						return true;
					}
				});
				break;
		}
	} 
	if(rule instanceof PurposeRule) {
		let purpose = requestContext.request.variables.purpose.toUpperCase();

		// Check if the given purpose is an exception
		if(rule.exception != null) {
			let isException = false;
			rule.exception.every(ex => {
				if(ex == purpose) 
					isException = true;
					return true;
			})
			if(isException) return valid;
		}

		// Check if the given purpose is valid
		valid = rule.purpose.some(p => {
			if(purpose == p) {
				return true;
			}
			valid = purposes.get(p).some(p2 => {
				if(purpose == p2) {
					return true;
				}
			});
			if(valid) return true;
		});
	}
	return valid;
}

/**
Parameters
----------
requestContext: Object

Functionality
----------
Rejects the current request
**/
function blockRequest(requestContext) {
	console.log("Blocking request..");
	requestContext.request.query = null;
}