var sys = require('sys');

var exec = require('child_process').exec;
var childSeleniumMindapps, childPhantLogin, childPhantDashboard;
var JSONToReturn = "{";

function JSONFactory() {
    childPhantLogin = exec("phantomjs LoginAndDashBoardCasper.js", function(error, stdout, stderr) {
        var dashboardCourses = getCoursesJson(stdout);
        var timingArray = stdout.split("\n");
        var loginTiming = "\"login\":" + parseInt(timingArray[0]) + ",";
        var dashBoardTiming = "\"dashboard-load\":" + parseInt(timingArray[1]) + ",";
        JSONToReturn = JSONToReturn + loginTiming + dashBoardTiming + dashboardCourses;


        childPhantDashboard = exec("phantomjs ReadingActivityCasper.js", function(error, stdout, stderr) {
            var DashboardTimingArray = stdout.split("\n");
            for (var i = 0; i < DashboardTimingArray.length; i++) {
                //console.log(Number.isNaN(parseInt(DashboardTimingArray[i])));
                //console.log(DashboardTimingArray[i]);
                if (Number.isNaN(parseInt(DashboardTimingArray[i])))
                    continue;
                else {
                    var readingActivityTiming = "\"reading-activity\":" + parseInt(DashboardTimingArray[i]) + ",";
                    JSONToReturn += readingActivityTiming;
                }
            }

            childSeleniumMindapps = exec("java -jar mindappSelenium.jar", function(error, stdout, stderr) {

                var mindAppTimingArray = stdout.split("\n");
                var mindAppJson = "";
                mindAppJson += "\"mindapps\":{";
                var i;
                for (i = 0; i < mindAppTimingArray.length - 2; i++) {
                    mindAppJson += mindAppTimingArray[i] + ",";
                }
                mindAppJson += mindAppTimingArray[i] + "}";
                JSONToReturn += mindAppJson + "};";
                //return JSONToReturn;
                console.log(JSONToReturn);

            });
        });
    });
}



function getCoursesJson(stdout) {
    var timingArray = stdout.split("\n");
    //console.log(timingArray[2]);
    var JSONDataDashBoarCourses = "\"dashboard-courses\" : {";
    var i;
    for (i = 1; i < parseInt(timingArray[2]); i++) {
        JSONDataDashBoarCourses = JSONDataDashBoarCourses + "\"course" + i + "\":" + parseInt(timingArray[i + 2]) + ",";
    }
    JSONDataDashBoarCourses = JSONDataDashBoarCourses + "\"course" + i + "\":" + parseInt(timingArray[i + 2]) + "},";
    return JSONDataDashBoarCourses;
}

JSONFactory();
//module.exports = JSONFactory;