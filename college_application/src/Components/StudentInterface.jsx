import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentInterface.css';

const StudentInterface = () => {
let courses=[
    {name:'java',
        id:101,
        grade:'a'
    }
]


  const [profile, setProfile] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [advisors, setAdvisors] = useState([]);

  useEffect(() => {
    axios.get('/api/student/profile')
      .then(response => {
        setProfile(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios.get('/api/student/advisors')
      .then(response => {
        setAdvisors(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    axios.get('/api/student/search', {
      params: {
        query: e.target.value
      }
    })
      .then(response => {
        setSearchResults(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="student-interface">
      <h1 className="header">Student Interface</h1>
      <section className="profile-section">
        <h2 className="subsection-header">View Personal Profile</h2>
        <div className="profile-container">
          <img src={profile.photo} alt="Profile Photo" className="profile-photo" />
          <h3 className="profile-name">{profile.name}</h3>
          <p className="profile-contact">Contact Details: {profile.contact}</p>
          <p className="profile-academic">Academic Information:</p>
          <ul className="profile-courses">
            {courses.map(course => (
              <li key={course.id} className="profile-course">
                {course.name} - {course.grade}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="search-section">
        <h2 className="subsection-header">Search for Other Students</h2>
        <input type="search" value={searchQuery} onChange={handleSearch} placeholder="Search by name, department, or year" className="search-input" />
        <ul className="search-results">
          {searchResults.map(student => (
            <li key={student.id} className="search-result">
              {student.name} - {student.department} - {student.year}
            </li>
          ))}
        </ul>
      </section>
      {/* <section className="advisors-section">
        <h2 className="subsection-header">Contact Faculty Advisors</h2>
        <ul className="advisors-list">
          {advisors.map(advisor => (
            <li key={advisor.id} className="advisor">
              {advisor.name} - {advisor.email} - {advisor.phone}
            </li>
          ))}
        </ul>
      </section> */}
    </div>
  );
};

export default StudentInterface;