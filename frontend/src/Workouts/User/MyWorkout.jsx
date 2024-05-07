import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../../components/Navbar";

function MyWorkout() {
  const [ongoingWorkouts, setOngoingWorkouts] = useState([]);
  const [completedWorkouts, setCompletedWorkouts] = useState([]);
  const [totalCaloriesBurned, setTotalCaloriesBurned] = useState(0);

  useEffect(() => {
    // Fetch ongoing workouts
    axios.get('http://localhost:8070/workouts?status=ongoing')
      .then(response => {
        setOngoingWorkouts(response.data);
      })
      .catch(error => {
        console.error('Error fetching ongoing workouts:', error);
      });

    // Fetch completed workouts and calculate total calories burned
    axios.get('http://localhost:8070/workouts?status=completed')
      .then(response => {
        setCompletedWorkouts(response.data);
        const totalCalories = response.data.reduce((total, workout) => total + workout.totalCalories, 0);
        setTotalCaloriesBurned(totalCalories);
      })
      .catch(error => {
        console.error('Error fetching completed workouts:', error);
      });
  }, []);

  return (
    <div >
      <Navbar />
      {/* <br></br>
      <br></br>
      <br></br>
      <br></br> */}

      <h2>Ongoing Workouts</h2>
      <ul>
        {ongoingWorkouts.map(workout => (
          <li key={workout._id}>{workout.name}</li>
        ))}
      </ul>

      <h2>Completed Workouts</h2>
      <ul>
        {completedWorkouts.map(workout => (
          <li key={workout._id}>{workout.name}</li>
        ))}
      </ul>

      <h2>Total Calories Burned: {totalCaloriesBurned}</h2>

      {/* Button to navigate to MyUserView */}
      <Link to="/WorkoutUserView">
        <button style={{
          backgroundColor: '#4CAF50',
          border: 'none',
          color: 'white',
          padding: '15px 32px',
          textAlign: 'center',
          textDecoration: 'none',
          display: 'inline-block',
          fontSize: '16px',
          margin: '4px 2px',
          cursor: 'pointer',
        }}>Go to My User View</button>
      </Link>
    </div>
  );
}

export default MyWorkout;
