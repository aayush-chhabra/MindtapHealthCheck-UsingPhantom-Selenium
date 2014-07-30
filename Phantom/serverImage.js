//var seleniumMindapp = require('./seleniumMindapp.js');
var request = require('request');
var http = require('http');

var sys = require('sys');
var exec = require('child_process').exec;

var recievedJSON;

function sendJSONData() {

    var headers = {
        'Content-Type': 'application/json',
        'Content-Length': recievedJSON.length
    };

    var options = {
        host: 'localhost',
        port: 8080,
        path: '/',
        method: 'POST',
        headers: headers
    };

    var req = http.request(options, function(res) {
        res.setEncoding('utf-8');

        var responseString = '';

        res.on('data', function(data) {
            responseString += data;
        });

        res.on('end', function() {
            console.log(responseString);
        });
    });

    req.write(recievedJSON);
    req.end();

}


function repeatSendingData(){
	var populateJSON = exec("node seleniumMindapp.js", function(error, stdout, stderr){
		recievedJSON = stdout;
		sendJSONData();
	});
}

repeatSendingData();
setInterval(repeatSendingData, 300000);






