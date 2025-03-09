// // app/leaderboard/page.jsx
// "use client";
//
// import {useState, useEffect} from "react";
// import {useRouter} from "next/navigation";
// import {toast} from "react-hot-toast";
// import io from "socket.io-client";
//
// const LeaderboardPage = () => {
//     const [leaderboard, setLeaderboard] = useState([]);
//     const [username, setUsername] = useState("");
//     const [isLoading, setIsLoading] = useState(true);
//     const router = useRouter();
//     const socket = io();
//
//     useEffect(() => {
//         const fetchLeaderboard = async () => {
//             setIsLoading(true);
//             try {
//                 const res = await fetch("/api/leaderboard");
//                 if (!res.ok) {
//                     router.push("/auth/login");
//                     return;
//                 }
//                 setLeaderboard(await res.json());
//
//                 const userRes = await fetch("/api/auth/session");
//                 if (userRes.ok) {
//                     const userData = await userRes.json();
//                     setUsername(userData.username);
//                 }
//             } catch (error) {
//                 console.error("Error fetching leaderboard:", error);
//                 toast.error("Failed to load leaderboard");
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//
//         fetchLeaderboard();
//
//         // Socket.io setup
//         socket.on("connect", () => {
//             console.log("Socket connected");
//         });
//
//         socket.on("teamUpdate", () => {
//             fetchLeaderboard();
//         });
//
//         return () => {
//             socket.off("teamUpdate");
//             socket.disconnect();
//         };
//     }, [router]);
//
//     return (
//         <div className="max-w-2xl mx-auto mt-10 px-4">
//             <h1 className="text-3xl font-bold mb-6 text-gray-800">Leaderboard</h1>
//
//             {isLoading ? (
//                 <div className="animate-pulse space-y-4">
//                     {[...Array(10)].map((_, i) => (
//                         <div key={i} className="bg-white p-4 rounded-lg shadow"></div>
//                     ))}
//                 </div>
//             ) : (
//                 <div className="space-y-2">
//                     {leaderboard.map((user, index) => (
//                         <div
//                             key={user._id}
//                             className={`flex items-center justify-between p-4 rounded-lg shadow-sm ${
//                                 user.username === username ? "bg-yellow-50" : "bg-white"
//                             }`}
//                         >
//                             <div className="flex items-center">
//                                 <span className="w-6 h-6 bg-gray-200 rounded-full mr-2"></span>
//                                 <span>{user.username}</span>
//                             </div>
//                             <span className="font-medium">{user.points.toFixed(2)}</span>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default LeaderboardPage;

"use client";

import {useState, useEffect, useRef} from "react";
import {useRouter} from "next/navigation";
import {toast} from "react-hot-toast";
import io from "socket.io-client";
import {FaCrown, FaFire} from "react-icons/fa";

const LeaderboardPage = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const router = useRouter();
    const socketRef = useRef(null);
    const modalRef = useRef(null);

    useEffect(() => {
        socketRef.current = io();

        const fetchLeaderboard = async () => {
            setIsLoading(true);
            try {
                const res = await fetch("/api/leaderboard");
                if (!res.ok) {
                    router.push("/auth/login");
                    return;
                }
                setLeaderboard(await res.json());

                const userRes = await fetch("/api/auth/session");
                if (userRes.ok) {
                    const userData = await userRes.json();
                    setUsername(userData.username);
                }
            } catch (error) {
                console.error("Error fetching leaderboard:", error);
                toast.error("Failed to load leaderboard");
            } finally {
                setIsLoading(false);
            }
        };

        fetchLeaderboard();

        socketRef.current.on("connect", () => {
            console.log("Socket connected");
        });

        socketRef.current.on("teamUpdate", () => {
            fetchLeaderboard();
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.off("teamUpdate");
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, [router]);

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedUser(null);
        setIsModalOpen(false);
    };

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
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 min-h-screen py-10 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-white text-center mb-8">
                    <FaCrown className="inline-block mr-2 text-yellow-400"/>
                    Fantasy League Leaderboard
                </h1>

                {isLoading ? (
                    <div className="animate-pulse space-y-4">
                        {[...Array(10)].map((_, i) => (
                            <div
                                key={i}
                                className="bg-gray-800 p-4 rounded-lg shadow-md"
                            ></div>
                        ))}
                    </div>
                ) : (
                    <>
                        {/* Top 3 Positions with Special Highlight */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            {leaderboard.slice(0, 3).map((user, index) => (
                                <div
                                    key={user._id}
                                    className="bg-white rounded-2xl shadow-xl p-6 text-center"
                                >
                                    <div className="mb-4">
                                        <FaCrown
                                            className={`inline-block mb-2 ${
                                                index === 0
                                                    ? "text-gold-400"
                                                    : index === 1
                                                        ? "text-silver-400"
                                                        : "text-bronze-400"
                                            } text-2xl`}
                                        />
                                        <p className="text-gray-500 font-medium">Position {index + 1}</p>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800">{user.username}</h2>
                                    <p className="text-3xl font-bold text-blue-600 mt-2">
                                        {user.points.toFixed(2)}
                                    </p>
                                    <button
                                        onClick={() => handleUserClick(user)}
                                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                    >
                                        View Details
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Main Leaderboard Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-gray-800 rounded-lg shadow-md">
                                <thead>
                                <tr className="bg-gray-700 text-white">
                                    <th className="py-3 px-4 text-center">Rank</th>
                                    <th className="py-3 px-4 text-left">Player</th>
                                    <th className="py-3 px-4 text-right">Points</th>
                                    <th className="py-3 px-4 text-center">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {leaderboard.map((user, index) => (
                                    <tr
                                        key={user._id}
                                        className="border-b border-gray-700 hover:bg-gray-800/50 transition"
                                    >
                                        <td className="py-3 px-4 text-center">
                                            {index + 1}
                                            {index < 3 && (
                                                <FaCrown
                                                    className={`inline-block ml-1 ${
                                                        index === 0
                                                            ? "text-gold-400"
                                                            : index === 1
                                                                ? "text-silver-400"
                                                                : "text-bronze-400"
                                                    }`}
                                                />
                                            )}
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center">
                                                <span className="w-6 h-6 bg-gray-200 rounded-full mr-2"></span>
                                                <span className="text-white">{user.username}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-right font-bold text-blue-400">
                                            {user.points.toFixed(2)}
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <button
                                                onClick={() => handleUserClick(user)}
                                                className="text-blue-400 hover:text-blue-500"
                                            >
                                                Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                        {/* User Detail Modal */}
                        {isModalOpen && selectedUser && (
                            <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                                <div
                                    ref={modalRef}
                                    className="bg-white rounded-2xl p-6 w-full max-w-2xl relative"
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-2xl font-bold">{selectedUser.username}'s Details</h2>
                                        <button
                                            onClick={closeModal}
                                            className="text-gray-400 hover:text-gray-500"
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
                                        <div className="flex items-center mb-4">
                                            <FaFire className="text-red-500 mr-2"/>
                                            <h3 className="text-xl font-bold">Current Rank:
                                                #{leaderboard.findIndex(u => u._id === selectedUser._id) + 1}</h3>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-gray-600 font-medium">Username</p>
                                                <p className="text-lg font-semibold">{selectedUser.username}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600 font-medium">Total Points</p>
                                                <p className="text-lg font-semibold text-blue-600">{selectedUser.points.toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <div className="mt-6">
                                            <button
                                                onClick={closeModal}
                                                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                            >
                                                Close Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default LeaderboardPage;