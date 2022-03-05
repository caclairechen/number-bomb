const server = require('http').createServer()
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});
io.on('connection', (socket)=> {
    socket.emit("hello", "number bomb");
})

server.listen(3000, () => console.log("server: listening on port 3000"))