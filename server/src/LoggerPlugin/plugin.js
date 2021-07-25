const log = require('simple-node-logger').createSimpleFileLogger('noAC_time.log');
log.setLevel('info');

module.exports = (options) => {
	return {
		requestDidStart(requestContext) {
			if (requestContext.request.operationName != 'IntrospectionQuery') {
				let start = new Date().getTime();
				return {
					willSendResponse(requestContext) {
						let end = new Date().getTime();
						log.info(end-start);
					}
				}
			}
		}

	};
};