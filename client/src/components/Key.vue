<template>
  <v-btn depressed color="primary" small @click="onKeyClicked">
    {{ keyValue }}
  </v-btn>
</template>

<script>
export default {
  name: "Key",
  props: ["keyValue"],

  methods: {
    onKeyClicked() {
      this.$emit("key-click", this.keyValue);
    },
  },
};
</script>
