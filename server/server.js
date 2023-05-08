const http = require("http");
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");

const faq = require("./data.js");

const PORT = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    orgin: "https://au-chat-bot.vercel.app/",
    methods: ["GET", "POST"],
  }
});

// Enable CORS
app.use(cors());


io.on("connection", (socket) => {
  console.log("a user connected");

  socket.emit("chat message", "Hello! I am a Ahmedabad University Chatbot. I'm here to help answer your questions and provide information on various topics. Feel free to ask me anything you'd like to know, and I'll do my best to assist you.");

  socket.on("chat message", (msg) => {
    console.log(`received message: ${msg}`);

    // Find the corresponding answer for the question
    let maxMacthes = 0;
    let answer = "Sorry, I don't understand that question.";
    faq.forEach(
      (item) => {
        let q = item.question.toLowerCase().split(' ').sort();
        let message = msg.toLowerCase().split(' ').sort();
        let matchCount = 0;

        message.forEach((m) => matchCount += q.indexOf(m) !== -1 ? 1 : 0);

        if (matchCount > maxMacthes) {
          maxMacthes = matchCount;
          answer = item.answer;
        }
      }
    );
    maxMacthes = 0;

    // If we found a match, send the answer back to the client
    socket.emit("chat message", answer);
  });
});

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
