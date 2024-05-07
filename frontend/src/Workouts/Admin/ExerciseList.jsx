import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from "../../components/Navbar";


function ExerciseList() {
  const [exercises, setExercises] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingExercise, setEditingExercise] = useState(null);
  const [editReps, setEditReps] = useState('');

  useEffect(() => {
    // Fetch the list of exercises from the backend
    axios.get('http://localhost:8070/exercises')
      .then(response => {
        setExercises(response.data);
      })
      .catch(error => {
        console.error('Error fetching exercises:', error);
      });
  }, []);

  const filteredExercises = exercises.filter(exercise =>
    exercise.exname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    // Delete exercise with the given id
    axios.delete(`http://localhost:8070/exercises/${id}`)
      .then(response => {
        console.log('Exercise deleted successfully');
        // Refresh exercise list after deletion
        setExercises(exercises.filter(exercise => exercise._id !== id));
      })
      .catch(error => {
        console.error('Error deleting exercise:', error);
      });
  };

  const handleEdit = (exercise) => {
    // Set the exercise to be edited and initialize the edit reps with the current reps
    setEditingExercise(exercise);
    setEditReps(exercise.reps);
  };

  const handleSaveEdit = () => {
    // Edit exercise reps
    axios.put(`http://localhost:8070/exercises/edit/${editingExercise._id}`, { reps: editReps })
      .then(response => {
        console.log('Exercise updated successfully');
        // Refresh exercise list after updating
        setExercises(exercises.map(exercise => {
          if (exercise._id === editingExercise._id) {
            return { ...exercise, reps: editReps };
          }
          return exercise;
        }));
        setEditingExercise(null);
        setEditReps('');
      })
      .catch(error => {
        console.error('Error updating exercise:', error);
      });
  };

  return (
    <div className='mt-12'>   
    <Navbar/>
     <div className='container'>
      <div className="header">
        <h2 className="text-2xl font-bold mb-4">Exercise List</h2>
        <Link to="/WorkoutList" className="green-button">
          <button>View Workouts</button>
        </Link>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by exercise name..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="row">
        {filteredExercises.map(exercise => (
          <div key={exercise._id} className="col-md-4 mb-4">
            <div className="card">
              <img src={exercise.imageUrl} className="card-img-top" alt={exercise.exname} />
              <div className="card-body">
                <h5 className="card-title">{exercise.exname}</h5>
                <p className="card-text">{exercise.description}</p>
                <p className="card-text">Repetitions: {exercise.reps} </p>
                <a href={exercise.videoUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer" style={{ backgroundColor: 'red' }}>Watch Video</a>
                <button className="btn btn-danger mt-2" onClick={() => handleDelete(exercise._id)}>Delete</button>
                {editingExercise && editingExercise._id === exercise._id ? (
                  <div>
                    <input
                      type="number"
                      value={editReps}
                      onChange={(e) => setEditReps(parseInt(e.target.value))}
                    />
                    <button className="btn btn-secondary" onClick={handleSaveEdit}>Save</button>
                  </div>
                ) : (
                  <button className="btn btn-secondary" onClick={() => handleEdit(exercise)}>Edit</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link to="/ExerciseForm">
        <button className="btn btn-primary mt-4">Add Exercise</button>
      </Link>
    </div>
    </div>

  );
}

export default ExerciseList;

// CSS Styles
const styles = `
.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-5px);
}

.card-img-top {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-body {
  padding: 20px;
}

.card-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.card-text {
  font-size: 1rem;
  color: #333;
  margin-bottom: 10px;
}

.btn {
  display: inline-block;
  font-weight: 400;
  color: #212529;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn-primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
  text-decoration: none;
}

.btn-primary:hover {
  color: #fff;
  background-color: #0056b3;
  border-color: #0056b3;
  text-decoration: none;
}

.btn-danger {
  color: #00000;
}

.btn-danger:hover {
  color: #fff;
  background-color: #c82333;
  border-color: #bd2130;
}

.btn-secondary {
  background-color: #6c757d;
  color: #fff;
  border: none;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  cursor: pointer;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.search-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 20px;
}

.green-button {
  padding: 8px 16px;
  font-size: 14px;
  background-color: #524f4e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.green-button:hover {
  background-color: #2e2b2b;
}

.row {
  display: flex;
  flex-wrap: wrap;
}

.col-md-4 {
  flex: 0 0 30%;
  max-width: 30%;
  margin-right: 10px;
}
`;

// Create the style tag
const styleTag = document.createElement('style');
styleTag.type = 'text/css';
styleTag.appendChild(document.createTextNode(styles));
document.head.appendChild(styleTag);
