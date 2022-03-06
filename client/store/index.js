import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    numPlayer: 0,
    roomCapacity: 1,
    maxRange: 100,
  },
  getters: {
    fullRoom: (state) => state.numPlayer === state.roomCapacity,
  },
  mutations: {
    setRoomCapacity(state, val) {
      state.roomCapacity = Number(val);
    },
    setMaxRange(state, val) {
      state.maxRange = Number(val);
    },
    addNumPlayer(state) {
      state.numPlayer += 1;
    },
  },
  actions: {
    newUserJoined({ commit }) {
      commit("addNumPlayer");
    },
  },
});
