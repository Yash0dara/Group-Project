const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const mongoose = require('mongoose');

// Import workoutRouter
const workoutRouter = require('./routes/workouts.js');

app.use(cors());
app.use(express.json());



// Use workoutRouter for /workouts endpoint
app.use('/workouts', workoutRouter);

// MongoDB connection
const uri = "mongodb+srv://limethkurukulasooriya:epawela@cluster0.dwu4tij.mongodb.net/workout_db?retryWrites=true&w=majority&appName=Cluster0"; // Replace with your MongoDB URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
