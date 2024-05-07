import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../../components/Navbar";

function WorkoutForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    exercises: []
  });
  const [exercises, setExercises] = useState([]);
  const [error, setError] = useState(null);

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

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = e => {
    const { value } = e.target;
    setFormData({ ...formData, exercises: [...formData.exercises, value] });
  };

  const handleRemoveExercise = index => {
    const updatedExercises = [...formData.exercises];
    updatedExercises.splice(index, 1);
    setFormData({ ...formData, exercises: updatedExercises });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(formData); 
    try {
      const response = await axios.post('http://localhost:8070/workouts/add', formData);
      console.log(response.data);
      // Clear the form after successful submission
      setFormData({
        name: '',
        description: '',
        exercises: []
      });
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error adding workout:', error.response ? error.response.data : error.message);
      setError('Error adding workout. Please try again.'); // Set error message
    }
  };

  return (
    <div className='mt-10'>
      <Navbar/>
    <div className="container" style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2 className="text-2xl font-bold mb-4">Add Workout</h2>
      {error && <div className="alert alert-danger" role="alert">{error}</div>} {/* Error message */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Workout Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="description" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="exercises" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Select Exercises:</label>
          <select
            id="exercises"
            onChange={handleSelectChange}
            multiple
            style={{ width: '100%', padding: '10px', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}
          >
            {exercises.map(exercise => (
              <option key={exercise._id} value={exercise._id}>{exercise.exname}</option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '10px', fontWeight: 'bold' }}>Selected Exercises:</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {formData.exercises.map((exerciseId, index) => {
              const selectedExercise = exercises.find(exercise => exercise._id === exerciseId);
              if (!selectedExercise) return null;
              return (
                <li key={exerciseId} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>
                  <span style={{ fontWeight: 'bold' }}>{selectedExercise.exname}</span>
                  <button type="button" onClick={() => handleRemoveExercise(index)} style={{ marginLeft: '10px', padding: '5px 10px', fontSize: '0.8rem', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Remove</button>
                </li>
              );
            })}
          </ul>
        </div>
        <button type="submit" className="btn btn-primary" style={{ display: 'inline-block', padding: '10px 20px', fontSize: '1rem', fontWeight: 'bold', color: '#fff', backgroundColor: '#007bff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add Workout</button>
      </form>
    </div>
    </div>
  );
  
}

export default WorkoutForm;
