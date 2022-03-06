<template>
  <v-col class="mb-5" cols="12">
    <v-list three-line>
      <v-subheader>History Guesses</v-subheader>
      <v-col v-for="item in historyList.slice().reverse()" v-bind:key="item.id">
        <HistoryItem v-bind:historyItem="item" />
      </v-col>
    </v-list>
  </v-col>
</template>

<script>
import HistoryItem from "./HistoryItem.vue"

export default {
  name: "HistoryList",
  props: ["historyList"],

  components: {
    HistoryItem,
  },
};
</script>
