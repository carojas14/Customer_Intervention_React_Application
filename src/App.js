import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signin from './components/Signin';
import Home from './components/Home'
import RequestForm from './components/RequestForm'

function App() {
  const token = localStorage.getItem('accessToken');

  if(!token) {
    return <Signin />
  }

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={< Signin />} />
          <Route path="/Home" element={< Home />} />
          <Route path="/NewIntervention" element={< RequestForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;