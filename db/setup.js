require('dotenv').config();
const mongoose = require('mongoose');
const { seed_DB } = require('./seed');

const connectionUrl = process.env.MONGO_URI;

mongoose.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB!');
    seed_DB();
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

module.exports = mongoose.connection;
