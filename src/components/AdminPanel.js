import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPanel.css';


function AdminPanel({ token }) {
  const [users, setUsers] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios
      .get('https://backend-omega-seven-39.vercel.app/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get('https://backend-omega-seven-39.vercel.app/api/admin/locations', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setLocations(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  return (
    <div>
      <h2>Registered Users</h2>
      <table border="1">
        <thead>
          <tr>
            <th>UserID</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.username}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>User Locations</h2>
      <table border="1">
        <thead>
          <tr>
            <th>UserID</th>
            <th>Username</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => (
            <tr key={location._id}>
              <td>{location.userId}</td>
              <td>{location.username}</td>
              <td>{location.latitude}</td>
              <td>{location.longitude}</td>
              <td>{new Date(location.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;