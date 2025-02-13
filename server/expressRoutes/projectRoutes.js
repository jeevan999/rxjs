const express = require('express');
const router = express.Router();
const Project = require('./models/Project');
const One = require('./models/One');
const Two = require('./models/Two');

router.get('/getall-data', async (req, res) => {
    try {
        const projects = await Project.find();
        const result = await Promise.all(projects.map(async (project) => {
            const ones = await One.find({ $or: [{ pid: project._id }, { email: { $in: project.collab } }] });
            const twos = await Two.find({ $or: [{ pid: project._id }, { email: { $in: project.collab } }] });
            return { ...project.toObject(), ones, twos };
        }));
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;