// "use client";
//
// import React, { useEffect, useState } from "react";
// import PlayerCard from "../components/PlayerCard";
// import Title from "../../components/Title";
//
// const selectTeam = () => {
//   const player = [
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
//   const [showFilter, setShowFilter] = useState(false);
//   const [category, setCategory] = useState([]);
//   //   const [player, setPlayer] = useState([]);
//
//   //   useEffect(() => {
//   //     setPlayer();
//   //   });
//
//   const toggleCategory = (e) => {
//     if (category.includes(e.target.value)) {
//       setCategory((prev) => prev.filter((item) => item !== e.target.value));
//     } else {
//       setCategory((prev) => [...prev, e.target.value]);
//     }
//   };
//
//   return (
//     <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
//       {/* Left side- filter */}
//       <div className="min-w-60">
//         <p
//           onClick={() => setShowFilter(!showFilter)}
//           className="my-2 text-xl flex cursor-pointer items-center gap-2"
//         >
//           SELECT YOUR TEAM
//           <img
//             className={`h-3 sm:hidden ${showFilter ? "rotate-90" : " "}`}
//             src={"./dropdown_icon.png"}
//             alt=""
//           />
//         </p>
//         <div
//           className={`border border-gray-300 pl-5 py-3 mt-6 ${
//             showFilter ? "" : "hidden"
//           } sm:block`}
//         >
//           <p className="mb-3 text-base font-medium">ROLES</p>
//
//           <div className="flex flex-col gap-2 text-sm font-medium text-black">
//             <p className="flex gap-2">
//               <input
//                 className="w-3"
//                 type="checkbox"
//                 value={"Batsman"}
//                 onChange={toggleCategory}
//               />
//               Batsman
//             </p>
//             <p className="flex gap-2">
//               <input
//                 className="w-3"
//                 type="checkbox"
//                 value={"Bowler"}
//                 onChange={toggleCategory}
//               />
//               Bowlers
//             </p>
//             <p className="flex gap-2">
//               <input
//                 className="w-3"
//                 type="checkbox"
//                 value={"AllRounder"}
//                 onChange={toggleCategory}
//               />
//               All Rounder
//             </p>
//           </div>
//         </div>
//       </div>
//       <div className="flex-1">
//         <div className="flex justify-between text-base sm:text-2xl mb-4 ">
//         <Title text2={"PLAYERS"} />
//         </div>
//         {/* Map Product */}
//         <div className="cursor-pointer">
//           {player.map((item, index) => (
//             <PlayerCard
//               key={index}
//               name={item.Name}
//               university={item.University}
//               price={item.Wickets}
//             />
//           ))}
//         </div>
//       </div>
//
//       <div className="flex-1">
//         <div className="flex justify-between text-base sm:text-2xl mb-4 ">
//           <Title text1={"YOUR"} text2={"TEAM"}/>
//         </div>
//         {/* Map Product */}
//         <div className="">
//           {player.map((item, index) => (
//             <div key={index}>
//               <p> {item.Name}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default selectTeam;

// app/select-team/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import io from "socket.io-client";

const SelectTeamPage = () => {
  const [players, setPlayers] = useState([]);
  const [team, setTeam] = useState([]);
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const socket = io("http://localhost:3001");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch team data
        const teamRes = await fetch("/api/team");
        if (!teamRes.ok) {
          router.push("/login");
          return;
        }
        const teamData = await teamRes.json();
        setTeam(teamData.team);

        // Fetch players data
        const playersRes = await fetch("/api/players");
        setPlayers(await playersRes.json());
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Socket.io setup
    socket.on("connect", () => {
      console.log("Socket connected");
    });

    socket.on("teamUpdate", () => {
      fetchData();
    });

    return () => {
      socket.off("teamUpdate");
      socket.disconnect();
    };
  }, [router]);

  const addPlayer = async (player) => {
    if (team.some((p) => p._id === player._id)) {
      toast.error("Player already in your team!");
      return;
    }

    if (team.length >= 11) {
      toast.error("Your team is already full!");
      return;
    }

    try {
      const res = await fetch("/api/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerId: player._id }),
      });

      if (!res.ok) {
        throw new Error("Failed to add player");
      }

      toast.success("Player added to your team");
    } catch (error) {
      console.error("Error adding player:", error);
      toast.error(error.message);
    }
  };

  const filteredPlayers = category
      ? players.filter((p) => p.category === category)
      : players;

  return (
      <div className="max-w-4xl mx-auto mt-10 px-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Select Your Team ({team.length}/11)
        </h1>

        <div className="mb-6">
          <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full max-w-lg p-2 border-gray-300 rounded-lg shadow-sm"
          >
            <option value="">All Categories</option>
            <option value="Batsman">Batsman</option>
            <option value="All-Rounder">All-Rounder</option>
            <option value="Bowler">Bowler</option>
          </select>
        </div>

        {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
              {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white p-4 rounded-lg shadow h-32"></div>
              ))}
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredPlayers.map((player) => (
                  <div
                      key={player._id}
                      className="bg-white p-4 rounded-lg shadow transition-transform hover:transform hover:scale-105"
                  >
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
                      <span className="font-medium">{player.name}</span>
                    </div>
                    <p className="text-sm text-gray-600">{player.university}</p>
                    <p className="mt-2 font-semibold">Rs. {player.value.toLocaleString()}</p>
                    <button
                        onClick={() => addPlayer(player)}
                        className={`btn-primary mt-3 w-full ${
                            team.length >= 11 ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={team.length >= 11}
                    >
                      Add to Team
                    </button>
                  </div>
              ))}
            </div>
        )}
      </div>
  );
};

export default SelectTeamPage;