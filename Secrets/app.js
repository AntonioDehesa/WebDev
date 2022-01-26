require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreatePlugin = require('mongoose-findorcreate');
const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
//passport needs bodyParser, even if express does not need it anymore. 
/*Encryption*/
const secret = process.env.secretString;
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
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
    password: String,
    googleId: String,
    secret: String
    /*password: {type: String,
    required: true}//we do not need to specify the password here, as passport does it for us
    password: String*/
});
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

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
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({ googleId: profile.id, username: profile.name.givenName + " " + profile.name.familyName }, function (err, user) {
      return cb(err, user); 
    });
  }
));

///methods
app.get("/", function (req,res) {
    res.render("home");
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ["profile"] }));

app.get('/auth/google/secrets', 
passport.authenticate('google', { failureRedirect: '/login' }),
function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('/secrets');
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.route("/submit").
get(function (req,res) {
  if(req.isAuthenticated())
  {
    res.render("submit");
  }
  else
  {
    res.redirect("/login");
  }
}).
post(function (req,res) {
  const submittedSecret = req.body.secret;

  console.log(req.user.id);

  User.findById(req.user.id, function (err,foundUser) {
    if(err)
    {
      console.log(err);
    }
    else
    {
      if(foundUser)
      {
        foundUser.secret = submittedSecret;
        foundUser.save(function () {
          res.redirect("/secrets");
        })
      }
    }
  })
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
  User.find({"secret": {$ne: null}}, function (err, foundUsers) {
    if(err)
    {
      console.log(err);
    }
    else
    {
      if(foundUsers)
      {
        res.render("secrets", {usersWithSecrets: foundUsers});
      }
    }
  });
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