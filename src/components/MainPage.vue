<template>
  <div>
    <div v-show="!gameStarted">
      <v-container class="grey lighten-5">
        <v-row class="mb-6" no-gutters>
          <v-col cols="4">
            <v-card class="pa-2" outlined color="transparent">
              <div class="my-4 text-subtitle-1">Number of Players</div>
            </v-card>
          </v-col>
          <v-col md="4" offset-md="4">
            <v-card class="pa-2" outlined color="transparent">
              <v-radio-group v-model="numPlayer" row mandatory>
                <v-radio label="1" value="1"></v-radio>
                <v-radio label="2" value="2"></v-radio>
                <v-radio label="3" value="3"></v-radio>
                <v-radio label="4" value="4"></v-radio>
                <v-radio label="5" value="5"></v-radio>
                <v-radio label="6" value="6"></v-radio>
              </v-radio-group>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="mb-6" no-gutters>
          <v-col cols="4">
            <v-card class="pa-2" outlined color="transparent">
              <div class="my-4 text-subtitle-1">Max Number</div>
            </v-card>
          </v-col>
          <v-col md="4" offset-md="4">
            <v-card class="pa-2" outlined color="transparent">
              <v-radio-group v-model="maxNum" row mandatory>
                <v-radio label="100" value="100"></v-radio>
                <v-radio label="200" value="200"></v-radio>
                <v-radio label="300" value="300"></v-radio>
                <v-radio label="400" value="400"></v-radio>
                <v-radio label="500" value="500"></v-radio>
                <v-radio label="600" value="600"></v-radio>
              </v-radio-group>
            </v-card>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col md="6" offset-md="3">
            <v-card class="pa-2" outlined color="transparent">
              <div class="text-center">
                <v-btn rounded color="primary" dark x-large @click="startGame">
                  Start Game
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div v-show="gameStarted">
      <Playground
        ref="playground"
        v-bind:numPlayer="numPlayer"
        v-bind:initMax="maxNum"
      />
    </div>
  </div>
</template>

<script>
import Playground from "./Playground.vue";

export default {
  name: "MainPage",

  components: {
    Playground,
  },

  data() {
    return {
      numPlayer: 1,
      maxNum: 100,
      gameStarted: false,
    };
  },

  methods: {
    startGame() {
      this.gameStarted = true;
      this.$refs.playground.restartGame();
    },
  },
};
</script>
