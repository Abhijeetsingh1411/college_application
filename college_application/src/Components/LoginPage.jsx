import React, { useState } from 'react';
import './Loginpage.css'

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role }),
      });
      const data = await response.json();
      if (data.success) {

        // redirect to dashboard based on role

      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      setError('Error logging in');
    }
  };

  return (
     <div className="cont">
      <form onSubmit={handleSubmit}>
      <label>Username:</label>
      <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
      <br />
      <label>Password:</label>
      <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      <br />
      <label>Role:</label>
      <select value={role} onChange={(event) => setRole(event.target.value)}>
        <option value="Student">Student</option>
        <option value="Faculty Member">Faculty Member</option>
        <option value="Administrator">Administrator</option>
      </select>
      <br />
      <button type="submit">Log in</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    
    </form>
    </div>
  );
};

export default LoginPage;