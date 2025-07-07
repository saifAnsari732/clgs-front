/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

export default function Dashboard() {
  const initialStudents = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    name: `Student ${i + 1}`,
  }));

  const [students, setStudents] = useState(initialStudents);
  const [attendanceCounts, setAttendanceCounts] = useState(() => {
    const stored = localStorage.getItem("attendanceCounts");
    return stored ? JSON.parse(stored) : {};
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("attendanceCounts", JSON.stringify(attendanceCounts));
  }, [attendanceCounts]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleAttendance = (id) => {
    setAttendanceCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleAbsent = (id) => {
    setAttendanceCounts((prev) => ({
      ...prev,
      [id]: prev[id] > 0 ? prev[id] - 1 : 0,
    }));
  };

  const totalPresent = Object.values(attendanceCounts).reduce((sum, count) => sum + count, 0);

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-[#ffecd2] via-[#fcb69f] to-[#ff9a9e] text-black"} w-full h-screen `}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">CODE4YOU</h1>
        <div className="flex items-center gap-4 mt-4 mr-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-teal-400 hover:bg-gray-700 text-white px-2 py-3 rounded-2xl shadow"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4">
        <div className="bg-gradient-to-r from-green-200 via-green-300 to-green-400 text-green-800 px-6 py-4 rounded-xl shadow text-center">
          <h2 className="text-xl font-bold">Total Present</h2>
          <p className="text-4xl font-bold">{totalPresent}</p>
        </div>
      </div>

      <div className={`${darkMode ? "bg-gray-800  text-white" : "bg-white bg-opacity-60 backdrop-blur-md"} rounded-xl shadow-lg overflow-y-auto `}>
        <table className="w-full  text-sm">
          <thead className={`${darkMode ? "bg-gray-700 text-white" : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"}`}>
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Student Name</th>
              <th className="px-4 py-3 text-center">Attendance Count</th>
              <th className="px-4 py-3 text-center">Present</th>
              <th className="px-4 py-3 text-center">Absent</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => {
              const isPresentClicked = (attendanceCounts[student.id] || 0) > 0;
              return (
                <tr
                  key={student.id}
                  className={index % 2 === 0 ? (darkMode ? "bg-gray-700" : "bg-white/50") : (darkMode ? "bg-gray-600" : "bg-white/30")}
                >
                  <td className="px-2 py-3">{index + 1}</td>
                  <td className="px-2 py-3">{student.name}</td>
                  <td className="px-2 py-3 text-center">
                    {attendanceCounts[student.id] || 0}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white px-4 py-1 rounded-full shadow disabled:opacity-50"
                      onClick={() => handleAttendance(student.id)}
                      disabled={isPresentClicked}
                    >
                      Present
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white px-3 py-1 rounded-full shadow"
                      onClick={() => handleAbsent(student.id)}
                    >
                      Absent
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="p-4 text-sm">
          Showing {students.length} of 40 students
        </div>
      </div>
    </div>
  );
}
