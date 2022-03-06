<template>
  <v-dialog v-model="show" persistent max-width="290">
    <v-card>
      <v-card-title class="text-h5"> You win! </v-card-title>
      <v-card-text>
        The number bomb is {{ $store.state.bomb }}.
        <br />
        Congratulations!
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="show = false">
          Restart
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Winner",

  props: {
    open: Boolean,
  },

  computed: {
    show: {
      get() {
        return this.open;
      },
      set(open) {
        this.$emit("close", open);
      },
    },
  },
};
</script>
