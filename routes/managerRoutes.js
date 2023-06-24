const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const Manager = require('../models/Manager.js'); // Update the file name to 'Manager.js'

// CRUD routes for managers

// Additional query route (will search according to departmentName, categoryName, location, salary)
// GET /api/managers/query
router.get('/managers', (req, res) => {
  const { departmentName, categoryName, location, salary } = req.query;
  const query = {};

  if (departmentName) {
    query.departmentName = { $eq: departmentName };
  }

  if (categoryName) {
    query.categoryName = { $eq: categoryName };
  }

  if (location) {
    query.location = { $eq: location };
  }

  if (salary) {
    query.salary = { $eq: parseInt(salary) };
  }

  Manager.find(query)
    .then((managers) => {
      res.json(managers);
    })
    .catch((err) => {
      console.error('Error retrieving Department:', err);
      res.status(500).json({ error: 'Failed to retrieve Department' });
    });
});

// POST /api/managers
router.post('/managers', (req, res) => {
  const managerData = req.body;
  const employeeID = managerData.employeeID; // Get the employeeID from the request body

  // Convert the employeeID to ObjectId
  managerData.employeeID = new ObjectId(employeeID);

  Manager.create(managerData)
    .then((createdManager) => {
      console.log('Created Department:', createdManager);
      res.status(201).json(createdManager);
    })
    .catch((error) => {
      console.error('Error creating Department:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// PUT /api/managers/:id
router.put('/managers/:id', (req, res) => {
  const { id } = req.params;
  const { departmentName, categoryName, location, salary } = req.body;

  Manager.findByIdAndUpdate(
    id,
    { departmentName, categoryName, location, salary },
    { new: true }
  )
    .then((updatedManager) => {
      if (updatedManager) {
        res.json({ message: 'Department updated successfully' });
      } else {
        res.status(404).json({ error: 'Department not found' });
      }
    })
    .catch((err) => {
      console.error('Error updating Department:', err);
      res.status(500).json({ error: 'Failed to update Department' });
    });
});

// DELETE /api/managers/:id
router.delete('/managers/:id', (req, res) => {
  const { id } = req.params;
  Manager.findByIdAndDelete(id)
    .then((deletedManager) => {
      if (deletedManager) {
        res.json({ message: 'Department deleted successfully' });
      } else {
        res.status(404).json({ error: 'Department not found' });
      }
    })
    .catch((err) => {
      console.error('Error deleting Department:', err);
      res.status(500).json({ error: 'Failed to delete Department' });
    });
});

module.exports = router;
