const express = require("express");
const chatRouter = express.Router();

function chat(io) {
    io.on("connection", (socket) => {
        console.log("New User Connected", socket.id);
        socket.on('message', (msg) => {
            socket.broadcast.emit('sendmessage',msg);
        })

    })
}

module.exports = chat;
