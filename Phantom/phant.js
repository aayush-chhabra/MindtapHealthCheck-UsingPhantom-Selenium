var page = require('webpage').create(),
            system = require('system');


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
page.onConsoleMessage = function(msg) {
    //console.log(msg);
        console.log(msg);
};

page.resources = [];
page.open("http://qae-ng.cengage.com/static/nb/login.html", function(status) {
    
    // var loadCheckInterval,
    //     fullyLoaded;
    // var clearCheckInterval = function(){

    //     clearInterval(loadCheckInterval);
    //     loadCheckInterval = null;

    // };

    if ( status === "success" ) {

        page.onLoadStarted = function () {
            page.startTime = new Date();
        };

    	page.onResourceRequested = function (req) {
            
    		page.resources[req.id] = {
            request: req,
            startReply: null,
            endReply: null
        };
    	};

        page.on
    	page.onResourceReceived = function (req) {
    	
            
            if (res.stage === 'start') {
                webPage.resources[res.id].startReply = res;
            }
            if (res.stage === 'end') {
               webPage.resources[res.id].endReply = res;
            }

            // if(loadCheckInterval){

            //     clearCheckInterval();

            // }

            // loadCheckInterval = setInterval(function(){

            //     clearCheckInterval();
            //     if (req.stage === 'end') {
            //         fullyLoaded = true;
            //     }
                
            //     if(fullyLoaded)
            //     {
            //         console.log("\tonLoadFinished")
            //     }
            //     console.log("Aayush !!");

            // }, 350);

            
    	};

    	page.onLoadFinished = function (status){
    		page.render("google.png");
            page.endTime = new Date();
            page.title = page.evaluate(function () {
                return document.title;
            });
            har = createHAR(page.address, page.title, page.startTime, page.resources);
            console.log(JSON.stringify(har, undefined, 4));
            //console.log("\t\tonLoadFinished");
    	};

        page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
            page.evaluate(function() {
                //console.log("$(\".explanation\").text() -> " + $("#_username_id"));
                $("#_username_id").val("sanat.chugh@cengage.com");
                $("#_password_id").val("Cengage1");
                $(".goButton").click();
            });
            
        });

        
    }
});