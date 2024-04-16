import React from 'react';
import { Nav } from 'react-bootstrap';

function Sidebar() {
  return (
    <div className="d-flex flex-column h-100">
      <h1 className="visually-hidden">Sidebars examples</h1>
      <div className="b-example-divider b-example-vr"></div>

      <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{ width: '280px' }}>
        <a href="/OverView" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
          <svg className="bi pe-none me-2" width="40" height="32"><use xlinkHref="#bootstrap" /></svg>
          <span className="fs-4">K1-Fitness</span>
        </a>
        <hr />
        <Nav defaultActiveKey="/" className="flex-column mb-auto">
          <Nav.Link href="/" className="nav-link active">
            <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#Overview" /></svg>
            Overview
          </Nav.Link>
          <Nav.Link href="/Workouts" className="nav-link link-body-emphasis">
            <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#Workout" /></svg>
            Workout
          </Nav.Link>
          <Nav.Link href="/Goals" className="nav-link link-body-emphasis">
            <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#Goals" /></svg>
            Goals
          </Nav.Link>
          <Nav.Link href="/Progress" className="nav-link link-body-emphasis">
            <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#Progress" /></svg>
            Progress
          </Nav.Link>
        </Nav>
        
        
      </div>
    </div>
  );
}

export default Sidebar;
