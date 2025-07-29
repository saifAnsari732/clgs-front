import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

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
      // eslint-disable-next-line no-unused-vars
      const res = await axios.post("http://localhost:3000/api/v1/user/mark", {
        student,
        date,
        status,
      });
      toast.success("Attendance marked successfully");
      setMessage("Attendance marked successfully");
      setStudent("");
      setDate("");
      setStatus("");
      setTimeout(() => {
        navigate("/userattendance");
      }, 1200); // 1.2 seconds so user sees the toast
    } catch (err) {
      setError(err.response?.data?.error || "Error marking attendance");
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
        <h2 style={{ color: "#fff", textAlign: "center", marginBottom: 8 }}>Mark Attendance</h2>
        <input
          type="text"
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
