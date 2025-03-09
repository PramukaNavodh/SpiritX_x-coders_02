"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Playerview = () => {
  const router = useRouter();
  const { id } = router.query; 

  const players = [
    {
      Id: 1,
      Name: "Chamika Chandimal",
      University: "University of the Visual & Performing Arts",
      Category: "Batsman",
      TotalRuns: 530,
      BallsFaced: 588,
      InningsPlayed: 10,
      Wickets: 0,
      OversBowled: 3,
      RunsConceded: 21,
    },
    {
      Id: 2,
      Name: "Dimuth Dhananjaya",
      University: "University of the Visual & Performing Arts",
      Category: "All-Rounder",
      TotalRuns: 250,
      BallsFaced: 208,
      InningsPlayed: 10,
      Wickets: 8,
      OversBowled: 40,
      RunsConceded: 240,
    },
    {
      Id: 3,
      Name: "Avishka Mendis",
      University: "Eastern University",
      Category: "All-Rounder",
      TotalRuns: 210,
      BallsFaced: 175,
      InningsPlayed: 7,
      Wickets: 7,
      OversBowled: 35,
      RunsConceded: 210,
    },
    {
      Id: 4,
      Name: "Danushka Kumara",
      University: "University of the Visual & Performing Arts",
      Category: "Batsman",
      TotalRuns: 780,
      BallsFaced: 866,
      InningsPlayed: 15,
      Wickets: 0,
      OversBowled: 5,
      RunsConceded: 35,
    },
    {
      Id: 5,
      Name: "Chaturanga Gunathilaka",
      University: "University of Moratuwa",
      Category: "Bowler",
      TotalRuns: 132,
      BallsFaced: 264,
      InningsPlayed: 11,
      Wickets: 29,
      OversBowled: 88,
      RunsConceded: 528,
    },
  ];


  const [playerData, setPlayerData] = useState(null);

  useEffect(() => {
    if (id) {
      const playerId = parseInt(id, 10);
      const foundPlayer = players.find((player) => player.Id === playerId);
      setPlayerData(foundPlayer);
    }
  }, [id]);

  if (!playerData) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{playerData.Name}</h1>
      <div className="text-gray-600 mb-2">{playerData.University}</div>
      <div className="text-gray-600 mb-2">{playerData.Category}</div>
      <div className="text-gray-600 mb-2">
        Total Runs: {playerData.TotalRuns}
      </div>
      <div className="text-gray-600 mb-2">Wickets: {playerData.Wickets}</div>
    </div>
  );
};

export default Playerview;

// "use client";

// import React, { useReducer } from "react";
// import PlayerNameCard from "@/components/PlayerNameCard";
// import CricketStats from "@/components/StatCard";
// import SideNavbar from "@/components/SideNavBar";

// const Playerview = () => {
//   const players = [
//     {
//       Name: "Chamika Chandimal",
//       University: "University of the Visual & Performing Arts",
//       Category: "Batsman",
//       TotalRuns: 530,
//       BallsFaced: 588,
//       InningsPlayed: 10,
//       Wickets: 0,
//       OversBowled: 3,
//       RunsConceded: 21,
//     },
//     {
//       Name: "Dimuth Dhananjaya",
//       University: "University of the Visual & Performing Arts",
//       Category: "All-Rounder",
//       TotalRuns: 250,
//       BallsFaced: 208,
//       InningsPlayed: 10,
//       Wickets: 8,
//       OversBowled: 40,
//       RunsConceded: 240,
//     },
//     {
//       Name: "Avishka Mendis",
//       University: "Eastern University",
//       Category: "All-Rounder",
//       TotalRuns: 210,
//       BallsFaced: 175,
//       InningsPlayed: 7,
//       Wickets: 7,
//       OversBowled: 35,
//       RunsConceded: 210,
//     },
//     {
//       Name: "Danushka Kumara",
//       University: "University of the Visual & Performing Arts",
//       Category: "Batsman",
//       TotalRuns: 780,
//       BallsFaced: 866,
//       InningsPlayed: 15,
//       Wickets: 0,
//       OversBowled: 5,
//       RunsConceded: 35,
//     },
//     {
//       Name: "Chaturanga Gunathilaka",
//       University: "University of Moratuwa",
//       Category: "Bowler",
//       TotalRuns: 132,
//       BallsFaced: 264,
//       InningsPlayed: 11,
//       Wickets: 29,
//       OversBowled: 88,
//       RunsConceded: 528,
//     },
//   ];

//   const { playerName } = useParams();
//   const [productData, setProductData] = useState(false);
//   const fetchAllPlayers = async () => {
//     players.map((item) => {
//       if (item.Name === playerName) {
//         setProductData(item);
//         return null;
//       }
//     });
//   };

//   useEffect(() => {
//     fetchProductData();
//   }, [playerName, players]);

//   return productData ? (
//     <div>
//       {/* <SideNavbar /> */}
//       {productData.map((item, index) => {
//         <div>{productData.Name}</div>;
//         <div>{productData.University}</div>;
//         <div>{productData.Wickets}</div>;
//         <div>{productData.Category}</div>;
//       })}
//       {/* <PlayerNameCard /> */}
//       {/* <CricketStats /> */}
//     </div>
//   ) : (
//     <div className="opacity-0"></div>
//   );
// };

// export default Playerview;
