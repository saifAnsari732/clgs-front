import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { BACK } from "./Util";
import "./style.css";
const Register = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    roll: "",
    classname: "",
    semester: "",
    branch: "",
    phone: "",
    address: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const response = await axios.post(
        `${BACK}/user/register`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }, {
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );

      toast.success(response.data.message || "Registration successful!");
      //  nevigate to login or home page if needed
      navigate("/")
      
      // Reset form
      // setFormData({
      //   username: "",
      //   email: "",
      //   password: "",
      //   roll: "",
      //   classname: "",
      //   semester: "",
      //   branch: "",
      //   phone: "",
      //   address: "",
      //   image: null,
      // });
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr bg-green-800 from-slate-800 flex items-center justify-center p-3">
     
      <Toaster />
      
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4">
        <h2 className="text-3xl font-bold text-center text-orange-400 p-6 ">
          User Registration
        </h2>

        <form onSubmit={handleSubmit} className="">
          <div id='inp' className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <InputField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              
            />
            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            <InputField
              label="Roll Number"
              name="roll"
              value={formData.roll}
              onChange={handleChange}
            />
            <InputField
              label="Class"
              name="classname"
              value={formData.classname}
              onChange={handleChange}
            />
            <InputField
              label="Semester"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
            />
            <InputField
              label="Branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
            />
            <InputField
              label="Phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label  className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
             id='inps'
              className="w-full px-3 py-2   rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Image (PNG/JPG only)
            </label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              accept="image/png, image/jpeg"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 flex justify-center items-center  "
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white "
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
                Processing...
              </>
            ) : (
              "Register"
            )}
          </button> <br />
          <Link className='btn3  ' to='/'>Login</Link>
        </form>
      </div>
    </div>
  );
};

// Reusable Input Component
const InputField = ({ label, name, type = "text", value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>
);

export default Register;
