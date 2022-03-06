<template>
  <div>
    <div v-show="!startGame">
      <v-col align="center">
        <div class="pa-7 rounded-pill d-inline-block">
          Room: {{ $store.state.roomNum }}
        </div>
      </v-col>
      <v-col align="center">
        <div class="pa-7 rounded-pill d-inline-block">
          Waiting for
          {{ leftRoomCapacity }} more players to join
        </div>
      </v-col>
      <v-col v-for="player in $store.state.players" v-bind:key="player">
        <div class="pa-7 rounded-pill d-inline-block">{{ player }}</div>
      </v-col>
    </div>
    <div v-show="startGame">
      <Playground ref="playground" @quit-game="quitGame" />
    </div>
  </div>
</template>

<script>
import Playground from "./Playground.vue";
import SocketioService from "../services/socketio.service";

export default {
  name: "WaitRoom",

  components: {
    Playground,
  },

  data() {
    return {
      startGame: false,
    };
  },

  computed: {
    leftRoomCapacity: function () {
      return this.$store.state.roomCapacity - this.$store.state.players.length;
    },
  },

  methods: {
    startTheGame() {
      this.startGame = true;
      this.$refs.playground.restartGame();
    },

    quitGame() {
      this.startGame = false;
      this.$emit("quit-game");
    },
  },

  created() {
    SocketioService.socket.on("roomjoined", (data) => {
      this.$store.commit("setRoomCapacity", data.roomCapacity);
      this.$store.commit("setMaxRange", data.maxNum);
      this.$store.commit("setBomb", data.bomb);
      this.$store.commit("setPlayers", data.players);
    });
    SocketioService.socket.on("gamestart", () => {
      this.startTheGame();
    });
  },
};
</script>
