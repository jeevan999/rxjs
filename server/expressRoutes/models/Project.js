const mongoose = require('mongoose');
const ProjectSchema = new mongoose.Schema({
    name: String,
    collab: [String]
});
module.exports = mongoose.model('Project', ProjectSchema);