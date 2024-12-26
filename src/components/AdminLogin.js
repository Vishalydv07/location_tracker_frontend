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
    <form onSubmit={handleSubmit}>
      <h2>Admin Login</h2>
      <input name="username" placeholder="Username" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Login as Admin</button>
    </form>
  );
}

export default AdminLogin;