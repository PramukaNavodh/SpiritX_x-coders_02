// // app/players/page.jsx
// "use client";
//
// import {useState, useEffect} from "react";
// import {useRouter} from "next/navigation";
// import {toast} from "react-hot-toast";
//
// const PlayersPage = () => {
//     const [players, setPlayers] = useState([]);
//     const [selectedPlayer, setSelectedPlayer] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const router = useRouter();
//
//     useEffect(() => {
//         const fetchPlayers = async () => {
//             setIsLoading(true);
//             try {
//                 const res = await fetch("/api/players");
//                 if (!res.ok) {
//                     router.push("/auth/login");
//                     return;
//                 }
//                 setPlayers(await res.json());
//             } catch (error) {
//                 console.error("Error fetching players:", error);
//                 toast.error("Failed to load players");
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//
//         fetchPlayers();
//     }, [router]);
//
//     return (
//         <div className="max-w-4xl mx-auto mt-10 px-4">
//             <h1 className="text-3xl font-bold mb-6 text-gray-800">Players</h1>
//
//             {isLoading ? (
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
//                     {[...Array(6)].map((_, i) => (
//                         <div key={i} className="bg-white p-4 rounded-lg shadow h-32"></div>
//                     ))}
//                 </div>
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     {players.map((player) => (
//                         <div
//                             key={player._id}
//                             onClick={() => setSelectedPlayer(player)}
//                             className="bg-white p-4 rounded-lg shadow cursor-pointer transition-transform hover:transform hover:scale-105"
//                         >
//                             <p className="font-medium">{player.name}</p>
//                             <p className="text-sm text-gray-600">{player.university}</p>
//                             <p className="mt-2 font-semibold">Rs. {player.value.toLocaleString()}</p>
//                         </div>
//                     ))}
//                 </div>
//             )}
//
//             {selectedPlayer && (
//                 <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-lg">
//                     <h2 className="text-2xl font-bold mb-2">{selectedPlayer.name}</h2>
//                     <p className="text-gray-600">{selectedPlayer.university}</p>
//                     <div className="mt-4 grid grid-cols-2 gap-4">
//                         <div>
//                             <p className="font-medium">Runs</p>
//                             <p>{selectedPlayer.totalRuns}</p>
//                         </div>
//                         <div>
//                             <p className="font-medium">Wickets</p>
//                             <p>{selectedPlayer.wickets}</p>
//                         </div>
//                         <div>
//                             <p className="font-medium">Value</p>
//                             <p>Rs. {selectedPlayer.value.toLocaleString()}</p>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default PlayersPage;

"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const PlayersPage = () => {
    const [players, setPlayers] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    const modalRef = useRef(null);

    useEffect(() => {
        const fetchPlayers = async () => {
            setIsLoading(true);
            try {
                const res = await fetch("/api/players");
                if (!res.ok) {
                    router.push("/login");
                    return;
                }
                setPlayers(await res.json());
            } catch (error) {
                console.error("Error fetching players:", error);
                toast.error("Failed to load players");
            } finally {
                setIsLoading(false);
            }
        };

        fetchPlayers();
    }, [router]);

    const handlePlayerClick = (player) => {
        setSelectedPlayer(player);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedPlayer(null);
        setIsModalOpen(false);
    };

    // Close modal when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal();
            }
        };

        if (isModalOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isModalOpen]);

    // Close modal when pressing Escape
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                closeModal();
            }
        };

        if (isModalOpen) {
            document.addEventListener("keydown", handleEscape);
        } else {
            document.removeEventListener("keydown", handleEscape);
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isModalOpen]);

    return (
        <div className="max-w-4xl mx-auto mt-10 px-4 relative">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Players</h1>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-white p-4 rounded-lg shadow h-32"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {players.map((player) => (
                        <div
                            key={player._id}
                            onClick={() => handlePlayerClick(player)}
                            className="bg-white p-4 rounded-lg shadow cursor-pointer transition-transform hover:transform hover:scale-105 relative group"
                        >
                            <p className="font-medium">{player.name}</p>
                            <p className="text-sm text-gray-600">{player.university}</p>
                            <p className="mt-2 font-semibold">Rs. {player.value.toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal for player details */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div
                        ref={modalRef}
                        className="bg-white rounded-lg p-6 w-full max-w-2xl relative"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold">{selectedPlayer?.name}</h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="text-gray-600 font-medium">University</p>
                                <p className="text-lg font-semibold">{selectedPlayer?.university}</p>
                            </div>

                            <div>
                                <p className="text-gray-600 font-medium">Value</p>
                                <p className="text-lg font-semibold">Rs. {selectedPlayer?.value.toLocaleString()}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-gray-600 font-medium">Runs</p>
                                    <p className="text-lg font-semibold">{selectedPlayer?.totalRuns}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 font-medium">Wickets</p>
                                    <p className="text-lg font-semibold">{selectedPlayer?.wickets}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-gray-600 font-medium">Balls Faced</p>
                                    <p className="text-lg font-semibold">{selectedPlayer?.ballsFaced}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 font-medium">Innings Played</p>
                                    <p className="text-lg font-semibold">{selectedPlayer?.inningsPlayed}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-gray-600 font-medium">Overs Bowled</p>
                                    <p className="text-lg font-semibold">{selectedPlayer?.oversBowled}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 font-medium">Runs Conceded</p>
                                    <p className="text-lg font-semibold">{selectedPlayer?.runsConceded}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlayersPage;