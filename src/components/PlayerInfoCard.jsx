"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PlayerInfoCard = ({
  name,
  university,
  price,
  playerType,
  avatarSrc,
  onViewMore,
}) => {
    const router = useRouter(); 

    const handleViewMore = () => {
        router.push("/playerview"); 
    };
  return (
    <div className="mt-10 ml-10 w-70 h-75 bg-white px-4 py-4 rounded-lg shadow-md flex flex-col items-center">
      
      <div className="mb-4">
        <Image
          src={"/cricketeravat.png"}
          alt={`${name} Avatar`}
          width={100} 
          height={100}
          className="rounded-full"
        />
      </div>
      <div className="text-xl font-semibold mb-2">Kaveesha Sulakshana</div>

      <div className="text-gray-600 mb-2 font-bold">Batsman</div>
      <div className="text-sm mb-4">The Open University</div>

      <button
        onClick={handleViewMore}
        className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
      >
        View Info.
      </button>
    </div>
  );
};

export default PlayerInfoCard;