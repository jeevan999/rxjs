var express = require('express');
var mongoose = require('mongoose');
var socketIo = require('socket.io');
var http = require('http');

// Set up Express
var app = express();
var server = http.createServer(app);
var io = socketIo(server);

// MongoDB setup
mongoose.connect('mongodb://localhost:27017/table_booking')
  .then(function() {
    console.log('MongoDB connected successfully');
  })
  .catch(function(err) {
    console.log('MongoDB connection error: ' + err);
  });

// MongoDB Model
var DataSchema = new mongoose.Schema({
  name: String,
});

var DataModel = mongoose.model('chairs', DataSchema);

// Set up Socket.IO for real-time communication
io.on('connection', function(socket) {
  console.log('A user connected');

  // Emit some initial real-time data
  socket.emit('initialData', 'Hello from server!');

  // Handle real-time data update (this is just an example)
  socket.on('sendData', function(data) {
    console.log('Received data from client:', data);
  });

  // Handle disconnection
  socket.on('disconnect', function() {
    console.log('User disconnected');
  });
});

// GET route to fetch data from MongoDB
app.get('/readdata', async function(req, res) {
  try {
    // Using async/await to fetch data
    var data = await DataModel.find({});
    res.json(data); // Send the data as a JSON response
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch data from the database' });
  }
});

// POST route to add new data into MongoDB
app.post('/adddata', express.json(),async function(req, res) {
  var newData = new DataModel({
    name: req.body.name,
  });

  newData.save(function(err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to add data to the database' });
    }
    res.status(200).json({ message: 'Data added successfully' });
  });
});

// Start the server
var PORT = 8000;
server.listen(PORT, function() {
  console.log('Server is running on port ' + PORT);
});
