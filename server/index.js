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

  socket.emit('initialData', 'Hello from server!');
  socket.on('sendData', function(data) {
    console.log('Received data from client:', data);
  });

  socket.on('disconnect', function() {
    console.log('User disconnected');
  });
});

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

app.delete('/delete', async function (req, res) {
  try {
    const { _id } = req.body;

    if (!_id) {
      return res.status(400).json({ error: 'ID is required' });
    }

    const result = await DataModel.findByIdAndDelete(_id);

    if (!result) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.status(200).json({ message: 'Deleted successfully', deletedItem: result });
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Start the server
var PORT = 8000;
server.listen(PORT, function() {
  console.log('Server is running on port ' + PORT);
});
