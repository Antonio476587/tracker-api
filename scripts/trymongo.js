require("dotenv").config();
const { MongoClient } = require("mongodb");

const url = process.env.DB_URL || "mongodb://localhost/issuetracker";

function testWithCallbacks(callback) {
  console.log("\n---TestWithCallbacks---");

  const client = new MongoClient(url, { useNewUrlParser: true });

  client.connect((conError) => {
    if (conError) {
      client.close();
      callback(conError);
      return;
    }

    console.log("Connected to MongoDB URL", url);
    const db = client.db();
    const collection = db.collection("employees");
    const employee = { id: 1, name: "A. Callback", age: 23 };
    collection.insertOne(employee, (insertErr, result) => {
      if (insertErr) {
        client.close();
        callback(insertErr);
        return;
      }
      console.log("Result of insert \n", result.insertedId);
      collection.find({ _id: result.insertedId })
        .toArray((findError, docs) => {
          if (findError) {
            client.close();
            callback(findError);
            return;
          }
          console.log("Result of find:\n", docs);
          client.close();
          callback(findError);
        });
    });
  });
}

async function testWithAsync() {
  console.log("\n---TestWithAsync---");
  const client = new MongoClient(url, { useNewUrlParser: true });

  try {
    await client.connect();
    console.log("Connected to MongoDB URL", url);
    const db = client.db();

    const collection = db.collection("employees");

    const employee = { id: 2, name: "B. Async", age: 16 };

    const result = await collection.insertOne(employee);
    console.log("Result of insert \n", result.insertedId);
    const docs = await collection.find({ _id: result.insertedId })
      .toArray();
    console.log("Result of find:\n", docs);
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
}

testWithCallbacks((err) => {
  if (err) {
    console.log(err);
  }
  testWithAsync();
});
