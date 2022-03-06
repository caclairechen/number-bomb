import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    roomCapacity: 1,
    maxRange: 100,
    bomb: 0,
    playerName: "",
    roomNum: "",
    players: [],
  },
  getters: {},
  mutations: {
    setRoomCapacity(state, val) {
      state.roomCapacity = Number(val);
    },
    setMaxRange(state, val) {
      state.maxRange = Number(val);
    },
    setBomb(state, val) {
      state.bomb = val;
    },
    setPlayerName(state, val) {
      state.playerName = val;
    },
    setRoomNum(state, val) {
      state.roomNum = val;
    },
    setPlayers(state, val) {
      state.players = val;
    },
  },
  actions: {},
});
