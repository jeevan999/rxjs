const mongoose = require('mongoose');

const OneSchema = new mongoose.Schema({
    name: String,
    pid: mongoose.Schema.Types.ObjectId,
    email: String
});
module.exports = mongoose.model('One', OneSchema);