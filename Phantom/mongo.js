
   contentFromFile = '{"login":83,"dashboard-load":3973,"dashboard-courses" : {"course1":2584,"course2":1840,"course3":3409,"course4":2319,"course5":2315,"course6":2889,"course7":2169,"course8":2109,"course9":2148,"course10":2110},"reading-activity":50000,"mindapps":{"Full Book" : 10037,"Glossary" : 3147,"Dictionary" : 2511}}';
   contentFromFile = JSON.parse(contentFromFile);


   contentFromFile["instance-full-date"] = new Date();

   
   console.log(contentFromFile);

//    var mongo = require('mongodb');

//    db = new mongo.Db('DashBoardDB', new mongo.Server("127.0.0.1", 27017, {}), {safe:true});
//    db.open(function(err, db) {
//     if(err)
//     {
//       console.log("Database Error!!");
//       //create database
//     }
//    db.collection('dashBoardHealthData', function(err, collection) {
    
//     	if(err)
//     	{
//     		//create collection
//         console.log("Collection Error!!")
//     	}

        
//         collection.insert(contentFromFile, function() {
//           console.log("data inserted");
//                       db.close();
//         });
//     });
// });

