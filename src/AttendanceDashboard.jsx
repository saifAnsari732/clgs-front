import { useState } from 'react';

const AttendanceDashboard = () => {
  const [activeTab, setActiveTab] = useState('takeAttendance');
  const [students, setStudents] = useState([
    { id: 1, name: 'Suj Ansu', present: false },
    { id: 2, name: 'Sahil al', present: false },
    { id: 3, name: 'Qmem', present: false },
    { id: 4, name: 'Vishal', present: false },
    { id: 5, name: 'Sikondor', present: false },
    { id: 40, name: 'Wali', present: false },
  ]);

  const toggleAttendance = (id) => {
    setStudents(students.map(student => 
      student.id === id ? { ...student, present: !student.present } : student
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 p-6">
          <h1 className="text-3xl font-bold text-white">CODE4YOU</h1>
          <p className="text-indigo-200">Student Attendance System</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('takeAttendance')}
            className={`flex-1 py-4 px-6 text-center font-medium ${activeTab === 'takeAttendance' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Take Attendance
          </button>
          <button
            onClick={() => setActiveTab('remote')}
            className={`flex-1 py-4 px-6 text-center font-medium ${activeTab === 'remote' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Remote
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {activeTab === 'takeAttendance' && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Student Attendance</h2>
              
              <div className="mb-6 flex justify-between items-center">
                <div className="relative w-64">
                  <input
                    type="text"
                    placeholder="Search students..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <svg
                    className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition duration-200">
                  Submit Attendance
                </button>
              </div>

              <div className="space-y-3">
                {students.map((student) => (
                  <div
                    key={student.id}
                    className={`flex items-center justify-between p-4 rounded-lg border ${student.present ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-500 w-8">{student.id}.</span>
                      <span className="font-medium">{student.name}</span>
                    </div>
                    <button
                      onClick={() => toggleAttendance(student.id)}
                      className={`px-4 py-1 rounded-full text-sm font-medium ${student.present ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                    >
                      {student.present ? 'Present' : 'Absent'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'remote' && (
            <div className="text-center py-12">
              <div className="inline-block p-6 bg-indigo-50 rounded-full mb-6">
                <svg
                  className="w-12 h-12 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Remote Attendance</h3>
              <p className="text-gray-600 mb-6">Enable remote attendance features here</p>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition duration-200">
                Configure Remote Settings
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceDashboard;