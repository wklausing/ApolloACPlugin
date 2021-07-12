const yaml = require('js-yaml');
const fs = require('fs');

let rules = require('./rules.json');
let ruleMap = new Map();

processRules(rules);

let purposes = null;

class PurposeTree {
	constructor() {
		this.children = [];
		this.allPurposes = [];
	}
}

class PurposeNode {
	constructor(purpose, parent, root) {
		this.purpose = purpose;
		this.children = [];
		this.parent = parent;
		this.root = root;
	}
}

module.exports = (options) => {
	return {
		serverWillStart() {
			try {
				purposesYaml = yaml.load(fs.readFileSync(__dirname + '/purpose.yml', 'utf8'));
				purposes = new PurposeTree();
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
						if (!eval(element)) {
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

function createPurposeTree(purposesYaml) {
	Object.keys(purposesYaml.purpose).forEach(element => {
		purposes.allPurposes.push(element);
		iterateTree(purposesYaml.purpose[element]);
	});
	console.log("---");
	console.log(purposes.allPurposes)
	console.log("---");
}

function containsPurpose(purpose) {
	let exist = false;
	purposes.allPurposes.forEach(element => {
		if (element == purpose) exist = true;
	});
	return exist;
}

function iterateTree(purposeYaml) {
	if (Array.isArray(purposeYaml)) {
		purposeYaml.forEach(element => {
			if (typeof (element) == "string") {
				purposes.allPurposes.push(element.toUpperCase());
			} else {
				Object.keys(element).forEach(element2 => {
					purposes.allPurposes.push(element2.toUpperCase());
					iterateTree(element[element2]);
				});
			}
		});
	} else {
		Object.keys(purposesYaml).forEach(element => {
			purposes.allPurposes.push(element);
			iterateTree(purposesYaml[element]);
		});
	}
}

function deepFilter(obj, requestContext) {
	if (typeof (obj) == "object") {
		Object.keys(obj).forEach(element => {
			if (ruleMap[element] != null) {
				ruleMap[element].forEach(rule => {
					if (!eval(rule)) {
						obj[element] = "";
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

function blockRequest(requestContext) {
	console.log("Blocking request..");
	requestContext.request.query = null;
}

function processRules(rules) {
	rules.forEach(element => {
		if (ruleMap[element.field] == null) {
			ruleMap[element.field] = [getOperation(element)];
		} else {
			ruleMap[element.field].push(getOperation(element));
		}
	});
}

function purposeExist(request) {
	if (request.variables == undefined) return false;
	if (request.variables.purpose == undefined) return false;
	return containsPurpose(request.variables.purpose.toUpperCase());
}

function getOperation(element) {
	let val = element.value.toUpperCase();
	switch (element.operation.toUpperCase()) {
		case "CONTAINS":
			console.log("NEW RULE: requestContext.request.http.headers.get(\"" + element.compare + "\").toUpperCase().includes(\"" + val + "\")");
			return "requestContext.request.http.headers.get(\"" + element.compare + "\").toUpperCase().includes(\"" + val + "\")";
		case "EQUAL":
			console.log("NEW RULE: requestContext.request.http.headers.get(\"" + element.compare + "\") == \"" + val + "\"");
			return "requestContext.request.http.headers.get(\"" + element.compare + "\") == \"" + val + "\"";
		case "UNEQUAL":
			console.log("NEW RULE: requestContext.request.http.headers.get(\"" + element.compare + "\") != \"" + val + "\"");
			return "requestContext.request.http.headers.get(\"" + element.compare + "\") != \"" + val + "\"";
		case "GREATER":
			console.log("NEW RULE: requestContext.request.http.headers.get(\"" + element.compare + "\") > \"" + val + "\"");
			return "requestContext.request.http.headers.get(\"" + element.compare + "\") > \"" + val + "\"";
		case "LESS":
			console.log("NEW RULE: requestContext.request.http.headers.get(\"" + element.compare + "\") < \"" + val + "\"");
			return "requestContext.request.http.headers.get(\"" + element.compare + "\") < \"" + val + "\"";
		case "GEQ":
			console.log("NEW RULE: requestContext.request.http.headers.get(\"" + element.compare + "\") >= \"" + val + "\"");
			return "requestContext.request.http.headers.get(\"" + element.compare + "\") >= \"" + val + "\"";
		case "LEQ":
			console.log("NEW RULE: requestContext.request.http.headers.get(\"" + element.compare + "\") <= \"" + val + "\"");
			return "requestContext.request.http.headers.get(\"" + element.compare + "\") <= \"" + val + "\"";
		case "PURPOSE":
			console.log("NEW RULE: requestContext.request.variables.purpose.toUpperCase() == \"" + val + "\"");
			return "requestContext.request.variables.purpose.toUpperCase() == \"" + val + "\"";
		default:
			console.log("unknown");
	}
}
