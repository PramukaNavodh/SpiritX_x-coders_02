"use client";

import React,{useReducer} from 'react';
import PlayerNameCard from '@/components/PlayerNameCard'; 
import CricketStats from '@/components/StatCard';
import SideNavbar from '@/components/SideNavBar';



export default function Playerview() {
  return (
    <div>
        <SideNavbar/>
        <PlayerNameCard/>
        <CricketStats/>
    </div>
  );
}