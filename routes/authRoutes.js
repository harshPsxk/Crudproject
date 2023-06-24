const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');
const Manager = require('../models/Manager');

// Employee registration
router.post('/register/employee', async (req, res) => {
  const { firstName, lastName, gender, hobbies, email, username, password } = req.body;

  try {
    // Check if the employee already exists
    const existingEmployee = await Employee.findOne({ email });

    if (existingEmployee) {
      return res.status(409).json({ error: 'Employee already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new employee
    const newEmployee = await Employee.create({
      firstName,
      lastName,
      gender,
      hobbies,
      email,
      username,
      password: hashedPassword,
    });

    // Generate a JWT token
    const token = jwt.sign({ id: newEmployee._id }, 'your-secret-key', { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    console.error('Error during employee registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Employee login
router.post('/login/employee', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the employee exists
    const employee = await Employee.findOne({ email });

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, employee.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: employee._id }, 'your-secret-key', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Error during employee login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Manager registration
router.post('/register/manager', async (req, res) => {
  const { email, password, username } = req.body;

  try {
    // Check if the manager already exists
    const existingManager = await Manager.findOne({ email });

    if (existingManager) {
      return res.status(409).json({ error: 'Manager already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new manager
    const newManager = await Manager.create({
      email,
      password: hashedPassword,
      username,
    });

    // Generate a JWT token
    const token = jwt.sign({ id: newManager._id }, 'your-secret-key', { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    console.error('Error during manager registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Manager login
router.post('/login/manager', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the manager exists
    const manager = await Manager.findOne({ email });

    if (!manager) {
      return res.status(404).json({ error: 'Manager not found' });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, manager.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: manager._id }, 'your-secret-key', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Error during manager login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
