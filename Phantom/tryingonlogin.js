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

    casper.on('popup.created', function(page) {
        casper.page = page;
    });

	casper.start('http://login.cengage.com', function() {
        casper.waitUntilVisible(x(".//*[@id='emailId']"), function(){

                this.echo(this.getTitle());
             //this.echo(this.getCurrentUrl());
        this.sendKeys({
                    type: 'xpath',
                    path: ".//*[@id='emailId']"
                }, 'mockgeyser.slave@gmail.com');
                
                this.sendKeys({
                    type: 'xpath',
                    path: ".//*[@id='password']"
                }, 'DASHBOARD1234');
                this.capture("a.png");

        });
        
    });

     casper.page.onError = function(msg, trace) {

  console.log(msg);
  trace.forEach(function(item) {
    console.log("Errors from the console: \t\t\t\t\t as follows :");
    console.log('  ', item.file, ':', item.line);
  });
}



    // casper.then(function(){
    //          //this.echo(this.getCurrentUrl());
    //     this.sendKeys({
    //                 type: 'xpath',
    //                 path: ".//*[@id='emailId']"
    //             }, 'mockgeyser.slave@gmail.com');
                
    //             this.sendKeys({
    //                 type: 'xpath',
    //                 path: ".//*[@id='password']"
    //             }, 'DASHBOARD1234');
    //             this.capture("a.png");
    //     });

    casper.then(function(){
                    this.test.assertExists({
                        type: 'xpath',
                        path: ".//*[@id='loginFormId']/input[3]"
                    }, "Good, the input item actually exist");
                   this.thenClick(x(".//*[@id='loginFormId']/input[3]"));
            });

    
    casper.waitUntilVisible(x(".//*[@id='lastAccessed']/div/div[2]/ul[1]/li[2]/a"), function() {

            //have been calculating the time till this step in casp.js

            //now calculating time to open a reading activity.
            casper.capture("selector1.png");
    		  this.thenClick(x(".//*[@id='lastAccessed']/div/div[2]/ul[1]/li[2]/a"));//.thenEvaluate(function(){
                console.log("clicked on a course on the admin dashboard!!");
                
                
            //});
    		}, function timeout(){
                console.log("There was a timeOut sir!!");
            }, 10000);

    casper.waitUntilVisible(".lpn_name a",  function() {
        var links;
        this.capture("google.png");
        
        phantom.injectJs("jquery-2.1.1.min.js");
        casper.page.injectJs("jquery-2.1.1.min.js");
        this.evaluate(function(){
            //$("#app_full_book").click();
            console.log("I am in the jquery section!")
            var element = document.getElementById("nb_dock");
            console.log(element);
            console.log(element.innerHTML);
            //element[0].click();
            

        });
    casper.then(function(){

        casper.waitForSelector("#app_Search",function(){

        var myFunc = function(){


             casper.page.injectJs("jquery-2.1.1.min.js");
             casper.evaluate(function(){
                

                
                var item = document.getElementById("nb_dock");//.getElementsByTagName("li");
                var list = item.getElementsByTagName('ul');
                var ls = item.getElementsByTagName("li");

                console.log("trying to print the contents of a list item!!");
                console.log(item.innerHTML);
                
                
                //var lis = list.getElementsByTagName('li');
                
                //console.log(item)
                //console.log(JSON.stringify(list));


               // console.log(lis)

            });

        }

        //setInterval(myFunc, 500);
        myFunc();

    }, function timeout(){
        console.log("tout for app_Search");
    },5000);
        //     console.log("found the dockGroup");


    // casper.debugHTML('#nb_lpLauncher');
    

        // casper.waitForSelector("#dockGroup1",function(){
        //     console.log("found the dockGroup");

        //     //this.thenClick(x(".//*[@id='app_Search']/img"));
            

        //     // casper.waitForSelector(".nb_dockItem",function(){
        //     //     console.log("found fing appsearch!!");
        //     // }, function timeout(){
        //     //     console.log("timeout for app_Search");
        //     // }, 10000);


        //     // casper.waitForSelector("#nb_search_submit", function(){
        //     //     this.capture("google.png");
        //     // });

        // }, function timeout(){
        //     console.log("There was a timeOut for dockGroup!!");
        // },10000);
        


        casper.wait(5000, function(){
            //37_NB_Dock_IFrame
            // casper.page.switchToChildFrame("37_NB_Dock_IFrame");
            // casper.captureSelector("selector.png","html");
            // console.log("Done till search frame");

            casper.capture("selector.png");
            console.log("passed!!");
        });
        });



        // }, function timeout(){
        //         console.log("There was a timeOut for the iframe when clicked on app_full_book!!");
        // }, 10000);
    
    });



    casper.run();