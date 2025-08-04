import React, { useEffect, useState } from "react";
import axios from "axios";
import {BACK} from "./Util";

const AttendanceDashboard = () => {
  const [attendance, setAttendance] = useState([]);
  // Get the student ID from local storage 
  const s = localStorage.getItem("profile-id");
  const imag = localStorage.getItem("profile-image");

  useEffect(() => {
 const fetchAttendance = async () => {
      try {
        const response = await axios.get(`${BACK}/user/${s}`);
        // console.log("recordd",response.data.records);
       
      
        setAttendance(response.data.records);
        localStorage.setItem("attendance-count", response.data.records.length);

      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    }
    fetchAttendance();
  }, [s]);
  // filter date not dublicate date this logdate
  
  


 
 
 
 
 
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
        <div className="w-[300px] ml-20">
          <img src={imag} alt="Student" className="h-[250px] flex items-center justify-center rounded-full sm:ml-52 w-[200px]" />
        </div>
       
        {/* three box display P , A , L */}
        <div className="flex justify-between items-center mt-6 mb-4 gap-1">
          <div
            style={{
              background: "rgba(255,255,255,0.1)",
              padding: "0.5rem 1.5rem",
              borderRadius: 12,
              color: "#43cea2",
              fontWeight: 600,
              fontSize: "1.2rem",
              textAlign: "center",

            }}
          >
            Present {attendance.filter(record => record.status === "Present").length}
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.1)",
              padding: "0.5rem 1.5rem",
              borderRadius: 12,
              color: "#ff512f",
              fontWeight: 600,
              fontSize: "1.2rem",
              textAlign: "center",

            }}
          >
            Absent {attendance.filter(record => record.status === "Absent").length}
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.1)",
              padding: "0.5rem 1.5rem",
              borderRadius: 12,
              color: "#185a9d",
              fontWeight: 600,
              fontSize: "1.2rem",
              textAlign: "center",
            }}
          >
            Late {attendance.filter(record => record.status === "Late").length}
          </div>

        </div>

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
                      {/* filter unique date */}
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
