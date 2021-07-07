//jshint esversion:6
const express = require("express");

const app = express();

app.get("/", function(request, response)
{
    //console.log(request);
    response.send("<h1>Hello</h1>");
});


app.get("/contact", function(req, res)
{
    //console.log(request);
    res.send("<h1>Contact me at ...</h1>");
});

app.get("/about", function(req,res)
{
    res.send("This is just a test page for the web dev course");
});

app.use(function(req, res)
{
    res.send(404);
});

app.listen(3000, function()
{
    console.log("Server started on port 3000");
});