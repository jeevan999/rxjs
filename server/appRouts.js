const express = require('express');
const routes = express.Router();



routes.post('/postdata', (req, res) => {
    res.send('hello')
})
routes.get('/readdata', (req, res) => {
    res.send('hello')
})
routes.put('/updatedata', (req, res) => {
    res.send('hello')
})
routes.delete('/deletedata', (req, res) => {
    res.send('hello')
})

module.exports = routes