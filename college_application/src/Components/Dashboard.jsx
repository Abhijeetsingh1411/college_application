import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import './Dashboard.css'

function Dashboard() {
  const [studentEnrollmentData, setStudentEnrollmentData] = useState([]);
  const [facultyCourseLoadData, setFacultyCourseLoadData] = useState([]);

  useEffect(() => {
    axios.get('/api/student-enrollment')
      .then(response => {
        setStudentEnrollmentData(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    // axios.get('/api/faculty-course-load')
    //   .then(response => {
    //     setFacultyCourseLoadData(response.data);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="graph">
        <h2>Student Enrollment Trends</h2>
        <LineChart width={500} height={300} data={studentEnrollmentData}>
          <Line type="monotone" dataKey="enrollment" stroke="#8884d8" />
          <XAxis dataKey="year" />
          <YAxis />
          <CartesianGrid stroke="#ccc" />
          <Tooltip />
        </LineChart>
      </div>
      <div className="graph">
        <h2>Faculty Course Load</h2>
        <LineChart width={500} height={300} data={facultyCourseLoadData}>
          <Line type="monotone" dataKey="courseLoad" stroke="#8884d8" />
          <XAxis dataKey="department" />
          <YAxis />
          <CartesianGrid stroke="#ccc" />
          <Tooltip />
        </LineChart>
      </div>
    </div>
  );
}

export default Dashboard;