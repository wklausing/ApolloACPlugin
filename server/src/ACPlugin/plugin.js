const yaml = require('js-yaml');
const fs = require('fs');

let rules = require('./rules.json');
let ruleMap = new Map();

processRules(rules);

let purposes = null;

module.exports = (options) => {
	return {
		serverWillStart() {
			try {
				//purposes = yaml.load(fs.readFileSync(__dirname + '/purpose.yml', 'utf8'));
				//console.log("Purposes loaded:\n" + Object.keys(purposes["purpose"]));
				//console.log(JSON.stringify(purposes, null, 2));
			} catch (e) {
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

function deepFilter(obj, requestContext) {
	if(typeof(obj) == "object") {
		Object.keys(obj).forEach(element => {
			if(ruleMap[element] != null) {
				ruleMap[element].forEach(rule => {
					if(!eval(rule)) {
						obj[element] = "";
					}
				});
			}
			deepFilter(obj[element], requestContext);
		})
	}
	if(typeof(obj) == "array") {
		obj.forEach(element => {
			deepFilter(element, requestContext);
		})
	}
}

function blockRequest(requestContext) {
	console.log("Blocking request..");
	requestContext.request.query = undefined;
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
	return true;
}

function getOperation(element) {
	switch (element.operation.toUpperCase()) {
		case "CONTAINS":
			console.log("NEW RULE: requestContext.request.http.headers.get(\"" + element.compare + "\").includes(\"" + element.value + "\")");
			return "requestContext.request.http.headers.get(\"" + element.compare + "\").includes(\"" + element.value + "\")";
			break;
		case "EQUAL":
			console.log("NEW RULE: requestContext.request.http.headers.get(\"" + element.compare + "\") == \"" + element.value + "\"");
			return "requestContext.request.http.headers.get(\"" + element.compare + "\") == \"" + element.value + "\"";
			break;
		case "UNEQUAL":
			console.log("NEW RULE: requestContext.request.http.headers.get(\"" + element.compare + "\") != \"" + element.value + "\"");
			return "requestContext.request.http.headers.get(\"" + element.compare + "\") != \"" + element.value + "\"";
			break;
		case "GREATER":
			console.log("NEW RULE: requestContext.request.http.headers.get(\"" + element.compare + "\") > \"" + element.value + "\"");
			return "requestContext.request.http.headers.get(\"" + element.compare + "\") > \"" + element.value + "\"";
			break
		case "LESS":
			console.log("NEW RULE: requestContext.request.http.headers.get(\"" + element.compare + "\") < \"" + element.value + "\"");
			return "requestContext.request.http.headers.get(\"" + element.compare + "\") < \"" + element.value + "\"";
			break;
		case "GEQ":
			console.log("NEW RULE: requestContext.request.http.headers.get(\"" + element.compare + "\") >= \"" + element.value + "\"");
			return "requestContext.request.http.headers.get(\"" + element.compare + "\") >= \"" + element.value + "\"";
			break;
		case "LEQ":
			console.log("NEW RULE: requestContext.request.http.headers.get(\"" + element.compare + "\") <= \"" + element.value + "\"");
			return "requestContext.request.http.headers.get(\"" + element.compare + "\") <= \"" + element.value + "\"";
			break;
		default:
			console.log("unknown");
	}
}
