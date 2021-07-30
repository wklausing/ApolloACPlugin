const log = require('simple-node-logger').createSimpleFileLogger('time_without_AC.log');
log.setLevel('info');

module.exports = (options) => {
	return {
		requestDidStart(requestContext) {
			if (requestContext.request.operationName != 'IntrospectionQuery') {
				let start = process.hrtime.bigint();
				return {
					willSendResponse(requestContext) {
						let end = process.hrtime.bigint();
						log.info(end-start);
					}
				}
			}
		}

	};
};