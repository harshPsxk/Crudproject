const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');



// CRUD routes for departments

// GET /api/departments
router.get('/departments', (req, res) => {
  const departmentsCollection = req.db.collection('departments');

  departmentsCollection
    .find({})
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
  const { departmentName, categoryName, location, salary, employeeID } = req.body;
  const departmentsCollection = db.collection('departments');

  departmentsCollection
    .updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          departmentName,
          categoryName,
          location,
          salary,
          employeeID,
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
  const departmentsCollection = db.collection('departments');

  departmentsCollection
    .deleteOne({ _id: ObjectId(id) })
    .then(() => {
      res.json({ message: 'Department deleted successfully' });
    })
    .catch((err) => {
      console.error('Error deleting department:', err);
      res.status(500).json({ error: 'Failed to delete department' });
    });
});

// Additional query route
// GET /api/departments/query
router.get('/departments/query', (req, res) => {
  const departmentsCollection = db.collection('departments');

  departmentsCollection
    .find({ categoryName: 'Sales' })
    .sort({ employeeID: -1 })
    .toArray()
    .then((departments) => {
      res.json(departments);
    })
    .catch((err) => {
      console.error('Error retrieving departments:', err);
      res.status(500).json({ error: 'Failed to retrieve departments' });
    });
});

module.exports = router;
