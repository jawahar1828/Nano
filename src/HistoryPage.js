import React from 'react';

const HistoryPage = ({ salesHistory }) => {
  return (
    <div>
      <h1>Sales History</h1>
      <ul>
        {salesHistory.map((sale, i) => (
          <li key={i}>₹{sale.amount} on {sale.date} at {sale.time}</li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryPage;
