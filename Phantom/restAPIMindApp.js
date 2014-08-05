var express = require('express');
var mongo = require('mongodb');


var app = express();
app.use(express.static(__dirname + '/public'));


app.post("/hello", function(req, res) {
    var body = "";
    req.on('data', function(chunk) {
        body += chunk;
    });
    req.on('end', function() {
           
         contentFromFile = JSON.parse(body);

    		//console.log('JSON Object: ' + body);

    		//console.log('\n\n\n');
        


        contentFromFile["instance-full-date"] = new Date();
        
        db = new mongo.Db('DashBoardDB', new mongo.Server("127.0.0.1", 27017, {}), {
            safe: true
        });
        
        db.open(function(err, db) {
            if (err) {
                console.log("Database Error!!");
                //create database
            }
            db.collection('dashBoardHealthData', function(err, collection) {

                if (err) {
                    //create collection
                    console.log("Collection Error!!")
                }


                collection.insert(contentFromFile, function() {
                    console.log("DashBoard Data Inserted!!");
                    db.close();
                });
            });
        });
        console.log(JSON.parse(body));
        body="";
        res.writeHead(200);
        res.end("I have the data, and I have inserted the tuple in the Database too!!");

     });
});




app.get("/hi", function(req, res){

	db = new mongo.Db('DashBoardDB', new mongo.Server("127.0.0.1", 27017, {}), {
            safe: true
        });
        
        db.open(function(err, db) {
            if (err) {
                console.log("Database Error!!");
                //create database
            }
            db.collection('dashBoardHealthData', function(err, collection) {

                if (err) {
                    //create collection
                    console.log("Collection Error!!")
                }

                collection.find().toArray(function(err, items) {
		            res.send(items);
		        });
            });
        });
});

app.get("/hii", function(req, res){

    db = new mongo.Db('DashBoardDB', new mongo.Server("127.0.0.1", 27017, {}), {
            safe: true
        });
        
        db.open(function(err, db) {
            if (err) {
                console.log("Database Error!!");
                //create database
            }
            db.collection('dashBoardHealthData', function(err, collection) {

                if (err) {
                    //create collection
                    console.log("Collection Error!!")
                }

                collection.find().sort( { _id : -1 } ).limit(1).toArray(function(err, items) {
                    res.send(items[0]);
                });

            });
        });
});


app.get("/hiii", function(req, res){ //returns an array of all the locations instances

    db = new mongo.Db('DashBoardDB', new mongo.Server("127.0.0.1", 27017, {}), {
            safe: true
        });
        
        db.open(function(err, db) {
            if (err) {
                console.log("Database Error!!");
                //create database
            }
            db.collection('dashBoardHealthData', function(err, collection) {

                if (err) {
                    //create collection
                    console.log("Collection Error!!")
                }

                collection.distinct("instance-location", function(err, items){
                    //res.send(items);

                    collection.find({"instance-location":items[0]}).toArray(function(err,addons){
                        res.send(addons);
                    });

                });
            });
        });
});





app.get("/", function(req, res){
	res.redirect("/index.html");
});


app.get("/gauge", function(req, res){
    res.redirect("/index1.html");
});


String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "");
};

app.listen(8080);

console.log("Application is listening on port 8080");