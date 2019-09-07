var app = require('express')();
var bodyParser = require('body-parser');
var http = require('http').createServer(app);
//var Arraylist = require('arraylist');
var async = require('async');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://joshua:upworkbattleio@cluster0-ubdqx.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
var error;
var sessionId = 0;
client.connect(err => {
  error = err;
  if (err) {
    console.log(err);
  }
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/new', function(req, res){
//   client.connect(err => {
  
  
// });
if (error){
    res.send(error);    
  } else {
const collection = client.db("test").collection("wabbitseason");
  var entry1 = {im : 'not hunting', some: 'wabbits'};
  var entry2 = {nah : 'whats not', up: 'doc'};
  // perform actions on the collection object
  collection.insertOne(entry1);
  collection.insertOne(entry2);
  client.close();
    res.send("IT WORKED");
  }
});

//app.get('/show', function(req, res){
//client.connect(err => {
//	if(err)
//});
//});

app.get('*/leaderboard', function(req, res) {
   var arr = [];
   //var error;
 
if (error){
    res.send(error);    
  } else {
const collection = client.db("test").collection("leaderboard");
 
  var found = collection.find();
  console.log(found);
 
  //var kills = 0;
  found.count(function(err, count){
    var i = 0;
    found.forEach(function(doc){
    // console.log(doc);
    // console.log("inner");
    // console.log(arr.length);
    // if (arr.length == 0) {
  arr.push(doc);
  console.log("first");
  console.log(arr);
  //kills = doc.kills;    
  //} else {
  //if (doc.kills > kills) {
  
  //}
  // for (i = 0; i < arr.length; i++){
  //   if (parseInt(doc.kills, 10) > arr[i].kills) {
  //       arr.splice(i, 0, doc);
  //       console.log("insert");
  //        console.log(arr);
  //     break;
  //   }
  // }
 // }

       console.log(arr.length);
  //client.close();
  i++;
 if (arr.length == count) {
  
arr.sort(function(a, b){
      const killsA = parseInt(a.kills, 10);
  const killsB = parseInt(b.kills, 10);

  let comparison = 0;
  if (killsA > killsB) {
    comparison = -1;
  } else if (killsA < killsB) {
    comparison = 1;
  }
  return comparison;
    });
 console.log(arr);
  if (arr.length > 0) {
res.send(arr);
  }
  else {
res.send("No leaderboard")
  }

  }
 
   

   });
    
  });
 
 }
   
    //if (arr.length > 0){
  
 //    } else {
  // res.send("Empty");
 //    }
    
  

});

app.post('*/requestsessionid', function(req, res){
  
 
  const collection = client.db("test").collection("sessionId");
  var found = collection.find();
  var update;
  found.count(function(err, count) {
    var newValue = 0;
    if (count == 0) {
       var myquery = { table: "Session ID" };
        var newvalues = { $set: { sessionId: newValue } };
      update = collection.updateOne(myquery, newvalues, {upsert: true} ,function(err, res) {});
       res.send("" + newValue);
    } else {
      found.forEach((doc) => {
        newValue = doc.sessionId + 1;
        if (newValue > 1000000) {
          newValue = 0;
        }
          var myquery = { table: "Session ID" };
          var newvalues = { $set: { sessionId: newValue } };
         update = collection.updateOne(myquery, newvalues, {upsert: true} ,function(err, res) {});
          res.send("" + newValue);
      });
    }
  });

  // found.forEach((doc) => {
   
  // });
  // sessionId++;
  // if (sessionId > 100000000){
  //   sessionId = 0;
  // }
  // res.send(sessionId);

});

//**OLD**
// app.post('*/posttoboard', function(req, res) {
//  //client.connect(err => {
//   var killfloor = 0;
//   if (error){
//     res.send(error);		
//   } else {
// const collection = client.db("test").collection("leaderboard");
  
//   var found = collection.find();
//   found.count(function(err, count) {
//     if (err) {
//       console.log(err);
//     }
//  if (count < 10) {
// 	console.log(req.body);
// 	collection.insertOne(req.body);

// //client.close()
//   } else {
// 	console.log(req.body);
//  	//var i = 0;
//   found.forEach((doc) => {

//           console.log(doc);
//           console.log(doc.kills);
//           console.log(killfloor);
// 	if (killfloor == 0){
// 	    killfloor = parseInt(doc.kills, 10);
//       console.log("changing");
// 	} 
// 	if (parseInt(doc.kills, 10) < killfloor) {
// 	    killfloor = parseInt(doc.kills, 10);
//       console.log("shifting");
// 	}
//   // i++;
//   // if (i == count - 1) {
//   //   console.log("in");
//   //   return killfloor;
//   // }
//   });
// 	itemremoved = false;
//   console.log("kf " + killfloor);
//   found = collection.find();
// 	found.forEach((doc) => {
//      console.log("here");
//      console.log(doc.kills);
//      console.log(killfloor);
// 	    if (killfloor == parseInt(doc.kills, 10) && !itemremoved) {
//         console.log("kf again" + killfloor);
// 		collection.remove(doc);
//       collection.insertOne(req.body);
    
		
//     //client.close()
// 		itemremoved = true;
// 	}
// 	});
//   }
// });


//    res.send("success!");
//   }
// //});
// });

app.post('*/posttoboard', function(req, res) {
 //client.connect(err => {
  //var killfloor = 0;
  if (error){
    res.send(error);    
  } else {
  const collection = client.db("test").collection("leaderboard");
  
  var found = collection.find();
  
    if (err) {
      console.log(err);
    }

  console.log(req.body);
  var myquery = { player: req.body.player, sessionId: req.body.sessionId};
  var newvalues = { $set: { kills: req.body.kills } };
  update = collection.updateOne(myquery, newvalues, {upsert: true} ,function(err, res) {});
  //collection.insertOne(req.body);


   res.send("success!");
  }
//});
});
process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);




const server = http.listen(8080, function(){
  console.log('listening on *:8080');
});

function shutDown() {
    console.log('Received kill signal, shutting down gracefully');
    server.close(() => {
        console.log('Closed out remaining connections');
        client.close();
        process.exit(0);
    });
}

