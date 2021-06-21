//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/index", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/index", function(req, res){

    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);
    var result = num1 + num2;

    res.send("The result of your calculation is " + result);
})

app.get("/bmicalculator", function(req, res){
    res.sendFile(__dirname + "/bmiCalculator.html");
})

app.post("/bmicalculator", function(req, res){
    var weight = Number(req.body.weight);
    var height = Number(req.body.height);
    if (height > 100){
        height = height / 100;
    }
    
    var bmi = (weight / (height*height)).toFixed(1);

    res.send("Your BMI is " + bmi);
})

app.listen(3000, function(){
    console.log("Listening to port 3000");
});
