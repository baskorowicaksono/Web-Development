//jshint esversion:6

//DISCLAIMER
// Login with facebook method doesn't work because basically facebook only allows connection with https:// domain
// so, until the app deploys live, the facebook sign in method won't be working

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
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const FacebookStrategy = require("passport-facebook").Strategy;




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
    password : String,
    googleId : String,
    facebookId : String
});

userSchema.plugin(passportLocalMongoose);   //using passport as plugin on Mongoose
userSchema.plugin(findOrCreate);

// userSchema.plugin(encrypt, {secret : process.env.SECRET, encryptedFields : ["password"]});

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL : "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
        console.log(profile);
      return cb(err, user);
    });
  }
));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/facebook/secrets"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({facebookId : profile.id}, function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));

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
});

//////////////////////////////////////GOOGLE OAUTH//////////////////////////////////////////////////////

app.get("/auth/google", passport.authenticate("google", {scope : ["profile"]}));    //redirecting to the google oauth

app.get("/auth/google/secrets", 
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect to secrets.
    res.redirect("/secrets");
  });

////////////////////////////////////FACEBOOK OAUTH//////////////////////////////////////////////////

app.get("/auth/facebook", passport.authenticate("facebook"));

app.get("/auth/facebook/secrets",
    passport.authenticate("facebook", {failureRedirect:"/login"}),
    function(req, res){
        res.redirect("/secrets");   //done upon successful authentication and will redirect to secrets.
    });

////////////////////////////////////////////////////////////////////////////////////////////////////
app.listen(3000, function(){
    console.log("Server started on port 3000");
})

// cookie gets deleted upon restarting the server
