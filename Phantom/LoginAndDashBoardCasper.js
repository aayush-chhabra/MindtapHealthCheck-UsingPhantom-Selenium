phantom.casperPath = '/usr/local/Cellar/casperjs/1.1-beta3/libexec/';
phantom.injectJs(phantom.casperPath + '/bin/bootstrap.js');

phantom.casperTest = true;

var x = require('casper').selectXPath;
var webPage = require('webpage').create(),
    system = require('system'),
    casper = require('casper').create();


var links = [];
var linksOpenTime = [];
var lpnOnThePage = [];
var mindAppsOnThePage = [];
var StartTime;

if (!Date.prototype.toISOString) {
    Date.prototype.toISOString = function() {
        function pad(n) {
            return n < 10 ? '0' + n : n;
        }

        function ms(n) {
            return n < 10 ? '00' + n : n < 100 ? '0' + n : n
        }
        return this.getFullYear() + '-' +
            pad(this.getMonth() + 1) + '-' +
            pad(this.getDate()) + 'T' +
            pad(this.getHours()) + ':' +
            pad(this.getMinutes()) + ':' +
            pad(this.getSeconds()) + '.' +
            ms(this.getMilliseconds()) + 'Z';
    }
}


function createHAR(address, title, startTime, resources) {
    var entries = [];

    resources.forEach(function(resource) {
        var request = resource.request,
            startReply = resource.startReply,
            endReply = resource.endReply;

        if (!request || !startReply || !endReply) {
            return;
        }

        // Exclude Data URI from HAR file because
        // they aren't included in specification
        if (request.url.match(/(^data:image\/.*)/i)) {
            return;
        }

        entries.push({
            startedDateTime: request.time.toISOString(),
            time: endReply.time - request.time,
            request: {
                method: request.method,
                url: request.url,
                httpVersion: "HTTP/1.1",
                cookies: [],
                headers: request.headers,
                queryString: [],
                headersSize: -1,
                bodySize: -1
            },
            response: {
                status: endReply.status,
                statusText: endReply.statusText,
                httpVersion: "HTTP/1.1",
                cookies: [],
                headers: endReply.headers,
                redirectURL: "",
                headersSize: -1,
                bodySize: startReply.bodySize,
                content: {
                    size: startReply.bodySize,
                    mimeType: endReply.contentType
                }
            },
            cache: {},
            timings: {
                blocked: 0,
                dns: -1,
                connect: -1,
                send: 0,
                wait: startReply.time - request.time,
                receive: endReply.time - startReply.time,
                ssl: -1
            },
            webPageref: address
        });
    });

    return {
        log: {
            version: '1.2',
            creator: {
                name: "PhantomJS",
                version: phantom.version.major + '.' + phantom.version.minor +
                    '.' + phantom.version.patch
            },
            webPages: [{
                startedDateTime: startTime.toISOString(),
                id: address,
                title: title,
                webPageTimings: {
                    onLoad: webPage.endTime - webPage.startTime
                }
            }],
            entries: entries
        }
    };
}

function pageLoad() {
    var startTime, endTime;

    casper.on('remote.message', function(message) {
        links.push(message);
    });

    casper.on("onResourceRequested", function() {
        console.log("req");
    });

    casper.on("onResourceReceived", function() {
        console.log("res");
    });

    var loginLoadStartTime, loginLoadEndTime;

    casper.start('http://qae-ng.cengage.com/static/nb/login.html', function(status) {
        //this.echo(this.getTitle());
        loginLoadStartTime = new Date().getTime();
    });

    casper.waitUntilVisible(x(".//*[@id='_username_id']"), function() {
        //this.echo(this.getCurrentUrl());
        loginLoadEndTime = new Date().getTime();
        console.log(loginLoadEndTime - loginLoadStartTime);
        this.sendKeys({
            type: 'xpath',
            path: ".//*[@id='_username_id']"
        }, 'sanat.chugh@cengage.com');

        this.sendKeys({
            type: 'xpath',
            path: ".//*[@id='_password_id']"
        }, 'Cengage1');
    }, function timeout() {
        console.log("50000");
        console.log("50000");
        console.log("10");
        for(var i=0;i<10;i++)
            console.log("50000");
        casper.exit();
    }, 10000);


    casper.waitUntilVisible(x(".//*[@id='loginForm']/div/div[2]/p/input"), function() {
        this.thenClick(x(".//*[@id='loginForm']/div/div[2]/p/input"));
        startTime = new Date().getTime();
    }, function timeout() {
        console.log("50000");
        console.log("50000");
        console.log("10");
        for(var i=0;i<10;i++)
            console.log("50000");
        casper.exit();
    }, 10000);


    casper.waitUntilVisible(".title", function() {
        endTime = new Date().getTime();
        console.log(endTime - startTime);
        this.evaluate(function() {
            var elements = __utils__.findAll('.title');
            Array.prototype.forEach.call(elements, function(e) {
                console.log(e);
            });
        });
        console.log(links.length);
    }, function timeout() {
        console.log("50000");
        console.log("10");
        for(var i=0;i<10;i++)
            console.log("50000");
        casper.exit();
    }, 10000);

    casper.then(function() {

        for (var i = 0; i < links.length; i++) { 
            StartTime = new Date().getTime();
            
            this.thenOpen(links[i], function() {
                
                casper.waitUntilVisible(x(".//*[@id='nb_lpNav']/div"), function() {
                    var EndTime;
                    EndTime = new Date().getTime();
                    linksOpenTime.push((EndTime - StartTime));
                    
                    console.log(EndTime - StartTime);
                    EndTime = null;
                    StartTime = new Date().getTime();
                }, function timeout(){
                    console.log("50000");
                },10000);

            });

        }
    });

    casper.run();
}

pageLoad();