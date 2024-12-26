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
        const res = await axios.post('https://backend-omega-seven-39.vercel.app/api/users/login', {
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
    <div className="auth-container">
      <h2>Login</h2>
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

export default Login;