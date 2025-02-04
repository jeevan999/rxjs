const { MongoClient } = require('mongodb');

// MongoDB connection URI
const uri = "mongodb://localhost:27017"; // Update with your MongoDB URI if needed

// Database name and collection name
const dbName = "table_booking"; // Replace with your database name
const collectionName = "chairs"; // Replace with your collection name

async function getData() {
  const client = new MongoClient(uri);

  try {
    // Connect to MongoDB
    await client.connect();

    // Get the database and collection
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    // Fetch all documents in the collection
    const data = await collection.find({}).toArray();

    // Log the data to the console
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    // Close the connection
    await client.close();
  }
}

// Call the function to fetch and log the data
getData();
