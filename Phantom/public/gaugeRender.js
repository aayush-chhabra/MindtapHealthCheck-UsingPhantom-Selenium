        var instanceLocations = [];
        
        var gData = [];

        var getLocations = function() {
            return new Promise(function(fulfill, reject) {
                $.ajax({
                    url: 'http://localhost:8080/getInstanceLocations',
                    dataType: 'json',
                    cache: false
                }).done(function(data) {
                    fulfill(data);
                });
            });
        }

        var high = function(location) {
            return new Promise(function(fulfill, reject) {
                
                var url = 'http://localhost:8080/hiii/'+location;
                $.ajax({
                    url: url,
                    dataType: 'json',
                    cache: false
                }).done(function(data) {

                    callbackFunction(data).then(function(res) {
                        if (1) {
                            fulfill(res);

                        } else
                            reject("a");
                    });

                });
            });
        }
        

       
        var newFunction = function(){
            return new Promise(function(fulfill, reject) {
                getLocations().then(function(res){

                        instanceLocations = res;
                        var count=0;
                        for(i in res)
                        {
                            high(res[i]).then(function(data){
                                count++;
                                gData.push(data);
                                if(count===res.length){
                                    fulfill(gData);
                                }
                            });
                        }
                     });
                
            });
        }
        



        


        var gaugeData = [];

        
        var instanceLocation="";
        var callbackFunction = function(data) {
            return new Promise(function(fulfill, reject) {
                var mindAppData = [];
                var sumOfMindapps = 0;
                gaugeData = [];
                var az = ['Label', 'Value'];
                gaugeData.push(az);
                //gData.push(az);
                data = data[0];
                var keys = Object.keys(data);

                for (var i = 1; i < keys.length; i++) {
                    var a = [];
                    if (typeof(data[keys[i]]) === "object") {
                        


                        if (keys[i] === "mindapps") {
                            
                            var subKeys = Object.keys(data[keys[i]]);
                            
                            for (var j = 0; j < subKeys.length; j++) {
                                var b = [];
                                b.push(subKeys[j]);
                                b.push((data[keys[i]])[subKeys[j]]);
                                //console.log((data[keys[i]])[subKeys[j]]);
                                //a.push(b);
                                //console.log(b);
                                mindAppData.push(b);
                                b = [];

                                //a.push(data[keys[subKeys[j]]]);
                            }
                            
                        }


                    } else {
                        if (keys[i] === "reading-activity") {
                            //console.log("inhe")
                            //if(parseInt(data[keys[i]]) === 50000 &&
                            a.push(keys[i]);
                            a.push(data[keys[i]]);
                            gaugeData.push(a);
                            //console.log(gaugeData)
                        }
                        else if(keys[i] === "instance-location")
                        {
                            instanceLocation=data[keys[i]];
                            //console.log(instanceLocations);
                        }

                    }

                    //console.log(a);
                    a = [];
                }
                //console.log(mindAppData,"mindAppData");
                for (i in mindAppData)
                    gaugeData.push(mindAppData[i]);
                mindAppData=[];
                mindAppData.push(instanceLocation);
                //for(var j=2; j<gaugeData.length;j++)
                //{
                    //console.log(gaugeData[j][1], "a");
                    if(parseInt(gaugeData[1][1]) === 50000 && parseInt(gaugeData[2][1]) !== 50000 && parseInt(gaugeData[3][1]) !== 50000 && parseInt(gaugeData[4][1]) !== 50000)
                    {
                        sumOfMindapps+=parseInt(gaugeData[2][1]) + parseInt(gaugeData[3][1]) + parseInt(gaugeData[4][1]);
                        sumOfMindapps = sumOfMindapps/3;
                        sumOfMindapps=Math.floor(sumOfMindapps);
                        mindAppData.push(sumOfMindapps);
                    }   
                    else
                    {

                        sumOfMindapps+=parseInt(gaugeData[1][1]) + parseInt(gaugeData[2][1]) + parseInt(gaugeData[3][1]) + parseInt(gaugeData[4][1]);
                        sumOfMindapps = sumOfMindapps/4;
                        sumOfMindapps=Math.floor(sumOfMindapps);
                        mindAppData.push(sumOfMindapps);
                    }
                //}
                //console.log(sumOfMindapps);
                //gData.push(mindAppData);
                //mindAppData=[];
                
                fulfill(mindAppData);
            });
        }
        //console.log(instanceLocations[0]);
        

        // }

        //  //function loadGauge(){


        google.load('visualization', '1', {
            packages: ['gauge']
        });


        google.setOnLoadCallback(drawChart);



        function drawChart() {
                gaugeData=[];
                
                gData=[];

                gData.push(['Label', 'Value']);
                

                newFunction().then(function(res) {
                    
                    var data = google.visualization.arrayToDataTable(res);

                    

                    var options = {
                        width: 800,
                        height: 250,
                        redFrom: 40000,
                        redTo: 50000,
                        yellowFrom: 20000,
                        yellowTo: 40000,
                        minorTicks: 5,
                        max: 50000
                    };

                    
                    var chart = new google.visualization.Gauge(document.getElementById('chart_div'));
                    chart.draw(data, options);
                });
            }
        //     //loadGauge();    
        setInterval(drawChart, 120000);

        $(document).ready(function(){

            // $("#chart_div").click(function(){
            //     var myDiv = document.createElement('iframe');
            //     myDiv.id = 'myDiv';
            //     myDiv.src="http://www.w3schools.com";
            //     myDiv.class="iframeClass";
            //     //$("#iframeInsert").appendChild(myDiv); 
            //     var iframeInsert = $("#iframeInsert");
            //     iframeInsert.append(myDiv);
            // });
        }); 
