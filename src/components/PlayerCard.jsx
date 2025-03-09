import React from "react";

const PlayerCard = ({ name, university, price }) => {
  return (
    <div className=" w-full h-20 bg-radial-[at_50%_75%] from-purple-300 to-white px-2 py-4 justify-between flex flex-row  rounded-lg my-1 text-center">
      <div className="text-black text-md font-bold flex-1 px-2">{name}</div>
      <div className="text-black text-md flex-1 px-2">{university}</div>
      <div className="text-black text-base flex-1 px-2">Rs.{price}</div>
    </div>
  );
};

export default PlayerCard;
