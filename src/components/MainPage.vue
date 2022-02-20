<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" height="200">
        <v-card id="card-1" elevation="4" outlined shaped>
          {{ countDown }}
        </v-card>
        <v-card id="card-1" elevation="4" outlined shaped v-if="!gameOver">
          Avoid this number!
        </v-card>
        <v-card id="card-1" elevation="4" outlined shaped v-else>
          You lose... The number is {{ this.bomb }}
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
</template>

<script>
import HistoryList from "./HistoryList.vue";
import RangeCard from "./RangeCard.vue";
import Keyboard from "./Keyboard.vue";

export default {
  name: "MainPage",

  components: {
    HistoryList,
    RangeCard,
    Keyboard,
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
        this.gameOver = true;
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

    resetState() {
      this.guess = "";
      this.countDown = 10;
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

      this.resetState();
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
    }
  },

  created() {
    this.countDownTimer();
    this.generateRandomBomb();
  },

  watch: {
    countDown: function (val) {
      if (val == 0) {
        this.gameOver = true;
      }
    },
    gameOver: function (val) {
      if (val) {
        this.counDown = 0;
        this.guess = "";
      }
    },
  },
};
</script>
