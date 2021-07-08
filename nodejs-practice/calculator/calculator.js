const bodyParser = require("body-parser");
const express = require("express");
//const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req,res)
{
    //res.send("Hello World");
    //res.sendFile("index.html");
    //console.log(__dirname);
    res.sendFile(__dirname + "/index.html");
});


app.post("/", function(req, res)
{
   console.log(req.body); 
   var sum = Number(req.body.num1) + Number(req.body.num2);
   console.log(sum);
   res.send("The result is " + sum);
});


app.get("/bmicalculator", function(req,res)
{
    res.sendFile(__dirname + "/bmiCalculator.html");
});


app.post("/bmicalculator",function(req,res)
{
    var body = req.body;
    var weight = Number(body.weight);
    var height = Number(body.height);
    res.send("Your BMI is " + (weight / (height * height)));
});

app.listen(3000, function()
{
    console.log("Server started at port 3000");
});