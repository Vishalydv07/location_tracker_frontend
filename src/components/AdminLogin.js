import React, { useState } from 'react';
import axios from 'axios';

function AdminLogin({ setToken, setRole }) {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://backend-omega-seven-39.vercel.app/api/users/login', form);
      if (res.data.role === 'admin') {
        setToken(res.data.token);
        setRole(res.data.role);
      } else {
        alert('Access denied');
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div >
    <h2>Admin Login</h2>
    <form onSubmit={handleSubmit} className="auth-form">
      <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
        required
        className="auth-input"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
        className="auth-input"
      />
      <button type="submit" className="auth-button">Login</button>
    </form>
  </div>
  );
}

export default AdminLogin;