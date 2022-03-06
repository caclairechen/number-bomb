<template>
  <div>
    <v-col align="center">
      <div class="pa-7 rounded-circle d-inline-block">
        {{ countDown }}
      </div>
    </v-col>
    <v-container class="grey lighten-5">
      <v-row>
        <v-col cols="sm">
          <v-card class="pa-2" outlined max-width="200">
            <RangeCard v-bind:num="min" />
          </v-card>
        </v-col>
        <v-col cols="sm">
          <NumberInputPanel
            v-on:number-guessed="guessNumber"
            v-bind:min="min"
            v-bind:max="max"
          />
        </v-col>
        <v-col cols="sm">
          <v-card class="pa-2" outlined max-width="200">
            <RangeCard v-bind:num="max" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <HistoryList v-bind:historyList="histories" />
    <GameOver v-bind:open="gameOver && !win" @close="restartGame" />
    <Winner v-bind:open="gameOver && win" @close="restartGame" />
  </div>
</template>

<script>
import HistoryList from "./HistoryList.vue";
import RangeCard from "./RangeCard.vue";
import GameOver from "./GameOver.vue";
import Winner from "./Winner.vue";
import NumberInputPanel from "./NumberInputPanel.vue";
import SocketioService from "../services/socketio.service";

export default {
  name: "Playground",

  components: {
    HistoryList,
    RangeCard,
    GameOver,
    Winner,
    NumberInputPanel,
  },

  data: () => ({
    histories: [],
    min: 0,
    max: 100,
    gameOver: false,
    countDown: 10,
    myTurn: false,
    win: false,
  }),

  methods: {
    isBomb(number) {
      var numberIsBomb = number == this.$store.state.bomb;
      if (numberIsBomb) {
        this.countDown = 1;
      }
      return numberIsBomb;
    },

    updateRange(number) {
      if (number > this.$store.state.bomb) {
        this.max = number;
      } else {
        this.min = number;
      }
    },

    resetRoundState() {
      this.countDown = 10;
      this.myTurn = false;
    },

    resetGameState() {
      this.resetRoundState();
      this.min = 0;
      this.max = this.$store.state.maxRange;
      this.histories = [];
      this.gameOver = false;
      this.win = false;
    },

    updateHistoryList(number, player) {
      this.histories.push({
        number: number,
        min: this.min,
        max: this.max,
        player: player,
      });
    },

    guessNumber(number) {
      if (!this.myTurn) {
        alert("not your turn");
        return;
      }

      if (this.isBomb(number)) {
        this.loseGame();
        return;
      }

      SocketioService.rotate(
        number,
        this.$store.state.playerName,
        this.$store.state.roomNum
      );
      this.resetRoundState();
    },

    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      }
    },

    restartGame() {
      this.resetGameState();
      this.countDownTimer();
    },

    loseGame() {
      if (!this.myTurn) {
        return;
      }
      SocketioService.loseGame(
        this.$store.state.playerName,
        this.$store.state.roomNum
      );
      this.gameOver = true;
      this.win = false;
    },

    winGame() {
      this.gameOver = true;
      this.win = true;
    },
  },

  created() {
    SocketioService.socket.on("restart", () => {
      this.restartGame();
    });
    SocketioService.socket.on("play", (player) => {
      this.countDown = 10;
      if (this.$store.state.playerName == player) {
        this.myTurn = true;
      }
    });
    SocketioService.socket.on("update", (data) => {
      this.updateRange(data.guess);
      this.updateHistoryList(data.guess, data.playerName);
    });
    SocketioService.socket.on("lose", (player) => {
      if (this.$store.state.playerName != player) {
        this.winGame();
      }
    });
  },

  watch: {
    countDown: function (val) {
      if (val == 0) {
        this.loseGame();
      }
    },
  },
};
</script>
