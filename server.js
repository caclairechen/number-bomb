const server = require('http').createServer()
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});
io.on('connection', (socket) => {
    console.log("server: new user joined " + socket.id);
    socket.emit("hello", "number bomb");
    socket.on('disconnect', () => {
        console.log("server: user left " + socket.id);
    })
})

server.listen(3000, () => console.log("server: listening on port 3000"))