import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({ username: '', password: '', latitude: '', longitude: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        await axios.post('https://backend-omega-seven-39.vercel.app/api/users/register', {
          ...form,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        alert('Registration successful');
      } catch (error) {
        alert(error.response.data.error);
      }
    });
  };

  return (
    // <div className="auth-container">
    <div >
      <h2>Register</h2>
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
        <button type="submit" className="auth-button">Register</button>
      </form>
    </div>
  );
};

export default Register;