var app = require('express')();
var bodyParser = require('body-parser');
var http = require('http').createServer(app);

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://joshua:upworkbattleio@cluster0-ubdqx.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/new', function(req, res){
  client.connect(err => {
  
  if (err){
    res.send(err);		
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

});

//app.get('/show', function(req, res){
//client.connect(err => {
//	if(err)
//});
//});


http.listen(8080, function(){
  console.log('listening on *:8080');
});
