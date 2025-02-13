const mongoose = require('mongoose');

const TwoSchema = new mongoose.Schema({
    name: String,
    pid: mongoose.Schema.Types.ObjectId,
    email: String
});
module.exports = mongoose.model('Two', TwoSchema);
