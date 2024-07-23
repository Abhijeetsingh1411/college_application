import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageRecords.css'

function ManageRecords() {
  const [students, setStudents] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', email: '' });
  const [newFaculty, setNewFaculty] = useState({ name: '', department: '' });

  useEffect(() => {
    axios.get('/api/students')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    axios.get('/api/faculties')
      .then(response => {
        setFaculties(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleAddStudent = () => {
    axios.post('/api/students', newStudent)
      .then(response => {
        setStudents([...students, response.data]);
        setNewStudent({ name: '', email: '' });
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleAddFaculty = () => {
    axios.post('/api/faculties', newFaculty)
      .then(response => {
        setFaculties([...faculties, response.data]);
        setNewFaculty({ name: '', department: '' });
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleUpdateStudent = (id, updates) => {
    axios.put(`/api/students/${id}`, updates)
      .then(response => {
        setStudents(students.map(student => student.id === id ? response.data : student));
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleUpdateFaculty = (id, updates) => {
    axios.put(`/api/faculties/${id}`, updates)
      .then(response => {
        setFaculties(faculties.map(faculty => faculty.id === id ? response.data : faculty));
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleDeleteStudent = (id) => {
    axios.delete(`/api/students/${id}`)
      .then(response => {
        setStudents(students.filter(student => student.id !== id));
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleDeleteFaculty = (id) => {
    axios.delete(`/api/faculties/${id}`)
      .then(response => {
        setFaculties(faculties.filter(faculty => faculty.id !== id));
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className='record'>
      <h1>Manage Student and Faculty Records</h1>
      <form>
        <label>
          Add Student:
          <input type="text" value={newStudent.name} onChange={e => setNewStudent({ ...newStudent, name: e.target.value })} />
          <input type="email" value={newStudent.email} onChange={e => setNewStudent({ ...newStudent, email: e.target.value })} />
          <button type="button" onClick={handleAddStudent}>Add</button>
        </label>
      </form>
      <ul>
        {/* {students.map(student => (
          <li key={student.id}>
            {student.name} ({student.email})
            <button type="button" onClick={() => handleUpdateStudent(student.id, { name: 'Updated Name' })}>Update</button>
            <button type="button" onClick={() => handleDeleteStudent(student.id)}>Delete</button>
          </li>
        ))} */}
      </ul>
      <form>
        <label>
          Add Faculty:
          <input type="text" value={newFaculty.name} onChange={e => setNewFaculty({ ...newFaculty, name: e.target.value })} />
          <input type="text" value={newFaculty.department} onChange={e => setNewFaculty({ ...newFaculty, department: e.target.value })} />
          <button type="button" onClick={handleAddFaculty}>Add</button>
        </label>
      </form>
      <ul>
        {/* {faculties.map(faculty => (
          <li key={faculty.id}>
            {faculty.name} ({faculty.department})
            <button type="button" onClick={() => handleUpdateFaculty(faculty.id, { name: 'Updated Name' })}>Update</button>
            <button type="button" onClick={() => handleDeleteFaculty(faculty.id)}>Delete</button>
          </li>
        ))} */}
      </ul>
    </div>
  );
}

export default ManageRecords;