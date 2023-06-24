const express = require('express');
const mongoose = require('mongoose');
const employeeRoutes = require('./routes/employeeRoutes');
const managerRoutes = require('./routes/managerRoutes');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// MongoDB connection URL and database name
const mongoUrl = 'mongodb+srv://bloodyj:bloodyjungle@cluster0.4m6omfz.mongodb.net/';
const dbName = 'EmployeeManagement'; // Replace with your database name

// Connect to MongoDB
mongoose
  .connect(mongoUrl + dbName, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');

    // Connect the employee routes
    app.use('/api', employeeRoutes);

    // Connect the manager routes
    app.use('/api', managerRoutes);

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
