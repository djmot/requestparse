var express = require('express');
var path = require('path');
var UAParser = require('ua-parser-js');
var parser = new UAParser();
var app = express();

app.get('/whoami', function(request, response) {
    var parsedUA = parser.setUA(request.headers['user-agent']).getResult();
    var userInfo = {
        'ipaddress':    request.ip,
        'language':     request.acceptsLanguages()[0],
        'software':     parsedUA.os.name + ' ' + parsedUA.os.version
    };
    response.writeHead(200, { 'Content-Type' : 'application/json' });
    response.end(JSON.stringify(userInfo));
});

app.get('*', function(request, response) {
    response.sendFile(path.join(__dirname, '/about.html'));
});

app.listen(process.env.PORT, process.env.IP);
console.log("Listening on port " + process.env.PORT);
