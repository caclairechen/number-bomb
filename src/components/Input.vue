<template>
  <div>
    <v-text-field
      label="Guess a number"
      hide-details="auto"
      :value="number"
      @input="updateInput"
      @keydown.enter="confirmInput"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  name: "Input",

  props: [""],

  components: {},

  data: () => ({
    number: 0,
  }),

  methods: {
    updateInput(number) {
      this.number = number;
    },
    confirmInput() {
      this.$emit("guess-a-number", this.number);
      this.number = 0;
    },
  },
};
</script>
