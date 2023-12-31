import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import sockets from "./socket.js";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = 4000;


await mongoose.connect(
  `mongodb+srv://${process.env.username}:${process.env.password}@cluster0.4fhuqfa.mongodb.net/?retryWrites=true&w=majority`
);



const httpServer = http.createServer(app);

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  //console.log("Connetion is ready");
  socket.emit("hello", (message) => {
    console.log(message);
  });
});

io.on("connection", (socket) => {
  socket.on("send-message", (arg) => {
    console.log(arg);
  });

 
});

io.on("connection", sockets);

httpServer.listen(port, () => {
  console.log("server start at http://localhost:4000/");
});
