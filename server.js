/* Main application entry file. The order of loading is important.
 * Configuration loading and booting of controllers and custom error handlers */

var express = require('express'),
	fs = require('fs'),
	sklonovani = require('./routes/sklonovani'),
	allowCrossDomain = require('./middleware/allowCrossDomain.js');

var app = express();

app.use(express.static('public'));
// set views path, template engine and default layout
app.set('views', 'views');
app.set('view engine', 'jade');

//app.use(express.logger());
app.use(express.compress());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(allowCrossDomain());
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

var port = process.env.PORT || 4444;
app.listen(port);
console.log('Listening on port ' + port);

app.get('/', sklonovani.findOne);
app.get('/:id', sklonovani.findOne);
app.post('/', sklonovani.findOne);
app.post('/:id', sklonovani.findOne);
