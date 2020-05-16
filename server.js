var express = require('express');
var app = express();

var port = process.env.PORT || 8080;
var sslRedirect = require('heroku-ssl-redirect');

app.use(sslRedirect());

app.use(express.static(__dirname + '/Views'));
app.use('/libs',  express.static(__dirname + '/libs'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('index.html');
});

app.listen(port);
