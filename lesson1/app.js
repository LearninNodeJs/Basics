var http = require('http');
var module1 = require('./module1');
var module2 = require('./module2');

/*Here we use anonymous function, injecting the function directly instead
* of writing separate clauses of functions,and calling them later.*/

http.createServer(function (request,response) {
    response.writeHead(200,{'Content-Type':'text/plain'});
    response.write(module2.myVariable);
    module2.myFunction();
    response.end();
}).listen(8000);
