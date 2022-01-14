require('dotenv').config(); //Required to store API keys in env and not in code
const express = require("express");
const https = require("https");
const { response } = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.set('view engine', 'ejs');

app.use(express.static("public"));

const charactersToShorten = 100;
const address = "localhost:3000";

mongoose.connect("mongodb://localhost:27017/wikiDB",{useNewUrlParser: true});

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    }
});

const Article = new mongoose.model("article", articleSchema);

app.get("/articles", function (req,res) {
  Article.find({}, function (err,results) {
    if(err)
    {
      console.log("Error found while accessing the articles");
      console.log(err);
      res.send(err);
    }
    else
    {
      res.send(results);
    }
  })
});

app.post("/articles", function (req,res) {
  console.log(req.body.title);
  console.log(req.body.content);
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  });
  newArticle.save(function (err) {
    if(err)
    {
      res.send(err);
    }
    else
    {
      res.send("Successfully added a new article");
    }
  });
});

app.delete("/articles", function (req,res) {
  Article.deleteMany({}, function (err) {
    if(err)
    {
      res.send(err);
    }
    else
    {
      res.send("Successfully deleted all articles");
    }
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
