'use strict';

import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
app.use(express.static('public'));
const http = createServer(app);
const io = new Server(http);
const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('disconnect', () => {
        console.log('a user disconnected', socket.id);
    });

    socket.on('chat message', (msg, room) => {
        console.log('message:', msg);
        if(room === ''){
            io.emit('chat message', msg);
        }
        else{
            io.to(room).emit('chat message', msg);
        }
    });

    socket.on('change room', (room) => {
        console.log(room);
        if(room !== ''){
            socket.join(room);
            io.to(room).emit('chat message', `${socket.id} has joined the room.`);
        }
    })

    socket.on('disconnect room', (room) => {
        console.log("try to disconnect to ", room);
        io.to(room).emit('chat message', `${socket.id} has left the room.`)
        socket.leave(room);
    })
    
});  

http.listen(port, () => {
    console.log(`Socket.io chat app listening on port ${port}!`);
  });
  