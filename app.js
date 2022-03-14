var express=require("express");
var bodyParser=require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ro');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})
  
var app=express();
app.use(bodyParser.json());
 

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.get('/', function(req, res) {
  res.sendFile(__dirname + "/" + "index.html");
});
app.get('/about', function(req, res) {
    res.sendFile(__dirname + "/" + "about.html");
  });
  app.get('/contact', function(req, res) {
    res.sendFile(__dirname + "/" + "contact.html");
  });
  app.get('/service', function(req, res) {
    res.sendFile(__dirname + "/" + "services.html");
  });
app.post('/signup', function(req,res){
    var name = req.body.name;
    var email =req.body.email;
    var phone =req.body.phone;
    var feed = req.body.feed;
    var data = {
        "name": name,
        "email":email,
        "phone":phone,
        "feedback":feed,
    }
db.collection('conts').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");
            
    });
          
    return res.redirect(`/`);
})
const port=3000;
app.listen(port,()=>{
    console.log(`app listening at http://localhost:3000`);
});









  