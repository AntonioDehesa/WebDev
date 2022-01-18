require('dotenv').config(); //Required to store API keys in env and not in code
const express = require("express");
//const { response } = require("express");
const app = express();
const mongoose = require("mongoose");
//const encrypt = require("mongoose-encryption");
//const sha256 = require("js-sha256");
const bcrypt = require("bcrypt");
const saltRounds = 10;
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
//const ejs = require("ejs");

app.set('view engine', 'ejs');

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/userBD",{useNewUrlParser: true});

const userSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true},
    password: {type: String,
    required: true}
});

/*Encryption*/
const secret = process.env.secretString;

//userSchema.plugin(encrypt, {secret: secret, encryptedFields: ["password"]});

const User = new mongoose.model("User", userSchema);
///methods
app.get("/", function (req,res) {
    res.render("home");
});

app.get("/login", function (req,res) {
    res.render("login");
});

app.get("/register", function (req,res) {
    res.render("register");
});

app.post("/register", function (req,res) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            const newUser = new User({
                email: req.body.username,
                password: hash
            });
            newUser.save(function (err) {
                if(err)
                {
                    console.log("There was an error when creating a new user");
                    console.log(err);
                }
                else
                {
                    res.render("secrets");
                }
            });
        });
    });
    
});

app.post("/login", function (req,res) {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email: username}, function (err,foundUser) {
        if(err)
        {
            console.log("There was an error when geeting a registered user");
            console.log(err);
        }
        else
        {
            if(foundUser)
            {
                bcrypt.compare(password, foundUser.password, function (err,result) {
                    if(result)
                    {
                        res.render("secrets");
                    }
                });
            }
        }
    })
})

app.listen(3000, function () {
    console.log("Server started on port 3000");
});