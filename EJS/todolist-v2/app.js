//required packages

const express = require("express");
const https = require("https");
const { response } = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");

//constants to be used later

let day = {};
let items = ["Buy Food","Cook Food"];
let workItems = [];

mongoose.connect("mongodb://localhost:27017/todoListDB",{useNewUrlParser: true});

const itemsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const Item = new mongoose.model("Item", itemsSchema);

const listSchema = {
    name: String,
    items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);


const item1 = new Item({
    name: "Welcome to your todolist!"
});

const item2 = new Item({
    name: "Hit the + button to add a new item."
});

const item3 = new Item({
    name: "<-- Hit this to delete an item."
});

const defaultItems = [item1,item2,item3];
//configuration

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
    day = "Today";
    //res.render("list", {listTitle: day, newItems: items});
    Item.find({},function (error,foundItems) {
        if(error)
        {
            console.log("Error when finding!");
        }
        else
        {
            res.render("list", {listTitle: day, newItems: foundItems});
        }
    });
    //res.sendFile(__dirname + "/index.html");
});


app.post("/", function(req,res)
{
    //let item = req.body.newItems;
    //console.log(req.body.list);
    const listName = req.body.list;
    const item = new Item({
        name: req.body.newItems
    });

    if(listName === "Today")
    {
        item.save();
        res.redirect("/");
    }
    else
    {
        List.findOne({name: listName}, function (err,foundList) {
            foundList.items.push(item);
            foundList.save();
            res.redirect("/" + listName);
        });
    }
});

app.get("/:customListName", function(req,res)
{
    const customListName = _.capitalize(req.params.customListName);
    List.findOne({name: customListName}, function (err,result) {
        if(err)
        {
            console.log("Error when looking for an existing custom list");
        }
        else
        {
            if(result)
            {
                res.render("list", {listTitle:customListName, newItems: result.items});
            }
            else
            {
                res.render("list", {listTitle:customListName, newItems: []});
                const list = new List({
                    name: customListName,
                    items: defaultItems
                });
                list.save();
            }
        }
    });
});

/*app.post("/work", function(req,res)
{
    let item = req.body.newItems;
    workItems.push(item);
    res.redirect("/");
});
*/
app.post("/delete", function (req,res) {
   const checkedItemID = req.body.checkbox;
   const listName = req.body.listName;
   if(listName === "Today")
   {
       Item.findByIdAndRemove(checkedItemID, function (err) {
            if(err)
            {
                console.log("Errors found when deleting item with ID");
                console.log(err);
            }
            else
            {
                console.log("Item deleted with ID");
                res.redirect("/");
            }
        });
   }
   else
   {
       List.findOneAndUpdate({name: listName},{$pull: {items: {_id: checkedItemID}}},
            function (err,foundList) {
                if(!err)
                {
                    res.redirect("/" + listName);
                }
                else
                {
                    console.log("Error while deleting item from custom list");
                }
            });
   }
});

app.get("/about", function(req,res)
{
    res.render("about");
});

app.listen(3000, function()
{
    console.log("Server is running on port 3000");
});