const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
  departmentName: { type: String, required: true },
  categoryName: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number, required: true },
  employeeID: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }
});

const Manager = mongoose.model('Manager', managerSchema);

module.exports = Manager;
