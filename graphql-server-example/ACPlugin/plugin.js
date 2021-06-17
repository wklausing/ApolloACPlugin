const yaml = require('js-yaml');
const fs   = require('fs');

let rules = require('./rules.json');
let ruleMap = new Map();
processRules(rules);

let purposes = null;

function processRules(rules) {
	rules.forEach(element => {
		if(ruleMap[element.field] == null) {
			ruleMap[element.field] = [getOperation(element)];
		} else {
			ruleMap[element.field].push(getOperation(element));
		}
	});
}

function getOperation(element) {
	switch(element.operation.toUpperCase()) {
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

function purposeExist(request) {
	if(request.variables == undefined) return false;
	if(request.variables.purpose == undefined) return false;
	return true;
}

function blockRequest(requestContext) {
	requestContext.request.query = undefined;
}

module.exports = (options) => {
  return {
		serverWillStart() {
			try {
				purposes = yaml.load(fs.readFileSync(__dirname + '/purpose.yml', 'utf8'));
				console.log("Purposes loaded:\n" + purposes);
			} catch (e) {
				console.log("No purpose in the correct format given");
			}
		},
    requestDidStart(requestContext) {
			if(requestContext.request.operationName != 'IntrospectionQuery') {
				// See request header information
				//console.log(requestContext.request.http.headers);
				if(purposes != null) {
					let validation = purposeExist(requestContext.request);
					if(!validation) 
						blockRequest(requestContext);
				}
				ruleMap["*"].forEach(element => {
					if(!eval(element)) {
						// block request
						console.log("false: " + element);
						requestContext.request.query = undefined;
					} else {
						// ignore
						console.log("true: " + element);
					}
				});
			}
		}
		
  };
};
