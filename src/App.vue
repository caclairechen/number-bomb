<template>
  <v-app>
    <v-app-bar app>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/bomb.png"
          transition="scale-transition"
          width="40"
        />
        <v-toolbar-title> NUMBER BOMB </v-toolbar-title>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/caclairechen/number-bomb"
        target="_blank"
        text
      >
        <span class="mr-2">Source</span>
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/github.png"
          transition="scale-transition"
          width="40"
        />
      </v-btn>
    </v-app-bar>

    <v-main>
      <MainPage />
    </v-main>
  </v-app>
</template>

<script>
import MainPage from "./components/MainPage";
import SocketioService from "./services/socketio.service";

export default {
  name: "App",

  components: {
    MainPage,
  },

  created() {
    SocketioService.setupSocketConnection();
  },

  beforeUnmount() {
    SocketioService.disconnect();
  },
};
</script>
