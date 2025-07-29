import React, { useEffect, useState } from "react";
import axios from "axios";


const AttendanceDashboard = () => {
  const [attendance, setAttendance] = useState([]);

  // For demo, you can use a hardcoded studentId or pass as prop
  // const s = studentId || "685ccdf767fc941df0378fab";
  const s = localStorage.getItem("profile-id");

  useEffect(() => {
 const fetchAttendance = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/user/${s}`);
        console.log(response.data);
        setAttendance(response.data);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    }
    fetchAttendance();
  }, [s]);
const imag=localStorage.getItem("profile-image")
  return (
    <div
    
      style={{
        minHeight: "100vh",
        background: "linear-gradient(120deg, #43cea2 0%, #185a9d 50%, #ff512f 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "2rem 1rem",
      }}
    >
      
      <div
        style={{
          background: "rgba(255,255,255,0.13)",
          borderRadius: 24,
          boxShadow: "0 8px 32px 0 rgba(31,38,135,0.15)",
          padding: "2.5rem 2rem 2rem 2rem",
          maxWidth: 700,
          width: "100%",
          marginTop: 40,
          backdropFilter: "blur(8px)",
          border: "1.5px solid rgba(255,255,255,0.18)",
        }}
      >
        {/* small image */}
        <div className="w-[300px] ml-11">
          <img src={imag} alt="Student" className="h-[250px] flex items-center justify-center rounded-full sm:ml-52 w-[200px]" />
        </div>
        <h2
          style={{
            color: "#fff",
            fontWeight: 700,
            fontSize: "2.2rem",
            marginBottom: 18,
            textAlign: "center",
            letterSpacing: 1,
            textShadow: "10 12px 8px rgba(0,0,0,0.3)",
          }}
        >
          Attendance Records
        </h2>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "rgba(255,255,255,0.07)",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            }}
          >
            <thead>
              <tr style={{ background: "linear-gradient(90deg, #43cea2 0%, #185a9d 100%)" }}>
                <th
                  style={{
                    color: "#fff",
                    padding: "1rem",
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    letterSpacing: 1,
                  }}
                >
                  Date
                </th>
                <th
                  style={{
                    color: "#fff",
                    padding: "1rem",
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    letterSpacing: 1,
                  }}
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {attendance.length === 0 ? (
                <tr>
                  <td colSpan={2} style={{ color: "#fff", textAlign: "center", padding: "1.5rem" }}>
                    No attendance records found.
                  </td>
                </tr>
              ) : (
                attendance.map((record) => (
                  <tr
                    key={record._id}
                    style={{
                      background: "rgba(255,255,255,0.09)",
                      textAlign: "center",
                      transition: "background 0.2s",
                    }}
                  >
                    <td style={{ color: "#222", padding: "0.9rem", fontWeight: 500 }}>
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td
                      style={{
                        color:
                          record.status === "Present"
                            ? "#43cea2"
                            : record.status === "Absent"
                            ? "#ff512f"
                            : "#185a9d",
                        fontWeight: 700,
                        padding: "0.9rem",
                        textTransform: "capitalize",
                        fontSize:"20px",
                      }}
                    >
                      {record.status}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceDashboard;