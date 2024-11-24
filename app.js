const http = require('http');

http.createServer(function(req, res){
res.write("Notice: Mero-link is Down For Moment Due To Internal Server Upgrade | Mentenance");
res.end();	

}).listen(3000);

console.log("Server started :) | Port:[3000]");

