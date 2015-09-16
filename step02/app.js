var http = require('http'); //Require use for inculde node module, over here we includ http node module (installed builten with nodejs). 

var myServer = http.createServer(function(request,response){
//response.writeHead(200, {"Content-Type": "text/plain"});
//response.write("Hello");
response.writeHead(200, {"Content-Type": "text/html"});
response.write("<b>Hello</b> World!");
response.end();
}); //Create Server

//listen on port 3003
myServer.listen('3003');
console.log('Go to your browser and open http://localhost/3003/');
