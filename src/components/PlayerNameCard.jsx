"use client";

import React from "react";

const PlayerNameCard = ({ id, Name, Category, University }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="text-center md:text-left mb-8 md:mb-0  p-20">
          <h1 className="text-5xl font-bold text-white ">{Name}</h1>
          <h2 className="text-3xl text-white"> {Category}</h2>

          <hr className="my-4 border-t border-white" />
          <p className="mt-4 text-lg leading-relaxed text-white">
            {University}
          </p>
        </div>
        <div className="w-full md:w-1/2 p-15">
          <img
            src="/cricketera.png"
            alt="cricketer"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerNameCard;
