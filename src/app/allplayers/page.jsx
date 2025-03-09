"use client";

import Banner from "@/components/Banner";
import PlayerInfoCardUI from "@/components/PlayerInfoCard";

export default function AllPlayers() {
    return (
      <div className="bg-gray-900">
        <Banner/>
        <PlayerInfoCardUI/>
        
      </div>
    );
  }