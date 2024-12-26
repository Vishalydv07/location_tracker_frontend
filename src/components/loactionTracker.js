import React, { useEffect } from 'react';
import axios from 'axios';

const LocationTracker = ({ token }) => {
  useEffect(() => {
    const sendLocation = () => {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          await axios.post(
            'http://localhost:5000/api/locations',
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        } catch (error) {
          console.error(error);
        }
      });
    };

    sendLocation();
    const intervalId = setInterval(sendLocation, 4000);

    return () => clearInterval(intervalId);
  }, [token]);

  return <h2>Tracking your location...</h2>;
};

export default LocationTracker;