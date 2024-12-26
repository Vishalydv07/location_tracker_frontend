import React, { useState } from 'react';
import Register from './components/register';
import Login from './components/login';
import AdminLogin from './components/AdminLogin';
import LocationTracker from './components/loactionTracker';
import AdminPanel from './components/AdminPanel';
import './App.css';

function App() {
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');

  if (!token) {
    return (
      <div className="App">
        <h1>User Interface</h1>
        <Register />
        <Login setToken={setToken} setRole={setRole} />

        <h1>Admin Interface</h1>
        <AdminLogin setToken={setToken} setRole={setRole} />
      </div>
    );
  }

  if (role === 'admin') {
    return <AdminPanel token={token} />;
  } else {
    return <LocationTracker token={token} />;
  }
}

export default App;
