const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017"; // Update with your MongoDB URI if needed

const dbName = "table_booking";
const collectionName = "chairs";

async function getData() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const data = await collection.find({}).toArray();
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    await client.close();
  }
}

// Call the function to fetch and log the data
getData();
