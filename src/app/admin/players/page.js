"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import io from "socket.io-client";

const AdminPlayersPage = () => {
    const [players, setPlayers] = useState([]);
    const [newPlayer, setNewPlayer] = useState({
        name: "",
        university: "",
        category: "",
        totalRuns: 0,
        ballsFaced: 0,
        inningsPlayed: 0,
        wickets: 0,
        oversBowled: 0,
        runsConceded: 0,
    });
    const router = useRouter();
    const socketRef = useRef(null);
    const [isFormDirty, setIsFormDirty] = useState(false);

    useEffect(() => {
        // Initialize socket connection
        socketRef.current = io("http://localhost:3001");

        const fetchPlayers = async () => {
            try {
                const res = await fetch("/api/admin/players");
                if (!res.ok) {
                    router.push("/auth/login");
                    return;
                }
                setPlayers(await res.json());
            } catch (error) {
                console.error("Error fetching players:", error);
                toast.error("Failed to load players");
            }
        };

        fetchPlayers();

        // Socket.io setup
        socketRef.current.on("connect", () => {
            console.log("Socket connected");
        });

        const handlePlayerUpdate = (update) => {
            if (update.deleted) {
                setPlayers((prevPlayers) => prevPlayers.filter((p) => p._id !== update.id));
            } else {
                fetchPlayers();
            }
        };

        socketRef.current.on("playerUpdate", handlePlayerUpdate);

        return () => {
            // Cleanup socket connection
            if (socketRef.current) {
                socketRef.current.off("playerUpdate", handlePlayerUpdate);
                socketRef.current.off("connect");
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, [router]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPlayer((prev) => ({ ...prev, [name]: value }));
        setIsFormDirty(true);
    };

    const handleAdd = async () => {
        if (!isFormDirty) return;

        try {
            const res = await fetch("/api/admin/players", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPlayer),
            });

            if (!res.ok) {
                throw new Error("Failed to add player");
            }

            toast.success("Player added successfully");
            setNewPlayer({
                name: "",
                university: "",
                category: "",
                totalRuns: 0,
                ballsFaced: 0,
                inningsPlayed: 0,
                wickets: 0,
                oversBowled: 0,
                runsConceded: 0,
            });
            setIsFormDirty(false);
        } catch (error) {
            console.error("Error adding player:", error);
            toast.error(error.message);
        }
    };

    const handleUpdate = async (id) => {
        const player = players.find((p) => p._id === id);
        try {
            const res = await fetch("/api/admin/players", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, ...player }),
            });

            if (!res.ok) {
                throw new Error("Failed to update player");
            }

            toast.success("Player updated successfully");
        } catch (error) {
            console.error("Error updating player:", error);
            toast.error(error.message);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this player?")) return;

        try {
            const res = await fetch("/api/admin/players", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });

            if (!res.ok) {
                throw new Error("Failed to delete player");
            }

            toast.success("Player deleted successfully");
        } catch (error) {
            console.error("Error deleting player:", error);
            toast.error(error.message);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 px-4">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b-2 border-gray-200 pb-2">
                Admin - Player Management
            </h1>

            <div className="bg-white rounded-lg shadow mb-8 p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Player</h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Player Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={newPlayer.name}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Enter player name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                University
                            </label>
                            <input
                                type="text"
                                name="university"
                                value={newPlayer.university}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Enter university name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Category
                            </label>
                            <select
                                name="category"
                                value={newPlayer.category}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <option value="">Select Player Category</option>
                                <option value="Batsman">Batsman</option>
                                <option value="All-Rounder">All-Rounder</option>
                                <option value="Bowler">Bowler</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Total Runs
                            </label>
                            <input
                                type="number"
                                name="totalRuns"
                                value={newPlayer.totalRuns}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Balls Faced
                            </label>
                            <input
                                type="number"
                                name="ballsFaced"
                                value={newPlayer.ballsFaced}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Innings Played
                            </label>
                            <input
                                type="number"
                                name="inningsPlayed"
                                value={newPlayer.inningsPlayed}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Wickets
                            </label>
                            <input
                                type="number"
                                name="wickets"
                                value={newPlayer.wickets}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Overs Bowled
                            </label>
                            <input
                                type="number"
                                name="oversBowled"
                                value={newPlayer.oversBowled}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Runs Conceded
                            </label>
                            <input
                                type="number"
                                name="runsConceded"
                                value={newPlayer.runsConceded}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </form>

                <div className="mt-4 flex justify-end">
                    <button
                        onClick={handleAdd}
                        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {isFormDirty ? "Add Player" : "No Changes to Save"}
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {players.map((player) => (
                    <div
                        key={player._id}
                        className="bg-white p-6 rounded-lg shadow flex justify-between items-start hover:shadow-lg transition duration-200"
                    >
                        <div className="mr-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                {player.name}
                            </h3>
                            <p className="text-sm text-gray-500">{player.university}</p>
                            <p className="text-xs text-gray-400 mt-1">
                                Category: {player.category}
                            </p>
                        </div>

                        <div className="w-64">
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <p className="font-medium text-gray-600 text-xs">Runs</p>
                                    <p className="text-gray-800">{player.totalRuns}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-600 text-xs">Wickets</p>
                                    <p className="text-gray-800">{player.wickets}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-600 text-xs">Overs</p>
                                    <p className="text-gray-800">{player.oversBowled}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-600 text-xs">Runs Conceded</p>
                                    <p className="text-gray-800">{player.runsConceded}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 items-end">
                            {!player.isOriginal && (
                                <>
                                    <button
                                        onClick={() => handleUpdate(player._id)}
                                        className="bg-blue-600 text-white py-1 px-3 rounded-md text-sm hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(player._id)}
                                        className="bg-red-600 text-white py-1 px-3 rounded-md text-sm hover:bg-red-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                                    >
                                        Delete
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPlayersPage;