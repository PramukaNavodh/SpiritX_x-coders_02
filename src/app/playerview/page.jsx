"use client";

import React from 'react';
import PlayerNameCard from '@/components/PlayerNameCard'; 
import CricketStats from '@/components/StatCard';
import SideNavbar from '@/components/SideNavBar';


export default function playerview() {
  return (
    <div>
        <SideNavbar/>
        <PlayerNameCard/>
        <CricketStats/>
    </div>
  );
}