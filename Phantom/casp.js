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
    Date.prototype.toISOString = function () {
        function pad(n) { return n < 10 ? '0' + n : n; }
        function ms(n) { return n < 10 ? '00'+ n : n < 100 ? '0' + n : n }
        return this.getFullYear() + '-' +
            pad(this.getMonth() + 1) + '-' +
            pad(this.getDate()) + 'T' +
            pad(this.getHours()) + ':' +
            pad(this.getMinutes()) + ':' +
            pad(this.getSeconds()) + '.' +
            ms(this.getMilliseconds()) + 'Z';
    }
}


function createHAR(address, title, startTime, resources)
{
    var entries = [];

    resources.forEach(function (resource) {
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

function pageLoad(){
    var startTime, endTime;
    
    casper.on('remote.message', function(message) {
        links.push(message);
    });

    casper.on("onResourceRequested", function(){
        console.log("req");
    });

    casper.on("onResourceReceived", function(){
        console.log("res");
    });


    casper.start('http://qae-ng.cengage.com/static/nb/login.html', function() {
        this.echo(this.getTitle());
    });

    casper.then(function(){
             //this.echo(this.getCurrentUrl());
        this.sendKeys({
                    type: 'xpath',
                    path: ".//*[@id='_username_id']"
                }, 'sanat.chugh@cengage.com');
                
                this.sendKeys({
                    type: 'xpath',
                    path: ".//*[@id='_password_id']"
                }, 'Cengage1');
        });

    casper.then(function(){
                    this.test.assertExists({
                        type: 'xpath',
                        path: ".//*[@id='loginForm']/div/div[2]/p/input"
                    }, "Good, the input item actually exist");
                   this.thenClick(x(".//*[@id='loginForm']/div/div[2]/p/input"));
                   startTime = new Date().getTime();
                   //console.log(startTime);
            });

    casper.waitUntilVisible(".title", function() {
        endTime = new Date().getTime();
        console.log("Page Load Time for the admin dashboard :", endTime-startTime);
        this.evaluate(function() {
            var elements = __utils__.findAll('.title');
            Array.prototype.forEach.call(elements, function(e) {
                console.log(e);
            });
        });
        //console.log(links);
    });

    casper.then(function(){

        for(var i=0; i<links.length; i++)
        {   //console.log("initializing time!!");
            StartTime = new Date().getTime();
            // var StartTime = new Date().getTime();
            this.thenOpen(links[i],function(){
                //console.log("Opening the  page!!");
                casper.waitUntilVisible(x(".//*[@id='nb_lpNav']/div"), function() {
                    var EndTime;
                    EndTime = new Date().getTime();
                    linksOpenTime.push((EndTime-StartTime));
                    console.log(this.getCurrentUrl());
                    console.log(": ", (EndTime-StartTime));
                    //StartTime = null;
                    EndTime = null;
                    StartTime = new Date().getTime();
                });

            });

        }
    });

    casper.then(function(){
        StartTime = new Date().getTime();
        this.thenOpen(links[0],function(){
            casper.waitUntilVisible(".lpn_name a", function() {
                var currentURL = casper.getCurrentUrl();
                this.thenClick(".lpn_name a");
                casper.wait(350,function check(){
                        
                });
            });
            this.capture('google1.png');//, this.getElementBounds(".lpn_stacklist")); 
        });


    });


    casper.run();
    }




pageLoad();

