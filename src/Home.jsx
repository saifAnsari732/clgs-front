import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACK } from "./Util";

// toast
import { toast } from 'react-toastify';
import axios from "axios";
const Home = () => {
  // logout
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [user, setUser] = useState(null);
  const navigate = useNavigate();


 
  // logout

  const handlelogout = async () => {
    try {
      await axios.get(`${BACK}/user/logout`, {
        withCredentials: true,
      })
      toast.success("User logout Successfull..");
      console.log("saif ansari");
        localStorage.removeItem("authToken");
      setIsLoggedIn(false);
    
      
    } catch (error) {
      console.log(error);
    }
  }


  const authToken = localStorage.getItem("authToken");
   useEffect(() => {
    if (authToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleprofile= async()=>{
     if (!authToken) {
      toast.error("Please log in first", {
        position: "top-right",
        autoClose: 3000,
      });
    }
    else{
      navigate("/profile")
    }

  }



  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          width: "100%",
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgba(255,255,255,0.09)",
          backdropFilter: "blur(6px)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <span
          style={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1.5rem",
            letterSpacing: "1px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <span style={{ color: "#43cea2" }}>Attend</span>
          <span style={{ color: "#fff" }}>Ease</span>
        </span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
       <button onClick={handleprofile} className=" bg-gradient-to-r from-green-300 to-teal-600 text-black font-bold py-3 px-8 rounded-full ">
                Profile
              </button>
          
        </div>
      </nav>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1rem",
          width: "100%",
          background:
            "linear-gradient(120deg, #43cea2 0%, #185a9d 50%, #ff512f 100%)",
          transition: "background 0.5s",
        }}
      >
        <h1
          style={{
            color: "#fff",
            fontSize: "3rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            textShadow: "0 2px 8px rgba(0,0,0,0.2)",
            textAlign: "center",
          }}
        >
           Attendance System
        </h1>
        <p
          style={{
            color: "#f3f3f3",
            fontSize: "1.2rem",
            marginBottom: "2.5rem",
            maxWidth: 500,
            textAlign: "center",
          }}
        >
          Welcome! Please select your login type to continue.
          <br />
          <span style={{ color: "#43cea2", fontWeight: "bold" }}>
            Simple. Secure. Smart.
          </span>
        </p>
        <div
          style={{
            display: "flex",
            gap: "2.5rem",
            flexWrap: "wrap",
            justifyContent: "center",
            width: "100%",
            maxWidth: 600,
          }}
        >

          {isLoggedIn ? (
            <div
              style={{
                background: "rgba(255,255,255,0.13)",
                borderRadius: "24px",
                boxShadow: "0 8px 32px 0 rgba(31,38,135,0.15)",
                padding: "2rem 2.5rem",
                minWidth: 220,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "1.5rem",
                backdropFilter: "blur(8px)",
                border: "1.5px solid rgba(255,255,255,0.18)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
            >
              <span
                style={{ fontSize: "2.2rem", marginBottom: 10, color: "#43cea2" }}
              >
                👤
              </span>
              <h2 style={{ color: "#fff", fontWeight: 600, marginBottom: 8 }}>
                User
              </h2>
              <p
                style={{
                  color: "#e0e0e0",
                  fontSize: 14,
                  marginBottom: 18,
                  textAlign: "center",
                }}
              >
                Login as a student to mark and view your attendance.
              </p>
              <button
              className=" bg-gradient-to-r from-sky-300 to-teal-600 text-black font-bold py-3 px-14 rounded-full "
                onClick={handlelogout}
                style={{
                  padding: "0.7rem 2rem",
                  fontSize: "1.1rem",
                  borderRadius: "30px",
                  border: "none",
                  // backgroundColor: "green",
                  // color: "#fff",
                  fontWeight: "bold",
                  boxShadow: "0 4px 16px rgba(67,206,162,0.2)",
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  minWidth: 140,
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                User Logout
              </button>
             
            </div>
          ) : (
            <div
              style={{
                background: "rgba(255,255,255,0.13)",
                borderRadius: "24px",
                boxShadow: "0 8px 32px 0 rgba(31,38,135,0.15)",
                padding: "2rem 2.5rem",
                minWidth: 220,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "1.5rem",
                backdropFilter: "blur(8px)",
                border: "1.5px solid rgba(255,255,255,0.18)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
            >
              <span
                style={{ fontSize: "2.2rem", marginBottom: 10, color: "#43cea2" }}
              >
                👤
              </span>
              <h2 style={{ color: "#fff", fontWeight: 600, marginBottom: 8 }}>
                User
              </h2>
              <p
                style={{
                  color: "#e0e0e0",
                  fontSize: 14,
                  marginBottom: 18,
                  textAlign: "center",
                }}
              >
                Login as a student to mark and view your attendance.
              </p>
              <button
                onClick={() => navigate("/login")}
                style={{
                  padding: "0.7rem 2rem",
                  fontSize: "1.1rem",
                  borderRadius: "30px",
                  border: "none",
                  background: "linear-gradient(90deg, #43cea2 0%, #185a9d 100%)",
                  color: "#fff",
                  fontWeight: "bold",
                  boxShadow: "0 4px 16px rgba(67,206,162,0.2)",
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  minWidth: 140,
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                User Login
              </button>
            </div>
          )}
           
          <div
            style={{
              background: "rgba(255,255,255,0.13)",
              borderRadius: "24px",
              boxShadow: "0 8px 32px 0 rgba(31,38,135,0.15)",
              padding: "2rem 2.5rem",
              minWidth: 220,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "1.5rem",
              backdropFilter: "blur(8px)",
              border: "1.5px solid rgba(255,255,255,0.18)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            <span
              style={{ fontSize: "2.2rem", marginBottom: 10, color: "#ff512f" }}
            >
              🛡️
            </span>
            <h2 style={{ color: "#fff", fontWeight: 600, marginBottom: 8 }}>
              Admin
            </h2>
            <p
              style={{
                color: "#e0e0e0",
                fontSize: 14,
                marginBottom: 18,
                textAlign: "center",
              }}
            >
              Login as an admin to manage students and attendance records.
            </p>
            <button
              onClick={() => navigate("/adminlogin")}
              style={{
                padding: "0.7rem 2rem",
                fontSize: "1.1rem",
                borderRadius: "30px",
                border: "none",
                background: "linear-gradient(90deg, #ff512f 0%, #dd2476 100%)",
                color: "#fff",
                fontWeight: "bold",
                boxShadow: "0 4px 16px rgba(221,36,118,0.2)",
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
                minWidth: 140,
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              Admin Login
            </button>
          </div>

        </div>
        
      </div>

      {/* Footer */}
      <footer
        style={{
          width: "100%",
          padding: "1rem 0",
          textAlign: "center",
          color: "#fff",
          background: "rgba(0,0,0,0.08)",
          fontSize: "1rem",
          letterSpacing: "1px",
        }}
      >
        &copy; {new Date().getFullYear()} AttendEase. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
