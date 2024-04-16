import React, { useState } from 'react';

function WorkoutManager() {
  // State for workout information
  const [workoutInfo, setWorkoutInfo] = useState({
    name: '',
    videoUrl: '',
    description: '',
    caloriesBurnedMale: 0,
    caloriesBurnedFemale: 0,
    repetitions: 0,
    bmi: 0,
    gender: 'male',
  });

  // Function to handle changes in the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkoutInfo({
      ...workoutInfo,
      [name]: value,
    });
  };

  // Function to calculate calories burned
  const calculateCaloriesBurned = () => {
    let caloriesBurned = 0;
    if (workoutInfo.gender === 'male') {
      caloriesBurned = workoutInfo.repetitions * 5 * workoutInfo.bmi;
    } else if (workoutInfo.gender === 'female') {
      caloriesBurned = workoutInfo.repetitions * 4 * workoutInfo.bmi;
    }
    setWorkoutInfo({
      ...workoutInfo,
      caloriesBurnedMale: caloriesBurned,
      caloriesBurnedFemale: caloriesBurned,
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    calculateCaloriesBurned();
    // Here you can handle the submission of the workout information
    // For example, send it to an API or store it in local state
    console.log(workoutInfo);
  };

  return (
    <div className="workout-manager">
      <h2>Add Workout</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Workout Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={workoutInfo.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="videoUrl">Video URL:</label>
        <input
          type="text"
          id="videoUrl"
          name="videoUrl"
          value={workoutInfo.videoUrl}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={workoutInfo.description}
          onChange={handleChange}
          required
        />

        <label htmlFor="repetitions">Repetitions:</label>
        <input
          type="number"
          id="repetitions"
          name="repetitions"
          value={workoutInfo.repetitions}
          onChange={handleChange}
          required
        />

        <label htmlFor="bmi">BMI:</label>
        <input
          type="number"
          id="bmi"
          name="bmi"
          value={workoutInfo.bmi}
          onChange={handleChange}
          required
        />

        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          name="gender"
          value={workoutInfo.gender}
          onChange={handleChange}
          required
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <button type="submit">Add Workout</button>
      </form>

      {/* Display Calories Burned */}
      <div className="calories-burned">
        <h3>Calories Burned:</h3>
        <p>Male: {workoutInfo.caloriesBurnedMale}</p>
        <p>Female: {workoutInfo.caloriesBurnedFemale}</p>
      </div>
    </div>
  );
}

export default WorkoutManager;
