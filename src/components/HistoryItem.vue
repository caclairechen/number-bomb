<template>
  <v-card class="mx-auto" max-width="344" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5 mb-1">
          Number: {{ historyItem.number }}
        </v-list-item-title>
        <v-list-item-subtitle
          >Range: {{ historyItem.min }} - {{historyItem.max}} </v-list-item-subtitle
        >
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>
<script>
export default {
  name: "HistoryItem",

  props: ["historyItem"],

  components: {},

  data: () => ({}),
};
</script>
