phantom.casperPath = '/usr/local/Cellar/casperjs/1.1-beta3/libexec/';
phantom.injectJs(phantom.casperPath + '/bin/bootstrap.js');

phantom.casperTest = true;

var lpnOnThePage = [];
var x = require('casper').selectXPath;
var webPage = require('webpage').create(),
    system = require('system'),
    casper = require('casper').create();
var utils = require('utils');
var startTime, endTime;

    casper.on('remote.message', function(message) {
    	console.log(message);
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
            });

    
    casper.waitUntilVisible(".title", function() {

            //have been calculating the time till this step in casp.js

            //now calculating time to open a reading activity.

    		  this.thenClick(".title");//.thenEvaluate(function(){
                console.log("clicked on a course on the admin dashboard!!");
                this.capture('google.png');
                startTime = new Date().getTime();
            //});
    		});

            casper.waitUntilVisible(".lpn_name a",  function() {
                var currentURL = casper.getCurrentUrl();
                this.capture('google1.png');
                this.thenClick(".lpn_name a");
                casper.wait(350,function(){
                    this.capture('google2.png');
                    console.log("clicked on the chapter!! waiting for the sub-chapter or the chapter content!!");
                    try
                    {
                        this.test.assertExists(".lpn a", "Good, the input item actually exist");
                        casper.waitUntilVisible(".lpn_name a",  function() {
                            console.log("There was a sublink");
                            this.capture('google2.png');
                        }, function timeout(){
                            console.log("setTimeout for the second link");
                        }, 10000);
                    }
                    catch(err)
                    {   //ereader_iframe
                        casper.waitUntilVisible(".ereader_iframe",function(){
                            this.capture("testIFrame.png");
                            casper.page.switchToChildFrame("1_NB_Main_IFrame");
                            console.log(casper.page.focusedFrameName);
                            
                            casper.waitUntilVisible(".chapNum", function(){
                                try
                                {
                                    casper.test.assertExists(".chapNum", "we switched to the iframe!!");
                                    casper.capture("afterFrameLoad.png");
                                    endTime = new Date().getTime();
                                    console.log("Reading activity load time, hard coded right now - (get back to Giorgio: )")
                                    console.log(endTime - startTime);
                                }
                                catch(err)
                                {
                                    console.log("We couldn't switch!!");
                                }
                            }, function timeout(){
                                console.log("There was a timeOut sir, the resource took more than 10sec to load!!");
                            }, 10000);
                            
                            
                        }, function timeout(){
                            console.log("timeout for ereader");
                            casper.capture("afterFrameLoad.png");
                        }, 10000);
                        

                        
                    }
                    
                });
                
            });
            



    // casper.then(function(){
    //     this.test.assertExists(".lpn_name","The sublinks are available");
    //     //this.thenClick(".lpn_name a");
    //     utils.dump(this.getElementsInfo(".lpn_name a"));
    //     console.log("passed!!");
    // });

    casper.run();

