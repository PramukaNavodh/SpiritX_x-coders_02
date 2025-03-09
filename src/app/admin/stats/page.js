"use client";

import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import io from "socket.io-client";

export default function AdminStats() {
    const [players, setPlayers] = useState([]);
    const router = useRouter();
    const socket = io("http://localhost:3001");

    useEffect(() => {
        const fetchStats = async () => {
            const res = await fetch("/api/admin/stats");
            if (!res.ok) router.push("/login");
            else setPlayers(await res.json());
        };
        fetchStats();

        socket.on("playerUpdate", () => fetchStats());
        return () => socket.disconnect();
    }, [router]);

    return (
        <div className="max-w-4xl mx-auto mt-10 p-4">
            <h1 className="text-2xl font-bold mb-4">Admin - Player Stats</h1>
            <ul className="space-y-4">
                {players.map(player => (
                    <li key={player._id} className="p-4 bg-white rounded shadow">
                        <p>Name: {player.name}</p>
                        <p>University: {player.university}</p>
                        <p>Runs: {player.totalRuns}</p>
                        <p>Balls Faced: {player.ballsFaced}</p>
                        <p>Innings Played: {player.inningsPlayed}</p>
                        <p>Wickets: {player.wickets}</p>
                        <p>Overs Bowled: {player.oversBowled}</p>
                        <p>Runs Conceded: {player.runsConceded}</p>
                        <p>Value: Rs. {player.value.toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}