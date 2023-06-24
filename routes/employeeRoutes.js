const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const Employee = require('../models/Employee.js'); // Import the Employee model

// GET /api/employees
router.get('/employees', (req, res) => {
  const { firstName, lastName, gender, hobbies } = req.query;
  const query = {};

  if (firstName) {
    query.firstName = { $eq: firstName };
  }

  if (lastName) {
    query.lastName = { $eq: lastName };
  }

  if (gender) {
    query.gender = { $eq: gender };
  }

  if (hobbies) {
    query.hobbies = { $in: Array.isArray(hobbies) ? hobbies : [hobbies] };
  }

  Employee.find(query)
    .then((employees) => {
      res.json(employees);
    })
    .catch((err) => {
      console.error('Error retrieving employees:', err);
      res.status(500).json({ error: 'Failed to retrieve employees' });
    });
});

// POST /api/employees
router.post('/employees', (req, res) => {
  const employeeData = req.body;
  Employee.create(employeeData)
    .then((createdEmployee) => {
      console.log('Created employee:', createdEmployee);
      res.status(201).json(createdEmployee);
    })
    .catch((error) => {
      console.error('Error creating employee:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// PUT /api/employees/:id
router.put('/employees/:id', (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, gender, hobbies } = req.body;

  Employee.findByIdAndUpdate(
    id,
    { firstName, lastName, gender, hobbies },
    { new: true }
  )
    .then((updatedEmployee) => {
      if (updatedEmployee) {
        res.json({ message: 'Employee updated successfully' });
      } else {
        res.status(404).json({ error: 'Employee not found' });
      }
    })
    .catch((err) => {
      console.error('Error updating employee:', err);
      res.status(500).json({ error: 'Failed to update employee' });
    });
});

// DELETE /api/employees/:id
router.delete('/employees/:id', (req, res) => {
  const { id } = req.params;
  Employee.findByIdAndDelete(id)
    .then((deletedEmployee) => {
      if (deletedEmployee) {
        res.json({ message: 'Employee deleted successfully' });
      } else {
        res.status(404).json({ error: 'Employee not found' });
      }
    })
    .catch((err) => {
      console.error('Error deleting employee:', err);
      res.status(500).json({ error: 'Failed to delete employee' });
    });
});

module.exports = router;
