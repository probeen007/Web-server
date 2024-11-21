const http = require('http');

http.createServer(function(req, res){
res.write("Mero-link");
res.end();	

}).listen(3000);

console.log("Server started :) | Port:[3000]");

