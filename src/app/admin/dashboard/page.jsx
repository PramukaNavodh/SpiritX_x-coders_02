"use client";

import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import io from "socket.io-client";

export default function AdminDashboard() {
    const [players, setPlayers] = useState([]);
    const [summary, setSummary] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const socket = io("http://localhost:3001");

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Fetch summary data
                const summaryRes = await fetch("/api/admin/summary");
                if (!summaryRes.ok) {
                    router.push("/auth/login");
                    return;
                }
                const summaryData = await summaryRes.json();
                setSummary(summaryData);

                // Fetch player stats
                const playersRes = await fetch("/api/admin/stats");
                if (!playersRes.ok) {
                    router.push("/auth/login");
                    return;
                }
                const playersData = await playersRes.json();
                setPlayers(playersData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        // Socket.io setup
        socket.on("playerUpdate", () => {
            fetchData();
        });

        return () => {
            socket.disconnect();
        };
    }, [router]);

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto mt-10 p-4 text-center">
                <h1 className="text-2xl font-bold mb-4">Loading Dashboard...</h1>
                <div className="animate-pulse space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="bg-gray-200 h-6 rounded w-32 mx-auto"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 p-4">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b-2 border-gray-200 pb-2">
                Admin Dashboard
            </h1>

            {/* Tournament Summary Section */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-gray-700">Tournament Summary</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Runs</h3>
                        <p className="text-2xl font-bold text-blue-600">{summary.totalRuns}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Wickets</h3>
                        <p className="text-2xl font-bold text-red-600">{summary.totalWickets}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Highest Run Scorer</h3>
                        <p className="text-2xl font-bold text-green-600">{summary.highestRunScorer}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Highest Wicket Taker</h3>
                        <p className="text-2xl font-bold text-purple-600">{summary.highestWicketTaker}</p>
                    </div>
                </div>
            </section>

            {/* Player Statistics Section */}
            <section>
                <h2 className="text-2xl font-bold mb-6 text-gray-700">Player Statistics</h2>
                <div className="space-y-4">
                    {players.map((player) => (
                        <div
                            key={player._id}
                            className="bg-white p-6 rounded-lg shadow flex justify-between items-center hover:shadow-md transition duration-200"
                        >
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">{player.name}</h3>
                                <p className="text-gray-500">{player.university}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center">
                                    <p className="font-medium text-gray-600 text-sm">Runs</p>
                                    <p className="font-bold text-blue-600">{player.totalRuns}</p>
                                </div>
                                <div className="text-center">
                                    <p className="font-medium text-gray-600 text-sm">Wickets</p>
                                    <p className="font-bold text-red-600">{player.wickets}</p>
                                </div>
                                <div className="text-center">
                                    <p className="font-medium text-gray-600 text-sm">Balls Faced</p>
                                    <p className="font-bold text-green-600">{player.ballsFaced}</p>
                                </div>
                                <div className="text-center">
                                    <p className="font-medium text-gray-600 text-sm">Overs Bowled</p>
                                    <p className="font-bold text-purple-600">{player.oversBowled}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}