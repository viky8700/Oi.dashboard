import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function App() {
  const [oiData, setOiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('https://your-backend-url.onrender.com/api/oi');
      const parsed = res.data.records.data
        .filter(d => d.strikePrice && d.CE && d.PE)
        .map(d => ({
          strike: d.strikePrice,
          callOI: d.CE.openInterest,
          putOI: d.PE.openInterest
        }));
      setOiData(parsed);
    };
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Live NIFTY OI Dashboard</h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={oiData}>
          <XAxis dataKey="strike" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="callOI" fill="#8884d8" name="Call OI" />
          <Bar dataKey="putOI" fill="#82ca9d" name="Put OI" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default App;
