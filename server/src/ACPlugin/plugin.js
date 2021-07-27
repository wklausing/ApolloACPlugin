const { UserInputError, ForbiddenError } = require('apollo-server');
const yaml = require('js-yaml');
const fs = require('fs');

let ruleMap = new Map(); // Contains all rules in rules.json
let cachedDecision = new Map();	// Saves rule outcomes for each request, so rules won't have to be verified multiple times 

let log = null;	// logging variable
let start, end = 0; // For logging purposes

// Policies - what action to take if a rule is broken
const ControlPolicy = {
	EMPTYSTRING: "EMPTYSTRING",
	DELETE: "DELETE",
	BLOCKREQUEST: "BLOCKREQUEST",
	APPROVED: "APPROVED"
}

// Access Control based on request header information
class HeaderRule {
	constructor(policy, operation, comparison, value, error) {
		this.policy = policy;
		this.operation = operation;
		this.comparison = comparison;
		this.value = value;
		this.error = error;
	}
}

// Access control based on purpose (given via GraphQL Variable)
class PurposeRule {
	constructor(policy, purpose, exception, error) {
		this.policy = policy;
		this.purpose = purpose;
		this.exception = exception;
		this.error = error;
	}
}

processRulesJSON(); // Loads rule.json

let purposes = null;
let allPurposes = [];


module.exports = (logging) => {
	return {
		serverWillStart() {
			if(logging) {
				log = require('simple-node-logger').createSimpleFileLogger('time_with_AC.log');
				log.setLevel('info');
			}
			try {
				// Read purpose.yml and load the purpose tree
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
				if(logging) start =  process.hrtime.bigint();
				if (purposes != null) {
					let validation = purposeExist(requestContext.request);
					if (!validation)
						throw new UserInputError('Purpose invalid');
				}
				if (ruleMap["*"] != undefined)
					ruleMap["*"].forEach(element => {
						if (element.policy != verifyRule(requestContext, element)) {
							// block request
							switch (element.error) {
								case ControlPolicy.EMPTYSTRING:
									requestContext.request.query = undefined;
									break;
								case ControlPolicy.DELETE:
									requestContext.request.query = undefined;
									break;
								case ControlPolicy.BLOCKREQUEST:
									throw new ForbiddenError("Bad Request");
							}
						}
					});
				return {
					willSendResponse(requestContext) {
						// Edit response json if necessary
						deepFilter(requestContext.response.data, requestContext);

						// Reset cached decisions
						cachedDecision = new Map();

						// Log if activated
						if(logging) {
							end =  process.hrtime.bigint();
							log.info(end-start);
						}
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
	if (request.variables.Purpose == undefined) return false;
	return validPurpose(request.variables.Purpose.toUpperCase());
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
				if(cachedDecision[element] != null) {
					// Get previous verification outcome
					processValidation(cachedDecision[element], obj, element, false);
				} else {
					// Verify and edit value if necessary
					ruleMap[element].forEach(rule => {
						if(rule.policy != verifyRule(requestContext, rule)) {
							processValidation(rule.error, obj, element, true);
						} else {
							cachedDecision[element] = ControlPolicy.APPROVED;
						}
					});
				}
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
error: what policy to process
obj: response json
element: response field
cache: whether to add into cached decisions or not

Functionality
----------
Changes response json depending on the error var
**/
function processValidation(error, obj, element, cache) {
	switch (error) {
		case ControlPolicy.APPROVED:
			if(cache) cachedDecision[element] = ControlPolicy.APPROVED;
			break;
		case ControlPolicy.EMPTYSTRING:
			if(cache) cachedDecision[element] = ControlPolicy.EMPTYSTRING;
			obj[element] = "";
			break;
		case ControlPolicy.DELETE:
			if(cache) 	cachedDecision[element] = ControlPolicy.DELETE;
			delete obj[element];
			break;
		case ControlPolicy.BLOCKREQUEST:
			cachedDecision = new Map();
			throw new ForbiddenError("Bad Request");
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
function processRulesJSON() {
	let rules = require('./rules.json');
	rules.forEach(element => {
		let fields = Array.isArray(element.field) ? element.field : [element.field];
		let operation = getOperation(element);
		fields.forEach(field => {
			if (ruleMap[field] == null) {
				ruleMap[field] = [operation];
			} else {
				ruleMap[field].push(operation);
			}
		})
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
			let policy = element.policy ? element.policy.toUpperCase() == "ALLOW" ? true : false : true;
			return new HeaderRule(element.operation, element.compare, value, getError(element));
		case "PURPOSE":
			console.log("Purpose-Rule: " + element.purpose + " " + (element.exception ? element.exception : "null"));
			let purpose = Array.isArray(element.purpose) ? element.purpose : [element.purpose];
			purpose = purpose.map(function(x){ return x.toUpperCase(); })
			let exception = element.exception ? Array.isArray(element.exception) ? element.exception : [element.exception] : null;
			exception = exception.map(function(x){ return x.toUpperCase(); })
			let policyPurpose = element.policy ? element.policy.toUpperCase() == "ALLOW" ? true : false : true;
			return new PurposeRule(policyPurpose, purpose, exception, getError(element));
		default:
			console.log("unknown");
	}
}

/**
Parameters
----------
element: JSON Object

Functionality
----------
Returns the control policy (hide the value, delete it or return a forbidden)
**/
function getError(element) {
	if(element.error == undefined) return ControlPolicy.EMPTYSTRING;
	else {
		switch (element.error.toUpperCase()) {
			case "EMPTYSTRING":
				return ControlPolicy.EMPTYSTRING;
			case "DELETE":
				return ControlPolicy.DELETE;
			case "FORBIDDEN":
				return ControlPolicy.BLOCKREQUEST;
			default:
				console.log("Error doesn't exist: " + element.error);
				return ControlPolicy.EMPTYSTRING;
		}
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
		valid = verifyHeaderRule(headerInfo, rule);
	} 
	if(rule instanceof PurposeRule) {
		let purpose = requestContext.request.variables.Purpose.toUpperCase();
		valid = verifyPurposeRule(purpose, rule);
	}
	return valid;
}

/**
Parameters
----------
purpose: purpose string
rule: PurposeRule

Functionality
----------
Checks if the request meets the purpose rule's condition
 */
function verifyPurposeRule(purpose, rule) {
	let valid = false;
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
	return valid;
}

/**
Parameters
----------
headerInfo: header value
rule: HeaderRule

Functionality
----------
Checks if the request meets the header rule's condition
 */
function verifyHeaderRule(headerInfo, rule) {
	let valid = false;
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
	return valid;
}
