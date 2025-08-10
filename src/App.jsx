import React from 'react'
import Profile from './Profile'
import Register from './Register'
import Login from './Login'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AttendanceDashboard from './AttendanceDashboard';
import AdminLogin from './AdminLogin';
import Home from './Home';
import MarkAttendance from './MarkAttendance';
import { Passwordreset } from './Passwordreset';
import { Forgatpassword } from './Forgatpassword';
const App = () => {
  // set token localstorese
 const toke=localStorage.getItem('authToken'); 
// set admin localstorage

  
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/profile" element={ toke? <Profile />:"" } />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/" element={<Home />} />
        <Route path="/userattendance" element={<AttendanceDashboard />} />
        <Route path="/markattendance" element={<MarkAttendance />} />
        <Route path="/password-reset" element={<Passwordreset />} />
        <Route path="/forgatpassword/:id/:token" element={<Forgatpassword />} />


      </Routes>
    </BrowserRouter>
   
  );
}  

export default App;