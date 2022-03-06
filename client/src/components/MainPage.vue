<template>
  <div>
    <div v-show="!ready">
      <v-container class="grey lighten-5">
        <v-row class="mb-6" no-gutters>
          <v-col cols="4">
            <v-card class="pa-2" outlined color="transparent">
              <div class="my-4 text-subtitle-1">Number of Players</div>
            </v-card>
          </v-col>
          <v-col md="4" offset-md="4">
            <v-card class="pa-2" outlined color="transparent">
              <v-radio-group v-model="roomCapacity" row mandatory>
                <v-radio label="1" value="1"></v-radio>
                <v-radio label="2" value="2"></v-radio>
                <v-radio label="3" value="3"></v-radio>
                <v-radio label="4" value="4"></v-radio>
                <v-radio label="5" value="5"></v-radio>
                <v-radio label="6" value="6"></v-radio>
              </v-radio-group>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="mb-6" no-gutters>
          <v-col cols="4">
            <v-card class="pa-2" outlined color="transparent">
              <div class="my-4 text-subtitle-1">Max Number</div>
            </v-card>
          </v-col>
          <v-col md="4" offset-md="4">
            <v-card class="pa-2" outlined color="transparent">
              <v-radio-group v-model="maxNum" row mandatory>
                <v-radio label="100" value="100"></v-radio>
                <v-radio label="200" value="200"></v-radio>
                <v-radio label="300" value="300"></v-radio>
                <v-radio label="400" value="400"></v-radio>
                <v-radio label="500" value="500"></v-radio>
                <v-radio label="600" value="600"></v-radio>
              </v-radio-group>
            </v-card>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col md="6" offset-md="3">
            <v-card class="pa-2" outlined color="transparent">
              <div class="text-center">
                <v-btn
                  rounded
                  color="primary"
                  dark
                  x-large
                  @click="buttonClicked"
                >
                  {{ this.buttonTxt }}
                </v-btn>
              </div>
            </v-card>
          </v-col>
          <v-col md="6" offset-md="3">
            <v-card class="pa-2" outlined color="transparent">
              <v-text-field
                v-model="roomNumber"
                label="Room Number"
              ></v-text-field>
              <div class="text-center">
                <v-btn rounded color="primary" dark x-large @click="joinRoom">
                  Join A Room
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div v-show="ready">
      <WaitRoom ref="WaitRoom" />
    </div>
  </div>
</template>

<script>
import WaitRoom from "./WaitRoom.vue";
import SocketioService from "../services/socketio.service";

export default {
  name: "MainPage",

  components: {
    WaitRoom,
  },

  data() {
    return {
      roomCapacity: 1,
      maxNum: 100,
      ready: false,
      text: "",
      roomNumber: "",
    };
  },

  computed: {
    buttonTxt: function () {
      if (this.roomCapacity == 1) {
        return "Start Game";
      } else {
        return "Create Room";
      }
    },
  },

  methods: {
    readyToJoin() {
      this.ready = true;
      this.$store.commit("setPlayerName", SocketioService.socket.id);
    },

    buttonClicked() {
      this.readyToJoin();
      this.$store.commit("setRoomCapacity", this.roomCapacity);
      this.$store.commit("setMaxRange", this.maxNum);
      var roomNum = Math.random().toString(36).substr(2, 4);
      SocketioService.createRoom(
        roomNum,
        this.roomCapacity,
        this.maxNum,
        this.$store.state.playerName
      );
      this.$store.commit("setRoomNum", roomNum);
      this.$store.commit("setPlayers", [this.$store.state.playerName]);
    },

    joinRoom() {
      this.readyToJoin();
      this.$store.commit("setRoomNum", this.roomNumber);
      SocketioService.joinRoom(this.$store.state.roomNum);
    },
  },

  created() {},
};
</script>
