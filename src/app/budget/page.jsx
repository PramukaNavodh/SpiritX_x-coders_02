// app/budget/page.jsx
"use client";

import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import {toast} from "react-hot-toast";
import io from "socket.io-client";

const BudgetPage = () => {
    const [team, setTeam] = useState([]);
    const [budget, setBudget] = useState(9000000);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const socket = io("http://localhost:3001");

    useEffect(() => {
        const fetchBudget = async () => {
            setIsLoading(true);
            try {
                const res = await fetch("/api/team");
                if (!res.ok) {
                    router.push("/auth/login");
                    return;
                }
                const teamData = await res.json();
                setTeam(teamData.team);

                const budgetRes = await fetch("/api/budget");
                if (budgetRes.ok) {
                    const budgetData = await budgetRes.json();
                    setBudget(budgetData.budget);
                }
            } catch (error) {
                console.error("Error fetching budget data:", error);
                toast.error("Failed to load budget information");
            } finally {
                setIsLoading(false);
            }
        };

        fetchBudget();

        // Socket.io setup
        socket.on("connect", () => {
            console.log("Socket connected");
        });

        socket.on("teamUpdate", () => {
            fetchBudget();
        });

        return () => {
            socket.off("teamUpdate");
            socket.disconnect();
        };
    }, [router]);

    const spent = team.reduce((sum, p) => sum + p.value, 0);

    return (
        <div className="max-w-2xl mx-auto mt-10 px-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Budget</h1>

            {isLoading ? (
                <div className="animate-pulse space-y-4">
                    <div className="bg-white p-4 rounded-lg shadow h-10"></div>
                    <div className="bg-white p-4 rounded-lg shadow h-10"></div>
                </div>
            ) : (
                <div>
                    <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
                        <span>Remaining Budget</span>
                        <span className="font-medium">Rs. {budget.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
                        <span>Spent</span>
                        <span className="font-medium">Rs. {spent.toLocaleString()}</span>
                    </div>

                    <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
                        <h2 className="text-xl font-bold mb-4">Team Breakdown</h2>
                        <ul className="space-y-2">
                            {team.map((player) => (
                                <li key={player._id} className="flex justify-between items-center">
                                    <span>{player.name}</span>
                                    <span>Rs. {player.value.toLocaleString()}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BudgetPage;