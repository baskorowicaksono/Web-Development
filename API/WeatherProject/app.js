//jshint esversion:6

const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");
const { mainModule } = require("process");
const app = express();

app.use(express.urlencoded({extended:true}));



app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
    console.log(req.body.cityName);
    const query = req.body.cityName;
    const apiKey = "1f683974844624a3888fe364d544a742";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units="+ units +"&appid=" + apiKey;
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const icon = weatherData.weather[0].icon;
            const iconURL = "https://openweathermap.org/img/wn/" + icon+ "@2x.png";
            
            console.log(weatherData.weather[0]);
            res.write("<p>The weather is currently " + weatherData.weather[0].description +"</p>")
            res.write("<h1>The temperature in " + query + " now is " + weatherData.main.temp + " degree Celsius</h1>");
            res.write("<img src=" + iconURL + ">");
            res.send();
        });
    })
})

    

app.listen(3000, function(){
    console.log("Listening to port 3000");
});