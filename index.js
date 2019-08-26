var app = require('express')();
var bodyParser = require('body-parser');
var http = require('http').createServer(app);

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://joshua:<password>@cluster0-ubdqx.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/new/', function(req, res){
  client.connect(err => {
  const collection = client.db("test").collection("wabbitseason");
  var entry1 = {im : 'hunting', some: 'wabbits'};
  var entry2 = {nah : 'whats', up: 'doc'};
  // perform actions on the collection object
  collection.insert(entry1);
  collection.insert(entry2);
  client.close();
  if (err){
    res.send(err);		
  } else {
    res.send("IT WORKED");
  }
});

});


http.listen(8080, function(){
  console.log('listening on *:8080');
});
