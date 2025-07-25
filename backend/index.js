// Load environment variables from .env file
//require('dotenv').config();

const connectToMongo= require('./db');
const express = require('express');


//Connect to MongoDB
connectToMongo();
const app = express()
const port = process.env.PORT || 5000
var cors=require('cors');
//var app = express();
app.use(cors());

app.use(express.json());

//Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

const path = require('path');

// Serve static files from the React app build directory in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
}

//Start the server
app.listen(port, () => {
  console.log(`iNote backend listening at http://localhost:${port}`)
})
