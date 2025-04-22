import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Link to navigate

const DashboardPage = () => {
  const [salesToday, setSalesToday] = useState(8250);
  const [salesHistory, setSalesHistory] = useState([]);

  const submitSales = () => {
    const timestamp = new Date();
    const formattedDate = timestamp.toLocaleDateString();
    const formattedTime = timestamp.toLocaleTimeString();
    setSalesHistory(prev => [...prev, { amount: salesToday, date: formattedDate, time: formattedTime }]);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Your other dashboard code here */}
      <Link to="/history">
        <button>Go to Sales History</button>
      </Link>
    </div>
  );
};

export default DashboardPage;
