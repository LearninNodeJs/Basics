var url = require('url');
var fileSystem = require('fs');
function renderHtml(path,response){
    fileSystem.readFile(path,null,function(error,data){
       if(error){
           response.writeHead(404);
           reponse.write('File Not Found');
       } else{
           response.write(data);
       }
       response.end();
    });
}
module.exports = {
  handleRequest: function (request,response) {
      response.writeHead(200,{'Content-Type':'text/html'});
      var path = url.parse(request.url).pathname;
      switch(path){
          case '/':
              renderHtml('./index.html',response);
              break;
          case '/login':
              renderHtml('./login.html',response);
              break;
          default:
              response.writeHead(404);
              response.write('Route Not Defined');
              response.end();
      }
  }
};
