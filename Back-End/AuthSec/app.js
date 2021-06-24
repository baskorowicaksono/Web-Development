//jshint esversion:6

require("dotenv").config();
const express = require("express");
// const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
// const encrypt = require("mongoose-encryption");
// const md5 = require("md5");
// const bcrypt = require("bcrypt");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");




const app = express();
// const saltRounds = 10;

app.use(session({       //defining session that will be used
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : false
}));

app.use(passport.initialize());     //init passport
app.use(passport.session());        //starting passport session

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser : true, useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
    email : String,
    password : String
});

userSchema.plugin(passportLocalMongoose);   //using passport as plugin on Mongoose

// userSchema.plugin(encrypt, {secret : process.env.SECRET, encryptedFields : ["password"]});

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());   //saving the info
passport.deserializeUser(User.deserializeUser());   //"crushing" the cookie and retrieve the info inside

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
    // const userName = req.body.username;
    // const userPass = req.body.password;

    // bcrypt.hash(userPass, saltRounds, function(err, hash){
    //     const newUser = new User({
    //         email : userName,
    //         password : hash
    //     });
    //     newUser.save(function(err){
    //         if(err){
    //             console.log(err);
    //         }
    //         else{
    //             res.render("secrets");
    //         }
    //     });
    // });
    
    User.register({username : req.body.username}, req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.redirect("/register");
        }
        else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secrets");
            });
        }
    });
});

app.get("/secrets", function(req, res){
    if(req.isAuthenticated()){
        res.render("secrets");
    }
    else{
        res.redirect("/login");
    }
});

app.get("/login", function(req, res){
    res.render("login");
});

app.post("/login", function(req, res){
    // const userName = req.body.username;
    // const userPass = req.body.password;

    // User.findOne({email : userName}, function(err, result){
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         if(result){
    //             bcrypt.compare(userPass, result.password, function(err, found){
    //                 if(found === true){
    //                     res.render("secrets");
    //                 }
    //                 else{
    //                     res.send("Login Failed, wrong password");
    //                 }
    //             }); 
    //         }
    //         else{
    //             res.send("Account not found, please try again");
    //         }
    //     }
    // });

    const newUser = new User({
        username : req.body.username,
        password : req.body.password
    });

    req.login(newUser, function(err){
        if(err){
            console.log(err);
        }
        else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secrets");
            });
        }
        //login credentials saved to the cookie
    });
});

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
    //session ended upon logging out
})

app.listen(3000, function(){
    console.log("Server started on port 3000");
})

// cookie gets deleted upon restarting the server
