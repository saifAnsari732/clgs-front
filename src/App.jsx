import React from 'react'
import Profile from './Profile'
import Register from './Register'
import Login from './Login'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
const App = () => {
  // set token localstorese
 const toke=localStorage.getItem('authToken'); // Initialize authToken in localStorage
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/profile" element={ toke? <Profile />:<Navigate to={"/login"}></Navigate> } />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}  

export default App;