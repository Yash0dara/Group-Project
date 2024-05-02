// routes/employees.js

const express = require('express');
const router = express.Router();

const Salary = require('../models/salary');

// Save salary for each employee
router.post('/save_salary', async (req, res) => {
  try {
    const { salry_ID, name, position, workDays, salary } = req.body;

    // Find the salary document by ID
    const savedSalary = await Salary.findById(salry_ID);

    if (!savedSalary) {
      return res.status(404).json({ message: 'Salary document not found' });
    }

    // Save salary and month to salary history
    const month = new Date().toLocaleString('default', { month: 'long' });

    savedSalary.salary = salary;
    savedSalary.salaryHistory.push({ month, salary });

    await savedSalary.save();

    res.status(200).json({ message: 'Salary saved successfully' });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get salary history for an employee
router.get('/salary_history/:salID', async (req, res) => {
  try {
    const salID = req.params.salry_ID;
    const salary = await Salary.findById(salID);
    if (!salary) {
      return res.status(404).json({ message: 'Salary not found' });
    }

    // Return salary history
    const salaryHistory = salary.salaryHistory || [];
    res.status(200).json(salaryHistory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
