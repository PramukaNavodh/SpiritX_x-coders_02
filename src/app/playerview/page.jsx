"use client";

import React from 'react';
import PlayerNameCard from '@/components/PlayerNameCard'; 
import CricketStats from '@/components/StatCard';

export default function PlayerView() {
  return (
    <div>
        <PlayerNameCard/>
        <CricketStats/>
    </div>
  );
}