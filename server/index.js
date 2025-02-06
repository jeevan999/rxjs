const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const app=express();
app.use(express.json());
app.use(cors())
const getRoutes=require("./expressRoutes/getRouts");
const postRoutes=require("./expressRoutes/postRoutes");
const deleteRoutes=require("./expressRoutes/deleteRoutes");

mongoose.connect("mongodb://localhost:27017/table_booking").then(()=>{
    console.log('mongoose Connected!');
})

app.use('/read-data',getRoutes)
app.use('/add-data',postRoutes)
app.use('/delete-data',deleteRoutes)

app.listen(8000,()=>{
    console.log('listening to port 8000')
})