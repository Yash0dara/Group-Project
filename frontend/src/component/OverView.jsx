import React from 'react';
import Barchart from './Barchart';
import PieChart from './PieChart';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function Overview() {
  return (
    <div className="flex-grow-1 px-4 py-5">
      <Container>
        <h1 className="mb-4">Overview</h1>

        {/* Search Bar */}
        <Row className="mb-4">
          <Col xs={12} md={6}>
            <Form.Control type="text" placeholder="Search..." />
          </Col>
          <Col xs={12} md={2}>
            <Button variant="primary" className="w-100">Search</Button>
          </Col>
        </Row>

        {/* Information Blocks */}
        <Row className="mb-4">
          <Col xs={12} md={4}>
            <div className="p-3 bg-light border">
              <h3>Calories</h3>
              <p>Today's Calories: 1500</p>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div className="p-3 bg-light border">
              <h3>Workout Hours</h3>
              <p>Today's Workout Hours: 2</p>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div className="p-3 bg-light border">
              <h3>Steps</h3>
              <p>Today's Steps: 8000</p>
            </div>
          </Col>
        </Row>

        {/* Graphs */}
        <Row>
          <Col xs={12} md={4}>
            <div className="p-3 bg-light border">
              <h3>Workout Progress</h3>
              <Barchart />
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div className="p-3 bg-light border">
              <h3>Steps Taken</h3>
              <PieChart />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Overview;
