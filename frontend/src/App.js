import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Header from './component/Header';
import Sidebar from './component/Sidebar';
import OverView from './component/OverView';
import Workouts from './component/Workouts';
import Goals from './component/Goals';
import Progress from './component/Progress';
function App() {
  return (
    <div>
      <Router>
        <Header />
        <div className='d-flex'>
        <Sidebar/>
        <Routes>
          <Route path='/Workouts' element={<Workouts/>} />         
          <Route path="/OverView" element={<OverView/>}/>
          <Route path="/Goals" element={<Goals/>}/>
          <Route path="/Progress" element={<Progress/>}/>

        </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
