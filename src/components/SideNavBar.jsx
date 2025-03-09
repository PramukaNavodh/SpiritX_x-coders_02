"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const SideNavbar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navbarRef = useRef(null);
    const router = useRouter();

    const toggleNavbar = () => setIsExpanded(!isExpanded);

    useEffect(() => {
        const checkAuth = async () => {
            const res = await fetch("/api/auth/session");
            if (res.ok) {
                const data = await res.json();
                setIsLoggedIn(true);
                setIsAdmin(data.isAdmin);
            }
        };
        checkAuth();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navbarRef.current && !navbarRef.current.contains(event.target)) {
                setIsExpanded(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [navbarRef]);


    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        setIsLoggedIn(false);
        setIsAdmin(false);
        router.push("/auth/login");
    };

    return (
        <div className="fixed top-0 left-0 h-screen bg-gray-800 text-white z-50">
            <button
                className="p-4 focus:outline-none"
                onClick={toggleNavbar}
                aria-label="Toggle Sidebar"
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
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>

            <div
                ref={navbarRef}
                className={`transition-all duration-300 ease-in-out ${
                    isExpanded ? "w-64" : "w-16"
                } overflow-hidden`}
            >
                <div className="flex flex-col h-full p-4 space-y-2">
                    <Link
                        href="/"
                        className="flex items-center hover:bg-gray-700 p-2 rounded"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-6 w-6 ${isExpanded ? "mr-3" : ""}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                        {isExpanded && "Home"}
                    </Link>

                    {isLoggedIn ? (
                        <>
                            <Link
                                href="/players"
                                className="flex items-center hover:bg-gray-700 p-2 rounded"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-6 w-6 ${isExpanded ? "mr-3" : ""}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                    />
                                </svg>
                                {isExpanded && "Players"}
                            </Link>
                            <Link
                                href="/select-team"
                                className="flex items-center hover:bg-gray-700 p-2 rounded"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-6 w-6 ${isExpanded ? "mr-3" : ""}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    />
                                </svg>
                                {isExpanded && "Select Team"}
                            </Link>
                            <Link
                                href="/team"
                                className="flex items-center hover:bg-gray-700 p-2 rounded"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-6 w-6 ${isExpanded ? "mr-3" : ""}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7v-2a3 3 0 015.356-1.857M17 20l5-16a2 2 0 00-5 1.5M12 6.857l-5 16a2 2 0 005-1.5m-5 1v-2a3 3 0 013-3h6a3 3 0 013 3v2"
                                    />
                                </svg>
                                {isExpanded && "Team"}
                            </Link>
                            <Link
                                href="/budget"
                                className="flex items-center hover:bg-gray-700 p-2 rounded"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-6 w-6 ${isExpanded ? "mr-3" : ""}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8V4m0 4l.5-1.5m-.5 1.5l-.5-1.5m0 1.5L12 4m0 4v12m0 4h4m-4 0l-5-5-5 5m10 0H4"
                                    />
                                </svg>
                                {isExpanded && "Budget"}
                            </Link>
                            <Link
                                href="/leaderboard"
                                className="flex items-center hover:bg-gray-700 p-2 rounded"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-6 w-6 ${isExpanded ? "mr-3" : ""}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3.636a1 1 0 00-.293-.707L7 13.414a1 1 0 01-.293-.707V7a1 1 0 011-1h2a1 1 0 001-1 1 1 0 011 1v3.636a1 1 0 00.293.707l6.414 6.414a1 1 0 00.293.707v2.586z"
                                    />
                                </svg>
                                {isExpanded && "Leaderboard"}
                            </Link>
                            <Link
                                href="/spiriter"
                                className="flex items-center hover:bg-gray-700 p-2 rounded"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-6 w-6 ${isExpanded ? "mr-3" : ""}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                    />
                                </svg>
                                {isExpanded && "Spiriter"}
                            </Link>
                            {/*{isAdmin && (*/}
                            {/*    <Link*/}
                            {/*        href="/admin/players"*/}
                            {/*        className="flex items-center hover:bg-gray-700 p-2 rounded"*/}
                            {/*    >*/}
                            {/*        <svg*/}
                            {/*            xmlns="http://www.w3.org/2000/svg"*/}
                            {/*            className={`h-6 w-6 ${isExpanded ? "mr-3" : ""}`}*/}
                            {/*            fill="none"*/}
                            {/*            viewBox="0 0 24 24"*/}
                            {/*            stroke="currentColor"*/}
                            {/*        >*/}
                            {/*            <path*/}
                            {/*                strokeLinecap="round"*/}
                            {/*                strokeLinejoin="round"*/}
                            {/*                strokeWidth={2}*/}
                            {/*                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"*/}
                            {/*            />*/}
                            {/*            <path*/}
                            {/*                strokeLinecap="round"*/}
                            {/*                strokeLinejoin="round"*/}
                            {/*                strokeWidth={2}*/}
                            {/*                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"*/}
                            {/*            />*/}
                            {/*        </svg>*/}
                            {/*        {isExpanded && "Manage Players"}*/}
                            {/*    </Link>*/}
                            {/*)}*/}
                            {isAdmin && (
                                <>
                                    <Link
                                        href="/admin/dashboard"
                                        className="flex items-center hover:bg-gray-700 p-2 rounded"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`h-6 w-6 ${isExpanded ? "mr-3" : ""}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                        {isExpanded && "Dashboard"}
                                    </Link>
                                    <Link
                                        href="/admin/players"
                                        className="flex items-center hover:bg-gray-700 p-2 rounded"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`h-6 w-6 ${isExpanded ? "mr-3" : ""}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37.996.608 2.296.07 2.572-1.065z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                        {isExpanded && "Manage Players"}
                                    </Link>
                                </>
                            )}
                            <button
                                onClick={handleLogout}
                                className="flex items-center hover:bg-gray-700 p-2 rounded"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-6 w-6 ${isExpanded ? "mr-3" : ""}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h6a3 3 0 013 3v1"
                                    />
                                </svg>
                                {isExpanded && "Logout"}
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/auth/signup"
                                className="flex items-center hover:bg-gray-700 p-2 rounded"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-6 w-6 ${isExpanded ? "mr-3" : ""}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20h18a1 1 0 001-1v-1a2 2 0 00-2-2H5a2 2 0 00-2 2v1a1 1 0 001 1z"
                                    />
                                </svg>
                                {isExpanded && "Sign Up"}
                            </Link>
                            <Link
                                href="/auth/login"
                                className="flex items-center hover:bg-gray-700 p-2 rounded"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-6 w-6 ${isExpanded ? "mr-3" : ""}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                    />
                                </svg>
                                {isExpanded && "Login"}
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SideNavbar;