<template>
  <div>
    <v-dialog v-model="confirmScreen" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5"> {{ title }} </v-card-title>
        <v-card-text>
          The number bomb is {{ $store.state.bomb }}.
          <br />
          {{ msg }}
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="restartGame">
            Restart
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="quitGame"> Quit </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="loadingScreen" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Waiting for all users to choose restart
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import SocketioService from "../services/socketio.service";

export default {
  name: "GameOver",
  props: ["open", "title", "msg"],

  data: () => ({
    loading: false,
  }),

  computed: {
    loadingScreen: function () {
      return this.open && this.loading;
    },
    confirmScreen: function () {
      return this.open && !this.loading;
    },
  },

  methods: {
    closeDialog() {
      this.open = false;
      this.loading = false;
    },
    restartGame() {
      this.loading = true;
      SocketioService.restartGame(this.$store.state.roomNum);
    },
    quitGame() {
      SocketioService.quitGame(this.$store.state.roomNum);
    },
  },

  created() {
    SocketioService.socket.on("quit", () => {
      this.closeDialog();
      this.$emit("quit-game");
    });
    SocketioService.socket.on("restart", () => {
      this.closeDialog();
      this.$emit("restart-game");
    });
  },
};
</script>
