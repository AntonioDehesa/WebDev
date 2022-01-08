const { MongoClient } = require("mongodb");
const assert = require("assert");

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb://localhost:27017";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const database = client.db('fruitsDB');
    const products = database.collection('fruits');
    insertDocuments(database,function () {
        console.log("added");
    })
    
    // Query for a movie that has the title 'Back to the Future'
    const query = { name: "apple" };
    const movie = await products.findOne(query);

    console.log(movie);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

const insertDocuments = function (db, callback) {
    const collection = db.collection("fruits");
    collection.insertMany([
        {
            name: "apple",
            score: 8,
            review: "good"
        },
        {
            name: "Orange",
            score: 6,
            review: "sour"
        }
    ]), function (err,result) {
        assert.equal(err,null);
        assert.equal(3,result.result.n);
        assert.equal(3,result.ops.length);
        console.log("inserted 3 documents into the collection");
    }
}

run().catch(console.dir);
