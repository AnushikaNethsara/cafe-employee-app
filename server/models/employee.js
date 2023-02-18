const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

const employeeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, match: /^UI[0-9a-zA-Z]{7}$/ },
  name: { type: String, required: true },
  email_address: { type: String, required: true, validate: validator.isEmail },
  phone_number: { type: String, required: true, match: /^[89]\d{7}$/ },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  cafe: { type: String, required: true },
  start_date: { type: Date, required: true, default: Date.now }
},
 {
  // Add a unique index on the combination of id and cafe fields
  // to ensure no same employee can work in 2 cafes
  unique: true,
  index: {
    unique: true,
    partialFilterExpression: { cafe: { $exists: true } }
}
});

employeeSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

module.exports = mongoose.model('employee_schema', employeeSchema);
