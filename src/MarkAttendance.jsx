import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { BACK } from "./Util"; // Adjust the import path as needed
const MarkAttendance = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const id = localStorage.getItem("profile-id");
 const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage("");
  setError("");
  try {
    if (!id) {
      setError("Student ID not found. Please login again.");
      return;
    }
    if (!date || !status) {
      setError("Please fill all fields.");
      return;
    }
    const res = await axios.post(`${BACK}/user/mark`, {
      student: id,
      date,
      status,
    });
    if (res.data && (res.data.message || res.status === 201)) {
      toast.success("Attendance marked successfully");
      setMessage("Attendance marked successfully");
      setDate("");
      setStatus("");
      setTimeout(() => {
        navigate("/userattendance");
      }, 1200);
    } else {
      setError("Attendance not marked. Try again.");
    }
  } catch (err) {
    setError(err.response?.data?.error || err.message || "Error marking attendance");
  }
};
  return (
    
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(120deg, #43cea2 0%, #185a9d 50%, #ff512f 100%)",
        padding: "2rem 1rem",
      }}
    >
      
      <Toaster position="top-center" reverseOrder={false} />
      <form
        onSubmit={handleSubmit}
        style={{
          background: "rgba(255,255,255,0.13)",
          borderRadius: 24,
          boxShadow: "0 8px 32px 0 rgba(31,38,135,0.15)",
          padding: "2.5rem 2rem 2rem 2rem",
          minWidth: 320,
          maxWidth: 400,
          width: "100%",
          backdropFilter: "blur(8px)",
          border: "1.5px solid rgba(255,255,255,0.18)",
          display: "flex",
          flexDirection: "column",
          gap: "1.2rem",
        }}
      >
        <h1 style={{ color: "#fff", textAlign: "center", marginBottom: 8, fontSize: "1.5rem" }}>Mark Attendance</h1>
        <input
          type="password"
          readOnly
          placeholder="Student ID"
          value={id}
          onChange={e => setStudent(e.target.value)}
          required
          style={{
            padding: "0.8rem 1rem",
            borderRadius: 8,
            border: "none",
            fontSize: "1rem",
            marginBottom: 4,
          }}
        />
      <input
  type="date"
  value={date}
  onChange={e => setDate(e.target.value)}
  required
  style={{
    padding: "0.8rem 1rem",
    borderRadius: 8,
    border: "none",
    fontSize: "1rem",
    marginBottom: 4,
    minWidth: 0,
    width: "100%",
    maxWidth: "100%",
  }}
/>
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          required
          style={{
            padding: "0.8rem 1rem",
            borderRadius: 8,
            border: "none",
            fontSize: "1rem",
            marginBottom: 4,
          }}
        >
          <option value="">Select Status</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Late">Late</option>
          <option value="Excused">Excused</option>
        </select>
        <button
          type="submit"
          style={{
            padding: "0.9rem 0",
            borderRadius: 8,
            border: "none",
            background: "linear-gradient(90deg, #43cea2 0%, #185a9d 100%)",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1.1rem",
            cursor: "pointer",
            marginTop: 8,
            boxShadow: "0 4px 16px rgba(67,206,162,0.2)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
        >
          Mark Attendance
        </button>
        {message && <div style={{ color: "#43cea2", textAlign: "center" }}>{message}</div>}
        {error && <div style={{ color: "#ff512f", textAlign: "center" }}>{error}</div>}
      </form>
    </div>
  );
};

export default MarkAttendance;
