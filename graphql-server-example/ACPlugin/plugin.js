let rules = require('./rules.json');
let ruleMap = new Map();
processRules(rules);


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

module.exports = (options) => {
  return {
		serverWillStart() {
		},
    requestDidStart(requestContext) {
			if(requestContext.request.operationName != 'IntrospectionQuery') {
				// See request header information
				//console.log(requestContext.request.http.headers);
				
				
				ruleMap["*"].forEach(element => {
					if(!eval(element)) {
						// block request
						console.log("false: " + element);
						requestContext.request.query = {};
					} else {
						// ignore
						console.log("true: " + element);
					}
				});
			}
		}
		
  };
};
