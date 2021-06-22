//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

//database connection using mongoDB
mongoose.connect("mongodb+srv://admin-baskoro:chucknorris01@cluster0.nbkkl.mongodb.net/todolistDB", {useNewUrlParser : true});

//schema and model init of the database
const itemsSchema = {
  name : String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name : "Welcome to your ToDoList"
});
const item2 = new Item({
  name: "Hit the + button to add an item"
});
const item3 = new Item({
  name: "Hit the checklist to mark the item as resolved"
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name : String,
  items :  [itemsSchema]
};

const List = mongoose.model("List", listSchema);

// Item.insertMany(defaultItems, function(err){
//   if(err){
//     console.log(err);
//   }
//   else{
//     console.log("Documents successfully added");
//   }
// });

app.get("/", function(req, res) {

//const day = date.getDate();

Item.find({}, function(err,results){
  if(err){
    console.log(err);
  }
  else{
    if(results.length === 0){
      Item.insertMany(defaultItems, function(err){
        if(err){
          console.log(err);
        }
        else{
          console.log("Documents successfully added");
        }
      });
      res.redirect("/");
    }
    else{
      res.render("list", {listTitle: "Today", newListItems: results});
    }
  }
  });

  

});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;

  // if (req.body.list === "Work") {
  //   workItems.push(item);
  //   res.redirect("/work");
  // } else {
  //   items.push(item);
  //   res.redirect("/");
  // }

  const newItem = new Item({
    name : itemName
  });
  

  if(listName === "Today"){
    newItem.save();
    res.redirect("/");
  }
  else{
    List.findOne({name : listName}, function(err, foundList){
      foundList.items.push(newItem);
      foundList.save();
      res.redirect("/" + listName);
    });
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.post("/delete", function(req, res){
  const idToRemove = req.body.checkbox;
  const listName = req.body.listName;

  if(listName === "Today"){
    Item.findByIdAndDelete(idToRemove, function(err){
      if(err){
        console.log(err);
      }
      else{
        console.log("\nSuccessfully deleted the item");
        res.redirect("/");
      }
    });
  }
  else{
    List.findOneAndUpdate({name : listName}, {$pull : {items : {_id : idToRemove}}}, function(err, foundList){
      if(!err){
        console.log("\nSuccessfully deleted an item from " + listName);
        res.redirect("/" + listName);
      }
    });
  }
});

app.get("/:customName", function(req,res){
  const customName = _.capitalize(req.params.customName);
 

  List.findOne({name : customName}, function(err, foundList){
    if(err){
      console.log(err);
    }
    else{
      if(foundList){
        console.log("Exist");
        res.render("list", {listTitle : foundList.name, newListItems : foundList.items});
      }
      else{
        console.log("Not Exist");
        const list = new List({
          name : customName,
          items : defaultItems
        });
        list.save(() => res.redirect('/' + customName));
      }
    }
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started Successfully");
});
