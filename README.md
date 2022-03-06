# Number Bomb

## What is this?

*Number Bomb* is a short but fun game you can play by yourself or with friends!

A bomb number will be randomly chosen from the given range everytime the game starts, each round you need to guess a number within the range and avoid the bomb number. The range will update with each guess and the bomb will always be within the range. Who makes the bomb guess will lose. 

## Website Design
[project figma mockup](https://www.figma.com/file/XMNxOLgBoNQgPeEv62PtGp/Number-Bomb?node-id=0%3A1)

## Build and Run

This web-based multiplayer game is built with [Vue.js](https://vuejs.org) and [socket.io](https://socket.io).

### Start the server
1. In the root directory, run `npm i` to install required npm package.
2. Run `node server.js` to start the server.
3. Server will be hosted at `http://localhost:3000`.

### Start the client
1. Go to the `client` directory, run `npm i` to install required npm package.
2. Run `npm run serve` to start the client.
3. Client runs at `http://localhost:8080`.
4. Open multiple tabs to simulate different players.