const mongoose = require("mongoose");

const uri = "mongodb://localhost:27017/";

const dbName = "FruitsDB";

const minRating = 1;
const maxRating = 10;
mongoose.connect(uri + dbName, {useNewUrlParser: true});

const fruitSchema = new mongoose.Schema({
    name: {type: String,
    required: [true,"A name is required"]},
    rating: {
        type: Number,
    min: minRating,
    max: maxRating},
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
    name: "Apple",
    rating: 7,
    review: "Cool"
});
const fruit2 = new Fruit({
    name: "Orange",
    rating: 8,
    review: "super"
});

//fruit2.save();
//fruit.save();

const personSchema = new mongoose.Schema({
   name: {
       type: String,
       required: [true, "everyone needs a name"]
   },
   age: Number,
   favouriteFruit: fruitSchema
});

const pineApple = new Fruit(
    {
        name: "Pineapple",
        rating: 7,
        review: "good enough"
    }
);
//pineApple.save();
const Person = mongoose.model("Person", personSchema);

const person = new Person(
    {
        name: "John",
        age: 37
    }
);

const amy = new Person(
    {
        name: "Amy",
        age: 12,
        favouriteFruit: pineApple
    }
);
//person.save();
//amy.save();
async function run() {
    await fruit2.save();
    await fruit.save();
    await pineApple.save();
    await person.save();
        await amy.save();
        Fruit.find(function (err, fruits) {
            if(err)
            {
                console.log(err);
            }
            else
            {
                fruits.forEach(fruitElement => {
                    console.log(fruitElement.name);
                });
                mongoose.connection.close();
            }
        });
};

/*Fruit.find(function (err, fruits) {
    if(err)
    {
        console.log(err);
    }
    else
    {
        fruits.forEach(fruitElement => {
            console.log(fruitElement.name);
        });
        mongoose.connection.close();
    }
});*/
run().catch(console.dir);