"use client";

import {useState, useEffect, useRef} from "react";
import {useRouter} from "next/navigation";
import {FaRobot, FaSpinner, FaPaperPlane} from "react-icons/fa";

export default function Spiriter() {
    const [query, setQuery] = useState("");
    const [response, setResponse] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);
    const router = useRouter();
    const chatContainerRef = useRef(null);

    useEffect(() => {
        const checkAuth = async () => {
            const res = await fetch("/api/auth/session");
            if (!res.ok) router.push("/login");
        };
        checkAuth();
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        // Add user message to chat history
        setChatHistory(prev => [...prev, {text: query, isUser: true, timestamp: new Date()}]);
        setLoading(true);
        setError("");
        setResponse("");

        try {
            const res = await fetch("/api/spiriter", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({query}),
            });
            const data = await res.json();

            if (data.error) {
                setError(data.error);
                setChatHistory(prev => [...prev, {
                    text: "Sorry, I couldn't process that. Please try again.",
                    isUser: false,
                    timestamp: new Date()
                }]);
            } else {
                setResponse(data.response);
                setChatHistory(prev => [...prev, {text: data.response, isUser: false, timestamp: new Date()}]);
            }
            setQuery("");
        } catch (err) {
            setError("Failed to connect to Spiriter");
            setChatHistory(prev => [...prev, {
                text: "Sorry, I couldn't process that. Please try again.",
                isUser: false,
                timestamp: new Date()
            }]);
        } finally {
            setLoading(false);
        }
    };

    // Scroll to bottom of chat container
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    return (
        <div className="max-w-xl mx-auto mt-10 bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-center mb-6">
                <FaRobot className="text-blue-500 text-2xl mr-2"/>
                <h1 className="text-2xl font-bold text-gray-800">Spiriter Chatbot</h1>
            </div>

            <div className="relative bg-gray-100 rounded-2xl p-4 mb-4" ref={chatContainerRef}>
                {chatHistory.map((message, index) => (
                    <div
                        key={index}
                        className={`mb-4 ${
                            message.isUser ? "text-right" : "text-left"
                        }`}
                    >
                        {message.isUser ? (
                            <div className="flex justify-end items-end">
                                <div className="max-w-md bg-blue-500 text-white rounded-lg px-4 py-3 relative">
                                    <span className="block">{message.text}</span>
                                    <span className="absolute bottom-0 right-0 mb-1 text-xs text-blue-200">
                    {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                  </span>
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-start items-end">
                                <div
                                    className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center overflow-hidden mr-3">
                                    <FaRobot className="text-white"/>
                                </div>
                                <div
                                    className="max-w-md bg-white text-gray-800 rounded-lg px-4 py-3 relative shadow-sm">
                                    <span className="block">{message.text}</span>
                                    <span className="absolute bottom-0 right-0 mb-1 text-xs text-gray-400">
                    {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                  </span>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {loading && (
                    <div className="flex justify-start items-center">
                        <FaRobot className="text-blue-500 mr-2"/>
                        <div className="flex items-center">
                            <FaSpinner className="animate-spin text-blue-500 mr-2"/>
                            <span className="text-gray-600">Thinking...</span>
                        </div>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="flex space-x-3">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask about a player or team..."
                    className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
                    disabled={loading}
                />
                <button
                    type="submit"
                    className="p-3 bg-blue-500 text-white rounded-lg flex items-center justify-center hover:bg-blue-600 transition disabled:bg-gray-400"
                    disabled={loading}
                >
                    <FaPaperPlane className="w-5 h-5"/>
                </button>
            </form>

            {error && (
                <div className="mt-4 p-4 bg-red-100 rounded-lg text-red-800">
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
}