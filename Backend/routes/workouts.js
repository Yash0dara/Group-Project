const router = require('express').Router();
const Workout = require('../models/Workout');

// POST - Add a new workout
router.post('/add', (req, res) => {
    console.log("Reached POST /workouts/add endpoint");
    const { name, age, gender } = req.body;
  
    const newWorkout = new Workout({
      name,
      age,
      gender,
    });

  newWorkout
    .save()
    .then(() => {
      res.json("Workout Added");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("Error 1: " + err);
    });
});

// GET - Get all workouts
router.route('/').get((req, res) => {
  Workout.find()
    .then((workouts) => {
      res.json(workouts);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("Error: " + err);
    });
});

// PUT - Update a workout
router.route('/update/:id').put(async (req, res) => {
  let userId = req.params.id;
  const { name, age, gender } = req.body;

  const updateWorkout = {
    name,
    age,
    gender,
  };

  try {
    const updatedWorkout = await Workout.findByIdAndUpdate(userId, updateWorkout, {
      new: true,
    });

    res.json({ status: "Workout updated", workout: updatedWorkout });
  } catch (err) {
    console.log(err);
    res.status(400).json("Error: " + err);
  }
});

// DELETE - Delete a workout
router.route('/delete/:id').delete(async (req, res) => {
  let userId = req.params.id;

  try {
    await Workout.findByIdAndDelete(userId);
    res.json({ status: "Workout deleted" });
  } catch (err) {
    console.log(err);
    res.status(400).json("Error: " + err);
  }
});

// GET - Get a single workout by ID
router.route('/get/:id').get(async (req, res) => {
  let userId = req.params.id;

  try {
    const workout = await Workout.findById(userId);
    res.json({ status: "Workout fetched", workout });
  } catch (err) {
    console.log(err);
    res.status(400).json("Error: " + err);
  }
});

module.exports = router;
