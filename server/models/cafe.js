const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const cafeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  logo: { type: String },
  location: { type: String, required: true },
  id: { type: String, required: true, unique: true }
});

cafeSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

module.exports = mongoose.model('cafe_schema', cafeSchema);
