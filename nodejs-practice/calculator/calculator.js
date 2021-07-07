const express = require("express");

const app = express();


app.get("/", function(req,res)
{
    //res.send("Hello World");
    //res.sendFile("index.html");
    //console.log(__dirname);
    res.sendFile(__dirname + "/index.html");
});


app.post("/", function(req, res)
{
    res.send("Thank you for posting that!");
});

app.listen(3000, function()
{
    console.log("Server started at port 3000");
});