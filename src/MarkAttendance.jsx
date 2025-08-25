/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { BACK } from "./Util";
import { useEffect } from "react";

const MarkAttendance = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [mk, setmk] = useState([]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [f, setf] = useState("")
  const [s, sets] = useState("")
  const [loce, setloc] = useState("")
  const token = localStorage.getItem("authToken");
  const id = localStorage.getItem("profile-id");

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const dt = localStorage.getItem("unicdates");
    if (dt) {
      setmk(dt);
    }
  }, [mk]);

  useEffect(() => {
   const fetchlocation=async()=>{
     const leti = localStorage.getItem("leti")
     const long = localStorage.getItem("longi")
     setf(leti)
     sets(long)
     try {
      let apiUrl=`https://api.opencagedata.com/geocode/v1/json?key=9aa4291f91cf40b7bc10db15fbd01863&q=${leti}%2C+${long}&pretty=1&no_annotations=1`
      const res= await fetch(apiUrl)
      const data=await res.json()
      
      const {road,city,postcode}= data.results[0].components
      const loc=  `${road}, ${postcode}, ${city}`;
       setloc(loc)
      // setloc(data.results[0].formatted);
     } catch (error) {
      console.log("error",error);
     }
   }
     fetchlocation()
    })

    console.log(loce);
    // console.log(lati);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      setIsSubmitting(true);

    const lati = "Rana Pratap Marg, 226001, Lucknow";
    try {
     
      if (loce != lati) {
        toast.error("Enable current location When Login")
        setIsSubmitting(false)
        return
      }
      if (!token) {
        toast.error("User Not logged in");
        setTimeout(() => navigate("/"), 1500);
        return;
      }


      if (mk.includes(today)) {
        toast.error("Attendance already marked");
        setIsSubmitting(false);
        return;
      } else {
        console.log("making atten error");
      }
      const res = await axios.post(`${BACK}/user/mark`, {
        student: id,
        date: today,
        status: status,
      }, {

        headers: {
          "Content-Type": "application/json"
        }
      });

      // console.log("response", res);
      if (res.data && (res.data.message || res.status === 200 || res.status === 201)) {
        toast.success("Attendance marked successfully");
        localStorage.removeItem("authToken")
        setDate("");
        setStatus("");

        setTimeout(() => {
          navigate("/userattendance");
        }, 1000);
        return
      }

      else {
        setError("Attendance not marked. Please try again.");
      }
    } catch (err) {
      console.error("Attendance marking error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Error marking attendance. Please try again.");
    } finally {
      setIsSubmitting(false);
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
          padding: "2.5rem 2rem",
          minWidth: 280,
          maxWidth: "90%",
          width: "100%",
          backdropFilter: "blur(8px)",
          border: "1.5px solid rgba(255,255,255,0.18)",
          display: "flex",
          flexDirection: "column",
          gap: "1.2rem",
        }}
      >
        <h1 style={{ color: "#fff", textAlign: "center", marginBottom: 8, fontSize: "1.5rem" }}>
          Mark Attendance
        </h1>

        <input
          type="password"
          readOnly
          placeholder="Student ID"
          value={token ? id : "NO ID PROVIDE"}
          style={{
            padding: "0.8rem 1rem",
            borderRadius: 8,
            border: "none",
            fontSize: "1rem",
            marginBottom: 4,
            backgroundColor: "rgba(255,255,255,0.8)",
          }}
        />

        <div style={{ position: "relative" }}>
          <input
            type="date"
            value={today}
            onChange={(e) => setDate(e.target.value)}
            required
            style={{
              padding: "0.8rem 1rem",
              borderRadius: 8,
              border: "none",
              fontSize: "1rem",
              width: "100%",
              boxSizing: "border-box",
              backgroundColor: "rgba(255,255,255,0.8)",
              WebkitAppearance: "none", // For better mobile styling
            }}
            max={new Date().toISOString().split("T")[0]} // Restrict to today or past dates
          />
        </div>

        <select

          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
          style={{
            padding: "0.8rem 1rem",
            borderRadius: 8,
            border: "none",
            fontSize: "1rem",
            backgroundColor: "rgba(255,255,255,0.8)",
            WebkitAppearance: "none", // For better mobile styling
          }}
        >
          <option value="">Select Status</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Late">Late</option>
        </select>

        <button
          // onClick={handlelocation}
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: "0.9rem 0",
            borderRadius: 8,
            border: "none",
            background: isSubmitting
              ? "linear-gradient(90deg, #cccccc 0%, #999999 100%)"
              : "linear-gradient(90deg, #43cea2 0%, #185a9d 100%)",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1.1rem",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            marginTop: 8,
            boxShadow: "0 4px 16px rgba(67,206,162,0.2)",
            transition: "all 0.2s",
          }}

        >
          {isSubmitting ? "Processing..." : "Mark Attendance"}
        </button>
       <p className="text-end text-gray-600 ">
         <Link
           to="/"
           className="text-gray-300 font-semibold hover:underline"
         >
           Home
         </Link>
       </p>
        {error && (
          <div style={{
            color: "#ff512f",
            textAlign: "center",
            padding: "0.5rem",
            backgroundColor: "rgba(255,255,255,0.2)",
            borderRadius: 8,
          }}>
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default MarkAttendance;