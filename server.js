const express = require('express');
const { MongoClient } = require('mongodb');
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
MongoClient.connect(mongoUrl, { useUnifiedTopology: true })
  .then((client) => {
    console.log('Connected to MongoDB');
    const db = client.db(dbName);

    // Middleware to pass db object to route handlers
    app.use((req, res, next) => {
      req.db = db;
      next();
    });

    // Connect the employee routes
    app.use('/api', employeeRoutes);

    // Connect the manager routes
    app.use('/api', managerRoutes);

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    // Close the MongoDB connection when the server shuts down
    process.on('SIGINT', () => {
      client.close();
      process.exit();
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
