import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, Links, useNavigate } from "react-router-dom";
import { BACK } from "./Util";
import "./style.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

// current location compare
 const handlelocation=()=>{ 
  if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
      const latiiii = position.coords.latitude
      const longiiiii = position.coords.longitude
       localStorage.setItem("leti",latiiii)
       localStorage.setItem("longi",longiiiii)
      
      
    }
    // eslint-disable-next-line no-unused-vars
    , (err) => {
      toast.error("Location Not Found")
      setLoading(false)
      return
    })
  }
 }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${BACK}/user/login`, {
        email: formData.email,
        password: formData.password,
      },{
        withCredentials: true, // Ensure cookies are sent with the request

      });
      // date set local
      localStorage.setItem("date", response.data.date);
  //  console.log("log", response.data.date);
      // Handle successful login
      toast.success("Login successful!",{
        autoClose: 2000,
      });
      setTimeout(() => {
        
        navigate("/profile");
      }, 1200);
    //  console.log("tokennnnn",response.data.token);
      localStorage.setItem("authToken", response.data.token);
      // Redirect to dashboard or home page
    } catch (error) {
      // Handle different error scenarios
      if (error.response) {
        // Server responded with error status
        if (error.response.status === 401) {
          toast.error("Invalid username or password");
        } else if (error.response.status === 500) {
          toast.error("Server error. Please try again later");
        } else {
          toast.error(error.response.data.message || "Login failed");
        }
      } else if (error.request) {
        // Request was made but no response received
        toast.error("Network error. Please check your connection");
      } else {
        // Something else happened
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      
      <Toaster position="top-center" />
    
      <div className="w-full max-w-md bg-gradient-to-br bg-green-400 from-teal-700 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm">
        <div className="p-8">
          <h1 className="text-4xl  font-bold text-center text-black mb-8">
            LOGIN
          </h1>

          <form id='log' onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Email
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="log"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                
                <Link  to="/password-reset" className="ml-2 block text-gray-700 font-bold">Forgat password</Link>
              </div>

              
            </div>

            <button
              onClick={handlelocation}
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-bold text-lg shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  LOGGING IN...
                </>
              ) : (
                "LOGIN"
              )}
            </button>

            <p className="text-center text-gray-600 ">
              
              <Link
                to="/register"
                className="text-blue-600 font-semibold hover:underline"
              >
                REGISTER
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
