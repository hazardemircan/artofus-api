const express = require('express');
const connectDB = require('./db/db');
const bitMapRoutes = require('./Api/Routes/bitMapRoutes');
const app = express();

connectDB();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// Define routes
app.use('/Api/bitMap', bitMapRoutes);


module.exports=app;
