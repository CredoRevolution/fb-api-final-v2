import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    FbData: [],
    FbPosts: [],
    InstData: null,
    InstPosts: [],
    FbBusines: null,
    FbBusinesPosts: null,
    InstCode: null,
    InstBusines: null,
    InstBusinesData: null,
  },
  getters: {
    getFbData: (state) => state.FbData,
    getFbPosts: (state) => state.FbPosts,
    getInstData: (state) => state.InstData,
    getInstPosts: (state) => state.InstPosts,
    getFbBusines: (state) => state.FbBusines,
    getInstCode: (state) => state.InstCode,

    getFbBusinesPosts: (state) => state.FbBusinesPosts,

    getInstBusines: (state) => state.InstBusines,
    getInstBusinesData: (state) => state.InstBusinesData,
  },
  mutations: {
    setFbData(state, data) {
      state.FbData = data
    },
    setInstData(state, data) {
      state.InstData = data
    },
    setFbPosts(state, data) {
      state.FbPosts = data
    },
    setInstPosts(state, data) {
      state.InstPosts = data
    },
    setFbBusines(state, data) {
      state.FbBusines = data
    },
    setFbBusinesPosts(state, data) {
      state.FbBusinesPosts = data
    },
    setInstCode(state, data) {
      state.InstCode = data
    },
    setInstBusines(state, data) {
      state.InstBusines = data
    },
    setInstBusinesData(state, data) {
      state.InstBusinesData = data
    },
  },
  actions: {},
})
