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
    <GameOver v-bind:bomb="bomb" v-bind:open="gameOver" @close="restartGame" />
  </div>
</template>

<script>
import HistoryList from "./HistoryList.vue";
import RangeCard from "./RangeCard.vue";
import GameOver from "./GameOver.vue";
import NumberInputPanel from "./NumberInputPanel.vue";

export default {
  name: "Playground",
  props: ["initMax", "numPlayer"],

  components: {
    HistoryList,
    RangeCard,
    GameOver,
    NumberInputPanel,
  },

  data: () => ({
    histories: [],
    min: 0,
    max: 100,
    bomb: 0,
    gameOver: false,
    countDown: 10,
    turn: true,
    winner: null,
  }),

  methods: {
    isBomb(number) {
      var numberIsBomb = number == this.bomb;
      if (numberIsBomb) {
        this.countDown = 1;
      }
      return numberIsBomb;
    },

    setNewRange(number) {
      if (number > this.bomb) {
        this.max = number;
      } else {
        this.min = number;
      }
    },

    resetRoundState() {
      this.countDown = 10;
    },

    resetGameState() {
      this.resetRoundState();
      this.min = 0;
      this.max = this.initMax;
      this.histories = [];
      this.gameOver = false;
    },

    updateHistoryList(number) {
      this.histories.push({
        number: number,
        min: this.min,
        max: this.max,
      });
    },

    guessNumber(number) {
      if (this.isBomb(number)) {
        return;
      }

      this.setNewRange(number);
      this.updateHistoryList(number);
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

    generateRandomBomb() {
      this.bomb = Math.round(Math.random() * this.max);
    },

    restartGame() {
      this.resetGameState();
      this.generateRandomBomb();
      this.countDownTimer();
    },
  },

  created() {},

  watch: {
    countDown: function (val) {
      if (val == 0) {
        this.gameOver = true;
      }
    },
  },
};
</script>
