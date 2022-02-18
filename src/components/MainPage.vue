<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" height="200">
        <v-card id="card-1" elevation="4" outlined shaped v-if="!gameOver">
          Avoid this number!
        </v-card>
        <v-card id="card-1" elevation="4" outlined shaped v-else>
          You lose... The number is {{ this.bomb }}
        </v-card>
      </v-col>

      <Range v-bind:min="min" v-bind:max="max" />
      <Input v-on:guess-a-number="guessNumber" />
      <HistoryList v-bind:historyList="items" />
    </v-row>
  </v-container>
</template>

<script>
import HistoryList from "./HistoryList.vue";
import Range from "./Range.vue";
import Input from "./Input.vue";

export default {
  name: "MainPage",

  components: {
    HistoryList,
    Range,
    Input,
  },

  data: () => ({
    items: [],
    min: 0,
    max: 100,
    bomb: 89,
    gameOver: false,
  }),

  methods: {
    guessNumber(number) {
      if (number == this.bomb) {
        this.gameOver = true;
        return;
      }

      if (number > this.bomb) {
        this.max = number;
      } else {
        this.min = number;
      }

      this.items.push({
        number: number,
        range: `${this.min} - ${this.max}`,
      });
    },
  },
};
</script>
