require('dotenv').config(); //Required to store API keys in env and not in code
const express = require("express");
const https = require("https");
const { response } = require("express");
let day = {};
let items = ["Buy Food","Cook Food"];


const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function(req,res)
{
    let today = new Date();

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("en-US", options);
    res.render("list", {DAY: day, newItems: items});
    //res.sendFile(__dirname + "/index.html");
});


app.post("/", function(req,res)
{
    let item = req.body.newItems;
    items.push(item);
    res.redirect("/");
});

/*app.put("/", function(req,res)
{
    let item = req.body.newItems;
    items.push(item);
    res.redirect("/");
    res.render("list",{newItems: items});
});*/

app.listen(3000, function()
{
    console.log("Server is running on port 3000");
});