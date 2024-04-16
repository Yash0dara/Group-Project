import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Barchart from './Barchart';
import PieChart from './PieChart';

function Progress() {
  // Sample data for bar chart
  const barChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Calories Burned (kcal)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(54, 162, 235, 0.7)',
        hoverBorderColor: 'rgba(54, 162, 235, 1)',
        data: [1500, 1800, 2000, 1900],
      },
    ],
  };

  // Sample data for pie chart
  const pieChartData = {
    labels: ['Cardio', 'Strength Training', 'Yoga'],
    datasets: [
      {
        data: [40, 30, 30],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const [chartHeight, setChartHeight] = useState(400); // Initial height for charts

  // Calculate the height of Charts based on Sidebar height
  useEffect(() => {
    const sidebarElement = document.getElementById('sidebar');
    if (sidebarElement) {
      const sidebarHeight = sidebarElement.clientHeight;
      const calculatedHeight = sidebarHeight / 2 - 20; // Adjusting for margin/padding
      setChartHeight(calculatedHeight);
    }
  }, []);

  return (
    <div className="py-5">
      <Container>
        <h2>Weekly Fitness Progress</h2>
        <Row className="mt-4">
          {/* Bar Chart */}
          <Col md={6}>
            <Card>
              <Card.Body>
                <h3 className="mb-4">Calories Burned</h3>
                <div style={{ height: `${chartHeight}px` }}>
                  <Barchart data={barChartData} />
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Pie Chart */}
          <Col md={6}>
            <Card>
              <Card.Body>
                <h3 className="mb-4">Workout Types</h3>
                <div style={{ height: `${chartHeight}px` }}>
                  <PieChart data={pieChartData} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Progress;
