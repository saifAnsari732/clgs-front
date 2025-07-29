import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import  toast, { Toaster } from "react-hot-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

   const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("email2", email);
    localStorage.setItem("password2", password);
    //    get data from localstorage
    const storedEmail = localStorage.getItem("email2");
    const storedPassword = localStorage.getItem("password2");
    
    if(storedEmail==="saif@me.com" && storedPassword==="muit12"){

      toast.success("Admin login successful");
      setTimeout(() => {
        navigate("/markattendance");
      }, 1000);
    }
    else{
        setError("Admin not found");
    }
  };
  // set data in localstorage login ke liye

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 via-green-200 to-teal-300">
      <div className="bg-white/70 rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
          <p className="text-center text-red-500">
            {error }
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
