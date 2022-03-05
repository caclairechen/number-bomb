<template>
  <div class="d-flex flex-column mb-6">
    <v-card class="d-flex pa-2" outlined color="transparent" height="50">
      {{ this.input }}
    </v-card>
    <v-card class="d-flex pa-2" outlined color="transparent" min-width="315">
      <Keyboard v-on:key-click="onKeyClicked" />
    </v-card>
    <v-card
      class="d-flex pa-2"
      outlined
      v-if="invalidNumber"
      height="50"
      color="transparent"
    >
      Please enter another number.
    </v-card>
  </div>
</template>

<script>
import Keyboard from "./Keyboard.vue";

export default {
  name: "NumberInputPanel",
  props: ["min", "max"],

  components: {
    Keyboard,
  },

  data: () => ({
    input: "",
    invalidNumber: false,
  }),

  methods: {
    isInvalidNumber(number) {
      var numberIsInvalid = number > this.max || number < this.min;
      if (numberIsInvalid) {
        this.input = "";
        this.invalidNumber = true;
      }
      return numberIsInvalid;
    },

    onKeyClicked(val) {
      this.invalidNumber = false;
      if (val == "✘") {
        this.input = this.input.slice(0, -1);
      } else if (val == "✔") {
        var num = Number(this.input);
        if (this.isInvalidNumber(num)) {
          return;
        }
        this.$emit("number-guessed", num);
        this.resetProps();
      } else {
        this.input += val;
      }
    },

    resetProps() {
      this.input = "";
      this.invalidNumber = false;
    },
  },
};
</script>
