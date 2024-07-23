import React, { useState, useEffect } from "react";
import axios from "axios";
import './FacultyMember.css'
const FacultyMemberInterface = () => {
  const [students, setStudents] = useState([]);
  const [officeHours, setOfficeHours] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    axios.get('/api/class-list')
      .then(response => {
        if (response.data) {
          setStudents(response.data);
        } else {
          console.error('No data returned from API');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!officeHours || !contactEmail || !phoneNumber) {
      alert('Please fill in all fields');
      return;
    }
    axios.post('/api/update-profile', {
      office_hours: officeHours,
      contact_email: contactEmail,
      phone_number: phoneNumber
    })
      .then(response => {
        if (response.data && response.data.success) {
          alert('Profile updated successfully!');
        } else {
          alert('Failed to update profile');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="faculty-member-interface">
      <h2>Manage Class List</h2>
      {students.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Photo</th>
              <th>Contact Information</th>
            </tr>
          </thead>
          <tbody>
            {/* {students.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td><img src={student.photo} alt={student.name} /></td>
                <td>{student.contactInfo}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      ) : (
        <p>No students found</p>
      )}

      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Office Hours:
          <input type="text" value={officeHours} onChange={(event) => setOfficeHours(event.target.value)} />
        </label>
        <br />
        <label>
          Contact Email:
          <input type="email" value={contactEmail} onChange={(event) => setContactEmail(event.target.value)} />
        </label>
        <br />
        <label>
          Phone Number:
          <input type="tel" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} />
        </label>
        <br />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default FacultyMemberInterface;