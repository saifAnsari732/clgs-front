import React from 'react'
import Profile from './Profile'
import Register from './Register'
import Login from './Login'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AttendanceDashboard from './AttendanceDashboard';
import Dashboard from './Dashboard';
import AdminLogin from './AdminLogin';
const App = () => {
  // set token localstorese
 const toke=localStorage.getItem('authToken'); 
// set admin localstorage

  
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/profile" element={ toke? <Profile />:"" } />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/Dashboard" element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
   
  );
}  

export default App;