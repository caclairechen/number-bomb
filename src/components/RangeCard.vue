<template>
  <v-list-item three-line align="center">
    <v-list-item-content>
      <v-list-item-title class="text-h5 mb-1">
        {{ num }}
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "RangeCard",
  props: ["num"],
};
</script>
