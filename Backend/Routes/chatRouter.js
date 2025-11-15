const express = require("express");
const chatRouter = express.Router();

function chat(io) {
    io.on("connection", (socket) => {
        console.log("New User Connected", socket.id);
        socket.on('message', (data) => {
            socket.broadcast.emit('sendmessage',data);
        })

    })
}

module.exports = chat;
