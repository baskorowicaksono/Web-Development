//jshint esversion:6

require("dotenv").config();
const express = require("express");
// const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

const app = express();

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser : true});

const userSchema = new mongoose.Schema({
    email : String,
    password : String
});


userSchema.plugin(encrypt, {secret : process.env.SECRET, encryptedFields : ["password"]});

const User = new mongoose.model("User", userSchema);

// const user = new User();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended : true}));

app.get("/", function(req, res){
    res.render("home");
});

app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", function(req, res){
    const userName = req.body.username;
    const userPass = req.body.password;
    
    const newUser = new User({
        email : userName,
        password : userPass
    });
    newUser.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            res.render("secrets");
        }
    })
})

app.get("/login", function(req, res){
    res.render("login");
});

app.post("/login", function(req, res){
    const userName = req.body.username;
    const userPass = req.body.password;

    User.findOne({email : userName}, function(err, result){
        if(err){
            console.log(err);
        }
        else{
            if(result){
                if(result.password === userPass){
                    res.render("secrets");
                }
                else{
                    res.send("Login Failed, Refresh and check your credentials");
                }
            }
            else{
                res.send("Account not found, please try again");
            }
        }
    })
})

app.listen(3000, function(){
    console.log("Server started on port 3000");
})

