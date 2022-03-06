const server = require('http').createServer()
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});

var rooms = {}

function createRoom(roomCapacity, maxNum, playerName){
    var room = {
        roomCapacity: roomCapacity,
        maxNum: maxNum,
        players: new Array(roomCapacity),
        bomb: Math.round(Math.random() * maxNum),
        currentIndex: 1
    }
    room.players[0] = playerName;
    return room;
}


io.on('connection', (socket) => {
    socket.on("createroom", (data) => {
        rooms[data.roomNum] = createRoom(data.roomCapacity, data.maxNum, data.playerName)
        socket.join(data.roomNum);
    })
    socket.on("checkroom", (data) => {
        socket.join(data.roomNum);
        var room = rooms[data.roomNum];
        if(room == undefined){
            io.in(data.playerName).emit('noroom');
        }
        else{
            io.in(data.playerName).emit('roomexits');
        }
    })
    socket.on("joinroom", (data) => {
        socket.join(data.roomNum);
        var room = rooms[data.roomNum];
        room.players[room.currentIndex] = data.playerName;
        room.currentIndex += 1;
        io.in(data.roomNum).emit('roomjoined', {
            roomCapacity: room.roomCapacity,
            maxNum: room.maxNum,
            bomb: room.bomb,
            players: room.players
        });
        if (room.currentIndex == room.roomCapacity) {
            io.in(data.roomNum).emit('gamestart');
            io.in(data.roomNum).emit('play', room.players[0]);
        }
    })
    socket.on('rotate', (data) => {
        var room = rooms[data.roomNum];
        io.in(data.roomNum).emit('update', 
        {
            guess: data.guess,
            playerName: data.playerName
        });
        playerIndex = room.players.findIndex(player => player === data.playerName);
        nextPlayer = room.players[(playerIndex + 1) % room.roomCapacity];
        io.in(data.roomNum).emit('play', nextPlayer);
    })
    socket.on('lose', (data) => {
        io.in(data.roomNum).emit('lose', data.playerName);
    })
    socket.on('restart', (roomNum) => {
        io.in(roomNum).emit('restart');
        io.in(roomNum).emit('play', room.players[0]);
    })
    socket.on('disconnect', () => {
        io.emit('restart');
    })
})

server.listen(3000, () => console.log("server: listening on port 3000"))