/* Main application entry file. The order of loading is important.
 * Configuration loading and booting of controllers and custom error handlers */

var express = require('express'),
	sklonovani = require('./routes/sklonovani');

var app = express();

//app.use(express.logger());
app.use(express.compress());
app.use(express.bodyParser());
app.use(express.methodOverride());
//app.use(allowCrossDomain());
app.use(app.router);
app.use(function(err, req, res, next){
  // logic for error handler
});

// control of favicon
app.get('/favicon.ico', function(req, res) {
	res.writeHead(200, {'Content-Type': 'image/x-icon'} );
	res.end();
	//console.log('favicon requested');
	return;
});

app.get('/', function(req, res){
	//console.log(req.ip);
	//console.log(req.originalUrl);	// path is without arguments
	res.send({working: 'ok'});
});

var port = process.env.PORT || 4444;
app.listen(port);
console.log('Listening on port ' + port);


app.get('/:id', sklonovani.findOne);