const express = require('express');
const app = express(); // express functions object
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const PORT = process.env.PORT || 5000; // get port number from .env file || if .env is not found, uses 5000 by default

app.use(cors());
app.use(express.json()); // from frontend we are sending json data, so in order to understand json we have to specify here

// in order to process the request from register route,
// we have to require it here
app.use('/api', authRoutes);

mongoose.connect(process.env.DB_URL).then((result)=> {
  console.log("DB Connected Succesfully!");
}).catch(err=> {
  console.log(err);
}); // connect to DB defined in .env file

// here, ()=> is a callback function that gets called when app.listen is executed succesfully
app.listen(PORT, ()=> {
  console.log(`Server started at port ${PORT}`);
});
