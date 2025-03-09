"use client";

import React, { useState } from "react";
import Banner from "@/components/Banner";
import PlayerInfoCardUI from "@/components/PlayerInfoCard";

const AllPlayers = () => {
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

  const [allPlayers, setAllPlayers] = useState(players);

  return (
    <div className="bg-gray-900">
      <Banner />
      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1 gap-y-3">
        {allPlayers.map((item, index) => (
          <PlayerInfoCardUI
            key={index}
            id={item.Id} // Pass the `id` prop here
            Name={item.Name}
            Category={item.Category}
            University={item.University}
          />
        ))}
      </div>
    </div>
  );
};

export default AllPlayers;
