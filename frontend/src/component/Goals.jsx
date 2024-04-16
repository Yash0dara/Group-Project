import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function Goals() {
  return (
    <div className="py-5">
      <Container>
        {/* First Image Description */}
        <Row className="mb-4">
          <Col>
            <h2>Set Your Fitness Goals</h2>
            <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pretium tortor vitae quam elementum, eu suscipit ipsum mollis.</p>
          </Col>
        </Row>

        {/* Top Picked Workouts Boxes */}
        <Row className="mb-4">
          <Col xs={12} md={4}>
            <Card>
              <Card.Img variant="top" src="https://via.placeholder.com/400x200" />
              <Card.Body>
                <Card.Title>Workout 1</Card.Title>
                <Card.Text>
                  Description of Workout 1.
                </Card.Text>
                <Button variant="primary">Select</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card>
              <Card.Img variant="top" src="https://via.placeholder.com/400x200" />
              <Card.Body>
                <Card.Title>Workout 2</Card.Title>
                <Card.Text>
                  Description of Workout 2.
                </Card.Text>
                <Button variant="primary">Select</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card>
              <Card.Img variant="top" src="https://via.placeholder.com/400x200" />
              <Card.Body>
                <Card.Title>Workout 3</Card.Title>
                <Card.Text>
                  Description of Workout 3.
                </Card.Text>
                <Button variant="primary">Select</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Second Image Description */}
        <Row className="mb-4">
          <Col>
            <h2>More Workout Options</h2>
            <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pretium tortor vitae quam elementum, eu suscipit ipsum mollis.</p>
          </Col>
        </Row>

        {/* Additional Workouts */}
        <Row>
          <Col xs={12} md={4}>
            <Card>
              <Card.Img variant="top" src="https://via.placeholder.com/400x200" />
              <Card.Body>
                <Card.Title>Workout 4</Card.Title>
                <Card.Text>
                  Description of Workout 4.
                </Card.Text>
                <Button variant="primary">Select</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card>
              <Card.Img variant="top" src="https://via.placeholder.com/400x200" />
              <Card.Body>
                <Card.Title>Workout 5</Card.Title>
                <Card.Text>
                  Description of Workout 5.
                </Card.Text>
                <Button variant="primary">Select</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card>
              <Card.Img variant="top" src="https://via.placeholder.com/400x200" />
              <Card.Body>
                <Card.Title>Workout 6</Card.Title>
                <Card.Text>
                  Description of Workout 6.
                </Card.Text>
                <Button variant="primary">Select</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Goals;
