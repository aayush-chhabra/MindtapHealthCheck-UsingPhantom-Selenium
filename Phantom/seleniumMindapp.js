var sys = require('sys');

var exec = require('child_process').exec;
var child;

// executes `sed`
child = exec("java -jar mindappSelenium.jar", function (error, stdout, stderr) {
	sys.print('stdout: ' + stdout);
	sys.print('stderr: ' + stderr);
	if (error !== null) {
		console.log('exec error: ' + error);
	}
});


