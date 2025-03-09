// app/team/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import io from "socket.io-client";

const TeamPage = () => {
    const [team, setTeam] = useState([]);
    const [totalPoints, setTotalPoints] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const socket = io();

    useEffect(() => {
        const fetchTeam = async () => {
            setIsLoading(true);
            try {
                const res = await fetch("/api/team");
                if (!res.ok) {
                    router.push("/auth/login");
                    return;
                }
                const data = await res.json();
                setTeam(data.team);
                setTotalPoints(data.totalPoints);
            } catch (error) {
                console.error("Error fetching team:", error);
                toast.error("Failed to load your team");
            } finally {
                setIsLoading(false);
            }
        };

        fetchTeam();

        // Socket.io setup
        socket.on("connect", () => {
            console.log("Socket connected");
        });

        socket.on("teamUpdate", () => {
            fetchTeam();
        });

        return () => {
            socket.off("teamUpdate");
            socket.disconnect();
        };
    }, [router]);

    const removePlayer = async (playerId) => {
        try {
            const res = await fetch("/api/team", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ playerId }),
            });

            if (!res.ok) {
                throw new Error("Failed to remove player");
            }

            toast.success("Player removed successfully");
        } catch (error) {
            console.error("Error removing player:", error);
            toast.error(error.message);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 px-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Team ({team.length}/11)</h1>

            {isLoading ? (
                <div className="animate-pulse space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="bg-gray-200 rounded-lg h-10"></div>
                    ))}
                </div>
            ) : (
                <div className="space-y-4">
                    {team.map((player) => (
                        <div key={player._id} className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                <div>
                                    <p className="font-medium text-gray-800">{player.name}</p>
                                    <p className="text-sm text-gray-500">Rs. {player.value.toLocaleString()}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => removePlayer(player._id)}
                                className="btn-danger text-sm"
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    {team.length === 11 && (
                        <div className="p-4 bg-white rounded-lg shadow-sm">
                            <p className="text-xl font-bold">Total Points: {totalPoints.toFixed(2)}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TeamPage;