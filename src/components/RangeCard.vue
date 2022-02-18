<template>
  <v-card class="mx-auto" width="200" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5 mb-1">
          {{ num }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  name: "RangeCard",

  props: ["num"],

  components: {},

  data: () => ({}),
};
</script>
