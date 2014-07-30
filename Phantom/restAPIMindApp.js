
var http = require('http');
http.createServer(function (req, res) {
  var body = "";
  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', function () {
    console.log('JSON Object: ' + body);
    res.writeHead(200);
    res.end("I got the Data!!");
  });
}).listen(8080);
