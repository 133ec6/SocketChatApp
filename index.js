const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("public"));

const users={};

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
    socket.on('new-user-joined', (name) => {
        const sid = socket.id;
        // console.log(sid);
        users[sid] = name;
        socket.broadcast.emit('new-user-joined', name);
    });
    socket.on('chat message', (name,msg) => {
        socket.broadcast.emit('chat message', name,msg);
    });
    socket.on('disconnect',()=>{
      socket.broadcast.emit('user-left', users[socket.id]);
    })
  });

  
server.listen(3000, () => {
  console.log('listening on *:3000');
});