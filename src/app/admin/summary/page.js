"use client";

import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";

export default function AdminSummary() {
    const [summary, setSummary] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchSummary = async () => {
            const res = await fetch("/api/admin/summary");
            if (!res.ok) router.push("/login");
            else setSummary(await res.json());
        };
        fetchSummary();
    }, [router]);

    if (!summary) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Tournament Summary</h1>
            <p>Total Runs: {summary.totalRuns}</p>
            <p>Total Wickets: {summary.totalWickets}</p>
            <p>Highest Run Scorer: {summary.highestRunScorer}</p>
            <p>Highest Wicket Taker: {summary.highestWicketTaker}</p>
        </div>
    );
}