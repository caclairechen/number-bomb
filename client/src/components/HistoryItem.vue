<template>
  <v-card class="mx-auto" outlined>
    <v-card-text>
      <div class="text--primary">
        <v-row align-content="space-between">
          <v-col>Number: {{ historyItem.number }}</v-col>
          <v-col>Range: {{ historyItem.min }} - {{ historyItem.max }}</v-col>
          <v-col>Player: {{ historyItem.player }}</v-col>
        </v-row>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "HistoryItem",
  props: ["historyItem"],
};
</script>
