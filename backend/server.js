import express from 'express';
import connectDB from "./config/db.js";
import cors from 'cors';
import http from 'http'
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import router from './routes/auth.js';
import gigRouter from './routes/gig.js';
import bidRouter from './routes/bid.js';
import Hrouter from './routes/hire.js';
import { Server, Socket } from 'socket.io';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // EXACT frontend URL
    credentials: true,               // VERY IMPORTANT
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  })
);

app.use("/api/auth",router);
app.use("/api/gigs",gigRouter);
app.use("/api/bids",bidRouter);
app.use("/api/bids", Hrouter);
 
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin:"http://localhost:5173",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User connected: ", socket.id);

  socket.on("join" , (userId) => {
    socket.join(userId);
  });
});

export {io};

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error);
    process.exit(1);
  }
};

startServer();
