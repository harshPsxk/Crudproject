const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

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

  const employeesCollection = req.db.collection('employees');

  employeesCollection
    .find(query)
    .toArray()
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
  const employeesCollection = req.db.collection('employees');

  employeesCollection
    .insertOne(employeeData)
    .then((result) => {
      const insertedId = result.insertedId;
      employeesCollection
        .findOne({ _id: insertedId })
        .then((insertedEmployee) => {
          console.log('Inserted document:', insertedEmployee);
          res.status(201).json(insertedEmployee);
        })
        .catch((error) => {
          console.error('Error retrieving inserted employee:', error);
          res.status(500).json({ error: 'Internal server error' });
        });
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
  const employeesCollection = req.db.collection('employees');

  employeesCollection
    .updateOne(
      { _id: new ObjectId(id) }, // Use new ObjectId(id) instead of ObjectId(id)
      { $set: { firstName, lastName, gender, hobbies } }
    )
    .then(() => {
      res.json({ message: 'Employee updated successfully' });
    })
    .catch((err) => {
      console.error('Error updating employee:', err);
      res.status(500).json({ error: 'Failed to update employee' });
    });
});

// DELETE /api/employees/:id
router.delete('/employees/:id', (req, res) => {
  const { id } = req.params;
  const employeesCollection = req.db.collection('employees');

  employeesCollection
    .deleteOne({ _id: new ObjectId(id) })
    .then(() => {
      res.json({ message: 'Employee deleted successfully' });
    })
    .catch((err) => {
      console.error('Error deleting employee:', err);
      res.status(500).json({ error: 'Failed to delete employee' });
    });
});

module.exports = router;
