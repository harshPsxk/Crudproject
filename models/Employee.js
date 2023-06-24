const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  hobbies: [{ type: String }],
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
