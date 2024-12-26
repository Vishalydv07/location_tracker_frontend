import React, { useState } from 'react';
import axios from 'axios';

function Login({ setToken, setRole }) {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const res = await axios.post('http://localhost:5000/api/users/login', {
          ...form,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setToken(res.data.token);
        setRole(res.data.role);
      } catch (error) {
        alert(error.response.data.error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input name="username" placeholder="Username" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;