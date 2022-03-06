<template>
  <div>
    <div v-show="!startGame">waiting....</div>
    <div v-show="startGame">
      <Playground ref="playground" />
    </div>
  </div>
</template>

<script>
import Playground from "./Playground.vue";

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
    isFullRoom: function () {
      return this.$store.getters.fullRoom;
    },
  },

  methods: {
    startTheGame() {
      this.startGame = true;
      this.$refs.playground.restartGame();
    },
  },

  created() {},

  watch: {
    isFullRoom: function (val) {
      if (val) {
        this.startTheGame();
      }
    },
  },
};
</script>
