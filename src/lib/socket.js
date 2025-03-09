import { Server } from "socket.io";

let io;
let port = 3001; // Default port

export async function startSocketServer() {
    if (!io) {
        try {
            io = await new Server(port, {
                cors: {
                    origin: "http://localhost:3000",
                    methods: ["GET", "POST"],
                },
            });

            io.on("connection", (socket) => {
                console.log("Client connected:", socket.id);
                socket.on("disconnect", () => console.log("Client disconnected:", socket.id));
            });

            console.log(`Socket.io server running on port ${port}`);
        } catch (error) {
            if (error.code === 'EADDRINUSE') {
                console.error(`Port ${port} is already in use. Trying port ${port + 1}...`);
                port++;
                return startSocketServer(); // Recursive call with new port
            }
            throw error;
        }
    }
    return io;
}

export const getIO = () => {
    if (!io) throw new Error("Not connected to socket.io");
    return io;
};

// Start the server
startSocketServer();