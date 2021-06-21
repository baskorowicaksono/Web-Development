const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true });

const fruitSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Mana namanya"]
    },
    rating : {
        type : Number,
        min : 1,
        max : 10
    },
    review : String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
    name : "Apple",
    rating : 7,
    review : "mayan lah ya"
});

// fruit.save();

const personSchema = new mongoose.Schema({
    name : String,
    age : Number,
    favFruit : fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
    name : "John Wick",
    age : 37
});

// person.save();

const kiwi = new Fruit({
    name : "Kiwi",
    rating : 5,
    review : "biasa aja"
});

const orange = new Fruit({
    name : "orange",
    rating : 8,
    review : "cakep gan"
});

const banana = new Fruit({
    name : "Banana",
    rating : 3,
    review : "Lanang kok mangan gedang"
});

// Fruit.insertMany([kiwi, orange, banana], function(err){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("Successfully logged all fruits into the DB");
//     }
// })

Fruit.find(function(err, fruits){
    if(err){
        console.log(err);
    }
    else{
        fruits.forEach(function(fruit){
            console.log(fruit.name);
        });
        mongoose.connection.close();
    }
})

// Person.updateOne({_id:"60cee73742aff03b246c6d87"}, {name : "John Santoso"}, function(err){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("\nSuccessfully updated People document");
//     }
// })

// Fruit.deleteOne({name:"Banana"}, function(err){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("\nSuccessfully deleted Banana");
//     }
// })

// Person.updateOne({_id:"60cee73742aff03b246c6d87"}, {favFruit : orange}, function(err){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("\nSuccessfully updated People Document");
//     }
// })