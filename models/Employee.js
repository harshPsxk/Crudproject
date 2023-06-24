const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: { type: String},
  lastName: { type: String},
  gender: { type: String},
  hobbies: [{ type: String }],
  email: { type: String },
  username: { type: String, unique: true },
  password: { type: String, unique: true },
  authToken: { type: String }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
