const mongoose = require('mongoose');

// Define a schema for the model
const LocationSchema = new mongoose.Schema({
  location: {
    type: String,
  },

});

// Create a model using the schema
const Location = mongoose.model('Location', LocationSchema);

module.exports = Location;