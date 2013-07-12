// the middleware function
module.exports = function() {
    return function(req, res, next) {
		// IE8 does not allow domains to be specified, just the *
		// res.headers('Access-Control-Allow-Origin', req.headers.origin);
		res.header('Access-Control-Allow-Origin', '*'); //config.allowedDomains
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header('Access-Control-Allow-Headers', 'X-Requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Authorization, X-Mindflash-SessionID');

		// intercept OPTIONS method
		if ('OPTIONS' === req.method) {
			res.send(200);
		}
		else {
			next();
		}
	};
};
