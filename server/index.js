const express = require('express');
const app = express();
const mogoose = require('mongoose');
const authRoutes = require("./routes/auth");
const cors = require('cors');
const socket = require('socket.io');
const PORT = process.env.PORT || 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

// Connect to Mongo database
mogoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('DB connection successfull')
    })
    .catch((err) => {
        console.log(err.message)
    })

// Create listen server
const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})

// Create socket
const io = socket(server, {
    cors: {
        origin: 'http:localhost:3000',
        credentials: true,
    }
})

global.onlineUsers = new Map();
io.on('connect', (socket) => {
    socket.on('add-user', (userId) => {
        onlineUsers.set(userId, socket.id);
    })

    socket.on('send-message', (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket) {
            socket.to(sendUserSocket).emit('msg-receive', data.msg);
        }
    })
})