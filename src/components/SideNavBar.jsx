"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

const SideNavbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navbarRef = useRef(null); 
  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbarRef]);

  return (
    <div className="fixed top-0 left-0 h-screen bg-gray-800 text-white z-50">
      <button className="p-4 focus:outline-none" onClick={toggleNavbar}>
        <img
          src={isExpanded ? "/more-icon.png" : "/more-icons.png"}
          alt="Toggle"
          className="h-6 w-6"
        />
      </button>

      <div
        ref={navbarRef} 
        className={`transition-all duration-300 ease-in-out ${
          isExpanded ? "w-64" : "w-16"
        } overflow-hidden`}
      >
        <div className="flex flex-col h-full p-4">
          <Link
            href="/"
            className="mb-4 flex items-center hover:bg-gray-700 p-2 rounded"
          >
            {!isExpanded && (
              <img
                src="/home-icon.png"
                className={`h-6 w-6 mr-2 object-contain ${
                  isExpanded ? "" : "mr-0"
                }`}
              />
            )}
            {isExpanded && "Home"}
          </Link>
          <Link
            href="/allplayers"
            className="mb-4 flex items-center hover:bg-gray-700 p-2 rounded"
          >
            {!isExpanded && (
              <img
                src="/player-icon.png"
                className={`h-6 w-6 mr-2 object-contain ${
                  isExpanded ? "" : "mr-0"
                }`}
              />
            )}
            {isExpanded && "View Players"}
          </Link>
          <Link
            href="./selectTeam"
            className="mb-4 flex items-center hover:bg-gray-700 p-2 rounded"
          >
            {!isExpanded && (
              <img
                src="/add-icon.png"
                alt="Services"
                className={`h-6 w-6 mr-2 object-contain ${
                  isExpanded ? "" : "mr-0"
                }`}
              />
            )}
            {isExpanded && "Select Your Team"}
          </Link>
          <a
            href="#"
            className="mb-4 flex items-center hover:bg-gray-700 p-2 rounded"
          >
            {!isExpanded && (
              <img
                src="/team-icon.png"
                className={`h-6 w-6 mr-2 object-contain ${
                  isExpanded ? "" : "mr-0"
                }`}
              />
            )}
            {isExpanded && "Team"}
          </a>
          <a
            href="#"
            className="mb-4 flex items-center hover:bg-gray-700 p-2 rounded"
          >
            {!isExpanded && (
              <img
                src="/budget-icon.png"
                className={`h-6 w-6 mr-2 object-contain ${
                  isExpanded ? "" : "mr-0"
                }`}
              />
            )}
            {isExpanded && "Budget"}
          </a>
          <a
            href="./Leaderboard"
            className="mb-4 flex items-center hover:bg-gray-700 p-2 rounded"
          >
            {!isExpanded && (
              <img
                src="/leaderboard-icon.png"
                className={`h-6 w-6 mr-2 object-contain ${
                  isExpanded ? "" : "mr-0"
                }`}
              />
            )}
            {isExpanded && "Leaderboard"}
          </a>

          <a
            href="#"
            className="mb-4 p-2 rounded mt-30 bg-white font-black flex justify-center items-center text-black"
          >
            {isExpanded ? "Login" : ""}
          </a>
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;