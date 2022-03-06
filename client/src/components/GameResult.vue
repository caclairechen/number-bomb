<template>
  <v-dialog v-model="open" persistent max-width="290">
    <v-card>
      <v-card-title class="text-h5"> {{ title }} </v-card-title>
      <v-card-text>
        The number bomb is {{ $store.state.bomb }}.
        <br />
        {{ msg }}
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue darken-1" text @click="closeDialog"> Restart </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog"> Quit </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "GameOver",
  props: ["open", "title", "msg"],

  methods: {
    closeDialog() {
      this.open = false;
    },
  },
};
</script>
