//jshint esversion:6

const { response } = require("express");
const express = require("express");
const app = express();
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(request, response){
    response.send("<h1>Hello World</h1>");
})

app.get("/contact", function(req, res){
    res.send("Contact Me at: wbaskoroadi@gmail.com")
})

app.get("/about", function(req, res){
    res.send("I'm Baskoro and i love to have a chat with you!")
})

app.get("/hobbies", function(req, res){
    res.send("I would love to have some coffee and start reading some books!");
})

app.listen(3000, function(){
    console.log("Server started on port 3000");
});
