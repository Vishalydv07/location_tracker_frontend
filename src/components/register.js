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
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input name="username" placeholder="Username" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;