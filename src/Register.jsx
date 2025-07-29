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
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #43cea2 50%, #ff512f 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
      }}
    >
      <Toaster />
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          background: "rgba(255,255,255,0.13)",
          borderRadius: 24,
          boxShadow: "0 8px 32px 0 rgba(31,38,135,0.15)",
          padding: "2.5rem 2rem 2rem 2rem",
          backdropFilter: "blur(8px)",
          border: "1.5px solid rgba(255,255,255,0.18)",
        }}
      >
        <h2
          style={{
            fontSize: "2.2rem",
            fontWeight: 700,
            textAlign: "center",
            color: "#ff512f",
            marginBottom: 24,
            letterSpacing: 1,
            textShadow: "0 2px 8px rgba(0,0,0,0.13)",
          }}
        >
          User Registration
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <InputField label="Username" name="username" value={formData.username} onChange={handleChange} />
            <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
            <InputField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} />
            <InputField label="Roll Number" name="roll" value={formData.roll} onChange={handleChange} />
            <InputField label="Class" name="classname" value={formData.classname} onChange={handleChange} />
            <InputField label="Semester" name="semester" value={formData.semester} onChange={handleChange} />
            <InputField label="Branch" name="branch" value={formData.branch} onChange={handleChange} />
            <InputField label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
          </div>
          <div style={{ marginTop: 12 }}>
            <label style={{ color: "#333", fontWeight: 500, marginBottom: 4, display: "block" }}>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              required
              style={{
                width: "100%",
                padding: "0.8rem 1rem",
                borderRadius: 8,
                border: "none",
                fontSize: "1rem",
                marginBottom: 4,
                background: "rgba(255,255,255,0.7)",
                boxShadow: "0 1px 4px rgba(67,206,162,0.08)",
              }}
            />
          </div>
          <div style={{ marginTop: 12 }}>
            <label style={{ color: "#333", fontWeight: 500, marginBottom: 4, display: "block" }}>
              Profile Image (PNG/JPG only)
            </label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              accept="image/png, image/jpeg"
              required
              style={{
                width: "100%",
                padding: "0.5rem 0.2rem",
                borderRadius: 8,
                background: "rgba(255,255,255,0.7)",
                marginBottom: 4,
              }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: "linear-gradient(90deg, #43cea2 0%, #185a9d 100%)",
              color: "#fff",
              padding: "0.9rem 0",
              borderRadius: 8,
              border: "none",
              fontWeight: "bold",
              fontSize: "1.1rem",
              marginTop: 18,
              marginBottom: 8,
              boxShadow: "0 4px 16px rgba(67,206,162,0.2)",
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "background 0.2s, box-shadow 0.2s",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  style={{ marginRight: 8 }}
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
          </button>
          <Link
            to="/"
            style={{
              display: "block",
              width: "100%",
              textAlign: "center",
              color: "#185a9d",
              fontWeight: 600,
              textDecoration: "none",
              padding: "0.7rem 0",
              borderRadius: 8,
              background: "rgba(67,206,162,0.08)",
              marginTop: 4,
              transition: "background 0.2s, color 0.2s",
            }}
            className="btn3"
          >
            Login
          </Link>
        </form>
      </div>
    </div>
  );
};


// Reusable Input Component
const InputField = ({ label, name, type = "text", value, onChange }) => (
  <div style={{ marginBottom: 8 }}>
    <label style={{ color: "#333", fontWeight: 500, marginBottom: 4, display: "block" }}>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required
      style={{
        width: "100%",
        padding: "0.8rem 1rem",
        borderRadius: 8,
        border: "none",
        fontSize: "1rem",
        background: "rgba(255,255,255,0.7)",
        boxShadow: "0 1px 4px rgba(67,206,162,0.08)",
      }}
    />
  </div>
);

export default Register;
