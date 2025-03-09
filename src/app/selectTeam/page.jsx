"use client";

import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import PlayerCard from "@/components/PlayerCard";

const SelectTeam = () => {
  const players = [
    {
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

  const [showFilter, setShowFilter] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const toggleCategory = (e) => {
    if (categories.includes(e.target.value)) {
      setCategories((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategories((prev) => [...prev, e.target.value]);
    }
  };

  const filteredPlayers = categories.length
    ? players.filter((p) => categories.includes(p.Category))
    : players;

  const handlePlayerClick = (player) => {
    if (selectedPlayers.some((p) => p.Name === player.Name)) {
      setSelectedPlayers((prev) => prev.filter((p) => p.Name !== player.Name));
    } else {
      setSelectedPlayers((prev) => [...prev, player]);
    }
  };

  return (
    <div>
      <div className="justify-center text-center text-3xl mt-5">
        <Title text1={"SELECT YOUR"} text2={"TEAM"} />
      </div>
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 ">
        <div className="min-w-60">
          <p
            onClick={() => setShowFilter(!showFilter)}
            className="my-2 text-xl flex cursor-pointer items-center gap-2"
          >
            FILTERS{" "}
            <img
              className={`h-3 sm:hidden ${showFilter ? "rotate-90" : " "}`}
              src={"./dropdown_icon.png"}
              alt=""
            />
          </p>
          <div
            className={`border border-gray-300 pl-5 py-3 mt-6 ${
              showFilter ? "" : "hidden"
            } sm:block`}
          >
            <p className="mb-3 text-base font-medium">ROLES</p>

            <div className="flex flex-col gap-2 text-sm font-medium text-black">
              <p className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={"Batsman"}
                  onChange={toggleCategory}
                />
                Batsman
              </p>
              <p className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={"Bowler"}
                  onChange={toggleCategory}
                />
                Bowlers
              </p>
              <p className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={"All-Rounder"}
                  onChange={toggleCategory}
                />
                All Rounder
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex justify-between text-base sm:text-2xl mb-4 ">
            <Title text2={"PLAYERS"} />
          </div>
          <div className="cursor-pointer">
            {filteredPlayers.length > 0 ? (
              filteredPlayers.map((item, index) => (
                <div key={index} onClick={() => handlePlayerClick(item)}>
                  <PlayerCard
                    name={item.Name}
                    university={item.University}
                    price={item.Wickets}
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                No players found for the selected category.
              </p>
            )}
          </div>
        </div>

        <div className="flex-1">
          <div className="flex justify-between text-base sm:text-2xl mb-4 ">
            <Title text1={"YOUR"} text2={"TEAM"} />
          </div>
          <div>
            {selectedPlayers.map((item, index) => (
              <div key={index} className="">
                <p>
                  {index + 1}. {item.Name} - {item.Wickets}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectTeam;
