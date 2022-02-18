<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" height="200">
        <v-card id="card-1" elevation="4" outlined shaped>
          Avoid this number!
        </v-card>
      </v-col>

      <Range/>
      <Input/>
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
    Input
  },

  data: () => ({
    items: [
      {
        number: 12,
        range: "20 - 56",
      },
      {
        number: 34,
        range: 20 - 56,
      },
      {
        number: 12,
        range: 20 - 56,
      },
      {
        number: 12,
        range: 20 - 56,
      },
      {
        number: 12,
        range: "20 - 56",
      },
    ],
  }),
};
</script>
