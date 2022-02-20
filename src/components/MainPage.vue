<template>
  <div>
    <v-container>
      <v-row class="text-center">
        <v-col cols="12" height="200">
          <v-card id="card-1" elevation="4" outlined shaped>
            {{ countDown }}
          </v-card>
        </v-col>
        <v-card class="d-flex justify-space-around mb-6" flat tile>
          <RangeCard v-bind:num="min" />
        </v-card>
        <v-card class="d-flex justify-space-around mb-6" flat tile width="500">
          <div class="d-flex flex-column mb-6">
            <v-card class="d-flex pa-2" outlined tile height="50">
              {{ this.guess }}
            </v-card>
            <v-card class="d-flex pa-2" outlined tile>
              <Keyboard v-on:key-click="onKeyClicked" />
            </v-card>
            <v-card
              class="d-flex pa-2"
              outlined
              tile
              v-if="invalidNumber"
              height="50"
            >
              Please enter another number.
            </v-card>
          </div>
        </v-card>

        <v-card class="d-flex justify-space-around mb-6" flat tile>
          <RangeCard v-bind:num="max" />
        </v-card>

        <HistoryList v-bind:historyList="histories" />
      </v-row>
    </v-container>
    <GameOver v-bind:bomb="bomb" v-bind:open="gameOver" @close="restartGame"/>
  </div>
</template>

<script>
import HistoryList from "./HistoryList.vue";
import RangeCard from "./RangeCard.vue";
import Keyboard from "./Keyboard.vue";
import GameOver from "./GameOver.vue";

export default {
  name: "MainPage",

  components: {
    HistoryList,
    RangeCard,
    Keyboard,
    GameOver,
  },

  data: () => ({
    histories: [],
    min: 0,
    max: 100,
    bomb: 0,
    gameOver: false,
    invalidNumber: false,
    countDown: 10,
    guess: "",
  }),

  methods: {
    isInvalidNumber(number) {
      var numberIsInvalid = number > this.max || number < this.min;
      if (numberIsInvalid) {
        this.guess = "";
        this.invalidNumber = true;
      }
      return numberIsInvalid;
    },

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
      this.guess = "";
      this.countDown = 10;
    },

    resetGameState() {
      this.resetRoundState();
      this.min = 0;
      this.max = 100;
      this.histories = [];
      this.gameOver = false;
      this.invalidNumber = false
    },

    updateHistoryList(number) {
      this.histories.push({
        number: number,
        min: this.min,
        max: this.max,
      });
    },

    guessNumber(number) {
      if (this.isInvalidNumber(number) || this.isBomb(number)) {
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

    onKeyClicked(val) {
      this.invalidNumber = false;
      if (val == "X") {
        this.guess = this.guess.slice(0, -1);
      } else if (val == "V") {
        this.guessNumber(Number(this.guess));
      } else {
        this.guess += val;
      }
    },

    generateRandomBomb() {
      this.bomb = Math.round(Math.random() * this.max);
    },

    restartGame() {
      this.resetGameState();
      this.generateRandomBomb();
      this.countDownTimer();
    }
  },

  created() {
    this.restartGame();
  },

  watch: {
    countDown: function (val) {
      if (val == 0) {
        this.gameOver = true;
      }
    },
  },
};
</script>
