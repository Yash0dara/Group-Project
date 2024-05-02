// models/Employee.js

const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  workDays: {
    type: Number,
    required: true
  },
  salary: {
    type: Number,
    default: 0
  },
  salaryHistory: [
    {
      month: {
        type: String,
        required: true
      },
      salary: {
        type: Number,
        required: true
      }
    }
  ]
});

const salary = mongoose.model('salary', salarySchema);

module.exports = salary;
