var http = require('http');
var fileSystem = require('fs');
/*The FileSystem library {fs} is predefined in the node-js core library
* It opens up files.*/


http.createServer(function(request,response){
    response.writeHead(200,{'Content-Type':'text/html'});
    fileSystem.readFile('./index.html',null,function(error,data){
        if(error){
            response.writeHead(404);
            response.write('File Not Found');
        }else{
            response.write(data);
        }
        response.end();
    });
}).listen(8000);