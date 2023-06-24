const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');



// CRUD routes for departments

// Additional query route ( will search according with departmentName, categoryName, location, salary)
// GET /api/departments/query
router.get('/departments', (req, res) => {
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

  const departmentsCollection = req.db.collection('departments');

  departmentsCollection
    .find(query)
    .toArray()
    .then((departments) => {
      res.json(departments);
    })
    .catch((err) => {
      console.error('Error retrieving departments:', err);
      res.status(500).json({ error: 'Failed to retrieve departments' });
    });
});

// POST /api/departments
router.post('/departments', (req, res) => {
  const departmentData = req.body;
  const employeeID = departmentData.employeeID; // Get the employeeID from the request body

  // Convert the employeeID to ObjectId
  departmentData.employeeID = new ObjectId(employeeID);

  const departmentsCollection = req.db.collection('departments');

  departmentsCollection
    .insertOne(departmentData)
    .then((result) => {
      const insertedId = result.insertedId;
      departmentsCollection
        .findOne({ _id: insertedId })
        .then((insertedDepartment) => {
          console.log('Inserted document:', insertedDepartment);
          res.status(201).json(insertedDepartment);
        })
        .catch((error) => {
          console.error('Error retrieving inserted department:', error);
          res.status(500).json({ error: 'Internal server error' });
        });
    })
    .catch((error) => {
      console.error('Error creating department:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});


// PUT /api/departments/:id
router.put('/departments/:id', (req, res) => {
  const { id } = req.params;
  const { departmentName, categoryName, location, salary } = req.body;
  const departmentsCollection = req.db.collection('departments');

  departmentsCollection
    .updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          departmentName,
          categoryName,
          location,
          salary,
        },
      }
    )
    .then(() => {
      res.json({ message: 'Department updated successfully' });
    })
    .catch((err) => {
      console.error('Error updating department:', err);
      res.status(500).json({ error: 'Failed to update department' });
    });
});


// DELETE /api/departments/:id
router.delete('/departments/:id', (req, res) => {
  const { id } = req.params;
  const departmentsCollection = req.db.collection('departments');

  departmentsCollection
    .deleteOne({ _id: new ObjectId(id) })
    .then(() => {
      res.json({ message: 'Department deleted successfully' });
    })
    .catch((err) => {
      console.error('Error deleting department:', err);
      res.status(500).json({ error: 'Failed to delete department' });
    });
});

module.exports = router;
