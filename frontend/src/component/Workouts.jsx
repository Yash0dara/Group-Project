import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

// Sample workout data
const workouts = [
  { id: 1, name: 'Workout 1', image: 'https://via.placeholder.com/150', description: 'Description for Workout 1' },
  { id: 2, name: 'Workout 2', image: 'https://via.placeholder.com/150', description: 'Description for Workout 2' },
  { id: 3, name: 'Workout 3', image: 'https://via.placeholder.com/150', description: 'Description for Workout 3' },
];

const Workouts = () => {
  return (
    
    <Container>
        
      <h1 className="mt-5 mb-4">BEGINNER</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {workouts.map(workout => (
          <Col key={workout.id}>
            <div className="card">
              <img src={workout.image} className="card-img-top" alt={workout.name} />
              <div className="card-body">
                <h5 className="card-title">{workout.name}</h5>
                <p className="card-text">{workout.description}</p>
                <Button variant="primary">Start Workout</Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
      <h1 className="mt-5 mb-4">INTERMEDIATE</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {workouts.map(workout => (
          <Col key={workout.id}>
            <div className="card">
              <img src={workout.image} className="card-img-top" alt={workout.name} />
              <div className="card-body">
                <h5 className="card-title">{workout.name}</h5>
                <p className="card-text">{workout.description}</p>
                <Button variant="primary">Start Workout</Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
      <h1 className="mt-5 mb-4">ADVANCED</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {workouts.map(workout => (
          <Col key={workout.id}>
            <div className="card">
              <img src={workout.image} className="card-img-top" alt={workout.name} />
              <div className="card-body">
                <h5 className="card-title">{workout.name}</h5>
                <p className="card-text">{workout.description}</p>
                <Button variant="primary">Start Workout</Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
    
  );
};

export default Workouts;
