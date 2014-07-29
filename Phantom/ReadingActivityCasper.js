
/*

    ReadingActivityCasper v0.0.1 
    (c) 2014 Cengage Learning

    This Phantom Casper program computes the page load time for a Reading
    activity in MindTap, It initially logs into the QAE using a dummy user
    name and Password, clicks on a random link on the Administrator dashbo-
    ard, the StartTime starts once the WebDriver clicks on the course on t-
    he dashboard. Then after a click event is trigerred on a course, it waits
    until the chapters are loaded, once loaded it clicks on it, after clicking
    it checks if the chapter has subchapters, if it has any subchapters it 
    clicks on it again and waits until the reading activity is loaded, after the 
    reading activity is loaded, it marks this time as EndTime and calculates the 
    difference to be the load time of a reading activity.
*/


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
    //this.echo(this.getTitle());
});

casper.waitUntilVisible(x(".//*[@id='_username_id']"),function() {
   
    this.sendKeys({
        type: 'xpath',
        path: ".//*[@id='_username_id']"
    }, 'sanat.chugh@cengage.com');

    this.sendKeys({
        type: 'xpath',
        path: ".//*[@id='_password_id']"
    }, 'Cengage1');
}, function timeout(){
    console.log("50000");
    return;
},10000);

casper.waitUntilVisible(x(".//*[@id='loginForm']/div/div[2]/p/input"),function() {
    // this.test.assertExists({
    //     type: 'xpath',
    //     path: ".//*[@id='loginForm']/div/div[2]/p/input"
    // }, "Good, the input item actually exist");
    this.thenClick(x(".//*[@id='loginForm']/div/div[2]/p/input"));
}, function timeout(){
    console.log("50000");
    return;
},10000);


casper.waitUntilVisible(".title", function() {
    this.thenClick(".title"); 
    //console.log("clicked on a course on the admin dashboard!!");
    this.capture('ImagesReadingActivity/DashboardLoad.png');
    startTime = new Date().getTime();
    //});
}, function timeout() {
    console.log("50000");
    return;
}, 10000);

casper.waitUntilVisible(".lpn_name a", function() {
    var currentURL = casper.getCurrentUrl();
    this.capture('ImagesReadingActivity/LinksInACourse.png');
    this.thenClick(".lpn_name a");
    casper.wait(350, function() {
        this.capture('ImagesReadingActivity/SubLinksOrSubChapters.png');
        //console.log("clicked on the chapter!! waiting for the sub-chapter or the chapter content!!");
        try {
            this.test.assertExists(".lpn a", "Good, the input item actually exist");
            casper.waitUntilVisible(".lpn_name a", function() {
                this.capture('ImagesReadingActivity/Sublinks.png');
            }, function timeout() {
                console.log("50000");
                return;
            }, 10000);
        } catch (err) { //ereader_iframe
            casper.waitUntilVisible(".ereader_iframe", function() {
                this.capture("ImagesReadingActivity/testIFrame.png");
                casper.page.switchToChildFrame("1_NB_Main_IFrame");
                //console.log(casper.page.focusedFrameName);

                casper.waitUntilVisible("#breadcrumb", function() {
                    try {
                        casper.test.assertExists("#breadcrumb", "BreadCrumbs Exist");
                        casper.capture("ImagesReadingActivity/afterFrameLoad.png");
                        endTime = new Date().getTime();
                        //console.log("Reading activity load time, hard coded right now - (get back to Giorgio: )")
                        console.log(endTime - startTime);
                    } catch (err) {
                        console.log("50000");
                        return;
                    }
                }, function timeout() {
                    console.log("50000");
                    casper.capture("ImagesReadingActivity/BreadCrumbTimeOut.png");
                    return;
                }, 10000);


            }, function timeout() {
                console.log("50000");
                casper.capture("ImagesReadingActivity/IframeTimeOut.png");
                return;
            }, 10000);



        }

    });

}, function timeout() {
    console.log("50000");
    return;
}, 10000);

casper.run();