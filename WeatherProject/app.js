const express = require("express");
const https = require("https");


const app = express();


app.get("/", function(req,res)
{
    var weather = https.get("http://api.openweathermap.org/data/2.5/weather?q=Paris&appid=c69ef9ab35e75cbb525faf65f0255336&units=metric");
    res.send("Server is up and running");
});

app.listen(3000, function()
{
    console.log("The server is running in port 3000");
});