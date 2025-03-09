import React from 'react';

const LeaderboardCard = ({ performer }) => {
  return (
    <div className="mt-15 bg-gray-700 p-6 rounded-lg text-center">
      <p className="mt-2 text-white text-xl">{performer.designation}</p>
      <h2 className="text-2xl font-semibold text-white">{performer.name}</h2>
      <p className="text-white font-bold text-3xl mt-2">{performer.points}</p>
    </div>
  );
};

const LeaderboardRow = ({ data }) => {
  return ( 
    <tr className="mt-18 border-b border-gray-700">
      <td className="text-gray-400 text-center">{data.designation}</td> {/* Added text-center */}
      <td className="text-white text-center">{data.name}</td> {/* Added text-center */}
      <td className="py-3 px-4 text-white text-center">{data.points}</td> {/* Added text-center */}
    </tr>
  );
};

const Leaderboard = () => {
  const topPerformers = [
    { name: 'Pramuka Navodh', designation: 'Place : 1', points: '9999' },
    { name: 'Yethum Danith', designation: 'Place : 2', points: '8765' },
    { name: 'Kaveesha Sulakshana', designation: 'Place : 3', points: '7864' },
  ];

  const leaderboardData = [
    { designation: '04', name: 'Shyane Watson', points: '6500' },
    { designation: '05', name: 'Chris Gayle', points: '5000' },
    { designation: '06', name: 'T M Dilshan', points: '4999' },
    { designation: '07', name: 'Sanath Jayasuriya', points: '2943' },
  ];

  return (
    <div className="bg-gray-900 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-8">TEAM LEADERBOARD</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {topPerformers.map((performer, index) => (
            <LeaderboardCard key={index} performer={performer} />
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 rounded-lg shadow-md">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-center py-3 px-4 text-white">Place</th>
                <th className="center py-3 px-4 text-white">Name</th>
                <th className="center py-3 px-4 text-white">Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((data, index) => (
                <LeaderboardRow key={index} data={data} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;