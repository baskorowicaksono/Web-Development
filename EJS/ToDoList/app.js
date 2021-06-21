const express = require("express");
const bodyParser = require("body-parser");


const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

const newItem = ["Order Food", "Buy Food", "Eat the Fucking Food"];
const workItems = [];

app.get("/", function(req, res){
    const day = new Date();
    const dayNow = day.getDay();
    

    const options = {
        weekday : "long",
        day     : "numeric",
        month   : "long"
    };

    const today = day.toLocaleDateString("en-US", options);

    // switch(dayNow){
    //     case 0:
    //         today = "Sunday";
    //         break;
    //     case 1:
    //         today = "Monday";
    //         break;
    //     case 2:
    //         today = "Tuesday";
    //         break;
    //     case 3:
    //         today = "Wednesday";
    //         break;
    //     case 4:
    //         today = "Thursday";
    //         break;
    //     case 5:
    //         today = "Friday";
    //         break;
    //     case 6:
    //         today = "Saturday";
    //         break;
    //     default:
    //         console.log("N/A");
        
    // }
    res.render("list", {dayToday : today, NewItem: newItem});
});

app.post("/", function(req,res){
    console.log(req.body);
    const item = req.body.nextAct;
    if(req.body.list === "Work List"){
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        newItem.push(item);
        console.log(newItem);
        res.redirect("/");
    }
})

app.get("/work", function(req,res){
    res.render("list", {dayToday: "Work List", NewItem: workItems});
})

app.post("/work", function(req, res){
    const item = req.body.nextAct;
    workItems.push(item);
    res.redirect("/work");
})

app.listen(3000, function(){
    console.log("Listening to port 3000");
});