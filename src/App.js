import React, { useState } from 'react';
import './App.css';

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const lat1Rad = toRadians(lat1);
  const lat2Rad = toRadians(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function App() {
  const [pointA, setPointA] = useState({ lat: '', lon: '' });
  const [pointB, setPointB] = useState({ lat: '', lon: '' });
  const [distance, setDistance] = useState(null);

  function handleCalculate() {
    const { lat: lat1, lon: lon1 } = pointA;
    const { lat: lat2, lon: lon2 } = pointB;
    setDistance(getDistance(lat1, lon1, lat2, lon2));
  }

  return (
    <div className="container">
      <h1>Air Distance Calculator</h1>
      <div className="input-container">
        <div>
          <h3>Point A</h3>
          <label>
            Latitude:
            <input
              value={pointA.lat}
              onChange={e => setPointA({ ...pointA, lat: e.target.value })}
            />
          </label>
          <br />
          <label>
            Longitude:
            <input
              value={pointA.lon}
              onChange={e => setPointA({ ...pointA, lon: e.target.value })}
            />
          </label>
        </div>
        <div>
          <h3>Point B</h3>
          <label>
            Latitude:
            <input
              value={pointB.lat}
              onChange={e => setPointB({ ...pointB, lat: e.target.value })}
            />
          </label>
          <br />
          <label>
            Longitude:
            <input
              value={pointB.lon}
              onChange={e => setPointB({ ...pointB, lon: e.target.value })}
            />
          </label>
        </div>
      </div>
      <div className="button-container">
        <button onClick={handleCalculate}>Calculate</button>
      </div>

      {distance && <p className="result">Distance: {distance.toFixed(2)}km</p>}
    </div>
  );
}

export default App;
