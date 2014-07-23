phantom.casperPath = '/usr/local/Cellar/casperjs/1.1-beta3/libexec/';
phantom.injectJs(phantom.casperPath + '/bin/bootstrap.js');

phantom.casperTest = true;

var x = require('casper').selectXPath;
var webPage = require('webpage').create(),
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


	webPage.address = "http://google.com";//"http://qae-ng.cengage.com/static/nb/login.html";
    webPage.resources = [];
    
    webPage.onConsoleMessage = function (msg, line, source) {
        console.log('console> ' + msg);
    };
    
    webPage.onLoadStarted = function () {
        webPage.startTime = new Date();
    };

    webPage.onResourceRequested = function (req) {
        webPage.resources[req.id] = {
            request: req,
            startReply: null,
            endReply: null
        };
    };

    webPage.onResourceReceived = function (res) {
        if (res.stage === 'start') {
            webPage.resources[res.id].startReply = res;
        }
        if (res.stage === 'end') {
            webPage.resources[res.id].endReply = res;
        }
    };

    webPage.open(webPage.address, function (status) {
        var har;
        if (status !== 'success') {
            console.log('FAIL to load the address');
            phantom.exit(1);
        } else {
            webPage.endTime = new Date();
            webPage.title = webPage.evaluate(function () {
                return document.title;
            });
            har = createHAR(webPage.address, webPage.title, webPage.startTime, webPage.resources);
            console.log(JSON.stringify(har, undefined, 4));
            // console.log("a");

            // webPage.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
            // webPage.evaluate(function() {
            //     console.log("$(\".explanation\").text() -> " + $("#gbqfba").text());
            // });
            phantom.exit();}
        });

            // webPage.includeJs("jquery-1.11.1.min.js", function(){

            //     $('#_username_id').value('sanat.chugh@cengage.com');
            //     //console.log('Searching...');
            //     $('#_password_id').value('Cengage1');
            //     //console.log('Searching...');
            //     $("input .goButton").click();
            //     //console.log('Searching...');
                
            //     console.log("webPage.url");

            // });
            
            //phantom.exit();
    //     }
    // });
    
    // webPage.onLoadFinished = function(status){
    //     webPage.render('google.png');
    //     phantom.injectJs("jquery-2.1.1.min.js");
    //     webPage.injectJs("jquery-2.1.1.min.js");
    //     console.log($('#gbqfba').text());

    //     var title = webPage.evaluate(function() {
    //             //$('#_username_id').val('sanat.chugh@cengage.com');
    //             //console.log('Searching...');
    //             //$('#_password_id').val('Cengage1');
    //             //console.log('Searching...');
                
    //             //$('#gs_htif0').val('Cengage');
    //             //$("#gbqfba").trigger("click");
                
    //             console.log($("#gbqfba").text());
    //             //console.log(document.querySelector('gbqfq'));
    //             // console.log($(document).html())//("button").html());
    //             // console.log(document.getElementsByTagName('button'));
                
    //             return document.title;  

    //         // window.setTimeout(function(){
    //         //     console.log(window.location.pathname);
    //         // }, 10000);                
    //      });
    //     console.log(title);
    //     console.log(webPage.url);

    //   //  console.log($('button'));

    // }
    
  //   webPage.onLoadFinished = function(status) {
  //   	var firstUrl;
  //   	var casper = require('casper').create({
		// 	page: webPage,
		// 	verbose: true,
  //           logLevel: "debug"
		// });
    	
  //       casper.options.page = webPage;
  //   	casper.options.page.address = webPage.address;


  //       casper.on('click', function(){
  //           //console.log("click");

  //       });

  //       casper.on('navigation.requested', function(u, n, n1, i){
  //           console.log("Hello!!");
  //       });

  //   	casper.start();

  //       casper.then(function(){
            
  //           firstUrl = casper.getCurrentUrl();

  //           var jq;

  //           this.evaluate(function(){

  //               jq = $.noConflict(true);

  //           });

  //           console.log('$$$$$$', $);
  //       });
        

  //   	casper.then(function(){
  //   		//this.echo(this.getCurrentUrl());
		// 	this.sendKeys({
		//         type: 'xpath',
		//         path: ".//*[@id='_username_id']"
		//     }, 'sanat.chugh@cengage.com');
		    
		//     this.sendKeys({
		//         type: 'xpath',
		//         path: ".//*[@id='_password_id']"
		//     }, 'Cengage1');


		// });

  //   	casper.then(function(){
  //   		this.capture('google.png', {
		//         top: 100,
		//         left: 100,
		//         width: 500,
		//         height: 400
  //   		});
  //   	});
    	
		// casper.then(function(){
		//  	// this.click({
		//   //       type: 'xpath',
		//   //       path: ".//*[@id='loginForm']/div/div[2]/p/input"
		//   //   });

  //               this.test.assertExists({
  //                   type: 'xpath',
  //                   path: ".//*[@id='loginForm']/div/div[2]/p/input"
  //               }, "Good, the input item actually exist");
  //              this.thenClick(x(".//*[@id='loginForm']/div/div[2]/p/input"));
  //              // this.emit("click");
		// });
        

  //       casper.waitFor(function check() {

  //           console.log('this', this);

  //           return this.evaluate(function() {
  //               console.log('arguments', arguments)
  //               // return that.getCurrentUrl() != firstUrl;
  //           });
  //       });

		// casper.then(function(){
  //         //  webPage = casper.options.page;
  //         //  console.log(webPage.url);
		// // 	this.echo(this.getCurrentUrl());
            
		// });


		// casper.run(function(){
		// 	phantom.exit();
  //           casper.exit();
		// });
		
  //   }




// console.log(webPage.address);
// casper.start();

// casper.then(funciton(){
	
// 	this.sendKeys({
//         type: 'xpath',
//         path: ".//*[@id='_username_id']"
//     }, 'sanat.chugh@cengage.com');
    
//     this.sendKeys({
//         type: 'xpath',
//         path: ".//*[@id='_password_id']"
//     }, 'Cengage1');

// });



// casper.start('http://qae-ng.cengage.com/static/nb/login.html', function(status) {

//     this.sendKeys({
//         type: 'xpath',
//         path: ".//*[@id='_username_id']"
//     }, 'sanat.chugh@cengage.com');
//     this.sendKeys({
//         type: 'xpath',
//         path: ".//*[@id='_password_id']"
//     }, 'Cengage1');
    
// });

//  casper.then(function(){
//  	this.click({
//         type: 'xpath',
//         path: ".//*[@id='loginForm']/div/div[2]/p/input"
//     });
//  });

// casper.then(function(){
// 	this.echo(this.getCurrentUrl());
// 	phantom.exit();
// });

// casper.run();