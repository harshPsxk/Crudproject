const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
  departmentName: { type: String},
  categoryName: { type: String},
  location: { type: String},
  salary: { type: Number},
  email: { type: String },
  username: { type: String, unique: true },
  password: { type: String, unique: true },
  authToken: { type: String },
  employeeID: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }
});

const Manager = mongoose.model('Manager', managerSchema);

module.exports = Manager;
