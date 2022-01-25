require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
var LocalStrategy = require('passport-local').Strategy;
const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
//passport needs bodyParser, even if express does not need it anymore. 
/*Encryption*/
const secret = process.env.secretString;

app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true},
    password: String
    /*password: {type: String,
    required: true}//we do not need to specify the password here, as passport does it for us
    password: String*/
});
userSchema.plugin(passportLocalMongoose);

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
///methods
app.get("/", function (req,res) {
    res.render("home");
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.route("/login").
get(function (req,res) {
  res.render("login");
}).
post(function (req,res) {
  passport.authenticate("local")(req,res,function(){
    res.redirect("/secrets");
  });
});

app.get("/secrets", function (req,res) {
  if(req.isAuthenticated())
  {
    res.render("secrets");
  }
  else
  {
    res.redirect("/login");
  }
});

app.route("/register").
get(function (req,res) {
  res.render("register");
}).
post(function(req, res){
  User.register(new User({username: req.body.username}), req.body.password, function(err, user){
    if (err) {
      console.log(err);
      res.render("register");
    } 
    passport.authenticate("local")(req,res,function(){
      res.redirect("/secrets");
  })    
  });
  
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});