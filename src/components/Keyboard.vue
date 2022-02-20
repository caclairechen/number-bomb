<template>
  <div>
    <v-row align="center" justify="space-around">
      <Key v-bind:keyValue="1" v-on:key-click="onKeyClicked" />
      <Key v-bind:keyValue="2" v-on:key-click="onKeyClicked" />
      <Key v-bind:keyValue="3" v-on:key-click="onKeyClicked" />
      <Key v-bind:keyValue="4" v-on:key-click="onKeyClicked" />
      <Key v-bind:keyValue="5" v-on:key-click="onKeyClicked" />
      <Key v-bind:keyValue="'X'" v-on:key-click="onKeyClicked" />
    </v-row>
    <v-row align="center" justify="space-around">
      <Key v-bind:keyValue="6" v-on:key-click="onKeyClicked" />
      <Key v-bind:keyValue="7" v-on:key-click="onKeyClicked" />
      <Key v-bind:keyValue="8" v-on:key-click="onKeyClicked" />
      <Key v-bind:keyValue="9" v-on:key-click="onKeyClicked" />
      <Key v-bind:keyValue="0" v-on:key-click="onKeyClicked" />
      <Key v-bind:keyValue="'V'" v-on:key-click="onKeyClicked" />
    </v-row>
  </div>
</template>

<script>
import Key from "./Key.vue";

export default {
  name: "Keyboard",

  props: [""],

  components: {
    Key,
  },

  data: () => ({}),

  methods: {
    onKeyClicked(val) {
      this.$emit("key-click", val);
    },
  },
};
</script>
