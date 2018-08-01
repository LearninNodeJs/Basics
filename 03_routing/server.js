var app = require('./app');
var http = require('http');
http.createServer(app.handleRequest).listen(8000);