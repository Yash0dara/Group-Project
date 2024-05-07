import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from "../../components/Navbar";

function WorkoutList() {
  const [workouts, setWorkouts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the list of workouts from the backend
    axios.get('http://localhost:8070/workouts')
      .then(response => {
        setWorkouts(response.data);
      })
      .catch(error => {
        console.error('Error fetching workouts:', error);
        setError('Error fetching workouts. Please try again.');
      });
  }, []);

  const handleDeleteWorkout = async (id) => {
    // Check if the workout exists in the state
    const existingWorkout = workouts.find(workout => workout._id === id);
    if (!existingWorkout) {
      setError('Workout not found.');
      return;
    }
  
    try {
      await axios.delete(`http://localhost:8070/workouts/${id}`);
      // After deleting, update the list of workouts
      setWorkouts(workouts.filter(workout => workout._id !== id));
    } catch (error) {
      console.error('Error deleting workout:', error);
      setError('Error deleting workout. Please try again.');
    }
  };
  // Function to calculate overall calories for a workout
  const calculateOverallCalories = (exercises) => {
    let totalCalories = 0;
    exercises.forEach(exercise => {
      totalCalories += exercise.approximateCalories;
    });
    return totalCalories;
  };

  // Filter workouts based on search term
  const filteredWorkouts = workouts.filter(workout =>
    workout.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // CSS Styles
  const styles = `
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      font-family: Arial, sans-serif;
    }

    .search-container {
      margin-bottom: 20px;
    }

    .search-input {
      width: 100%;
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }

    .workout-list {
      list-style: none;
      padding: 0;
      display: flex;
      flex-wrap: wrap; /* Added to wrap workouts to the next row */

    }

    .workout-item {
      margin-bottom: 20px;
      width: 30%;
      display: flex;
    }

    .workout-card {
      border: 1px solid #ccc;
      border-radius: 4px;
      flex: 1; /* Distribute remaining space equally */
      display: flex;
      flex-direction: column; /* Ensure equal height for each card */
    }

    .workout-card-body {
      padding: 20px;
    }

   
    
    .workout-title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .workout-description {
      font-size: 16px;
      color: #555;
      margin-bottom: 10px;
    }

    .workout-exercises {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .exercise-list {
      list-style: none;
      padding: 0;
    }

    .exercise-item {
      margin-bottom: 10px;
    }

    .exercise-card {
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    .exercise-card-body {
      padding: 20px;
    }

    .exercise-title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .exercise-description {
      font-size: 14px;
      color: #555;
      margin-bottom: 10px;
    }

    .exercise-reps {
      font-size: 14px;
      color: #555;
    }

    .add-workout-button {
      margin-top: 20px;
    }

    .view-exercises-button {
      background-color: #524f4e;
      border-color: #524f4e;
    }

    .view-exercises-button:hover {
      background-color: #2e2b2b;
      border-color: #2e2b2b;
    }
  `;

  // Create the style tag
  const styleTag = document.createElement('style');
  styleTag.type = 'text/css';
  styleTag.appendChild(document.createTextNode(styles));
  document.head.appendChild(styleTag);

  return (
    <div className='mt-10'>
      <Navbar/>
      <div className="container">
        <h2 className="text-2xl font-bold mb-4">Workout List</h2>
        <Link to="/ExerciseList" className="btn btn-primary mt-4 view-exercises-button">View Exercises</Link>

        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <div className="search-container mb-4">
          <input
            type="text"
            id="searchWorkout"
            placeholder="Search by workout name..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="workout-list">
          {filteredWorkouts.map(workout => (
            <div key={workout._id} className="workout-item">
              <div className="workout-card">
                <div className="workout-card-body">
                  <h5 className="workout-title">{workout.name}</h5>
                  <p className="workout-description">{workout.description}</p>
                  <p className="workout-exercises">Exercises:</p>
                  <ul className="exercise-list">
                    {workout.exercises.map(Exercise => (
                      <li key={Exercise.eid} className="exercise-item">
                        <div className="exercise-card">
                          <div className="exercise-card-body">
                            <h5 className="exercise-title">{Exercise.exname}</h5>
                            <p className="exercise-description">{Exercise.description}</p>
                            <p className="exercise-reps">Reptitions {Exercise.reps} </p>
                            <p className="exercise-calories">Approx. Calories: {Exercise.approximateCalories}</p>

                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <p className="workout-calories" style={{ color: 'green', marginTop: 'auto' }}>Overall Calories: {calculateOverallCalories(workout.exercises)}</p>
                  <button onClick={() => handleDeleteWorkout(workout._id)} className="delete-button">Delete</button>


                 
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container add-workout-button">
        <Link to="/WorkoutForm">
          <button className="btn btn-primary">Add Workout</button>
        </Link>
      </div>
    </div>
  );
}

export default WorkoutList;
