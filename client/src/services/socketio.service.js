import { io } from "socket.io-client";

class SocketioService {
  socket;
  constructor() {}

  setupSocketConnection() {
    this.socket = io("http://localhost:3000");
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  createRoom(roomNum, roomCapacity, maxNum, playerName) {
    this.socket.emit("createroom", {
      roomNum: roomNum,
      roomCapacity: roomCapacity,
      maxNum: maxNum,
      playerName: playerName,
    });
  }

  checkRoom(roomNum) {
    this.socket.emit("checkroom", {
      roomNum: roomNum,
      playerName: this.socket.id,
    });
  }

  joinRoom(roomNum) {
    this.socket.emit("joinroom", {
      roomNum: roomNum,
      playerName: this.socket.id,
    });
  }

  rotate(guess, playerName, roomNum) {
    this.socket.emit("rotate", {
      guess: guess,
      playerName: playerName,
      roomNum: roomNum,
    });
  }

  loseGame(playerName, roomNum) {
    this.socket.emit("lose", {
      playerName: playerName,
      roomNum: roomNum,
    });
  }

  restartGame(roomNum) {
    this.socket.emit("restart", {
      roomNum: roomNum,
    });
  }
}

export default new SocketioService();
