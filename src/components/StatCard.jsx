import React from 'react';

const CricketStats = () => {
  const stats = [
    { label: 'Total Runs', value: '530' },
    { label: 'Balls Faced', value: '588' },
    { label: 'Innings Faced', value: '10' },
    { label: 'Wickets', value: '0' },
    { label: 'Overs Bowled', value: '3' },
    { label: 'Runs conceded', value: '21' },

  ];

  return (
    <div className="flex flex-wrap justify-center p-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="m-2 p-4 border rounded shadow-md w-40 text-center bg-white"
        >
          <div className="text-2xl text-purple-600 font-semibold">{stat.value}</div>
          <div className="text-sm text-black font-bold">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default CricketStats;