import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    isLoading: false,
    noticeDetails: {},
    paperworkDetails: {}
  },
  mutations: {
    updateLoadingStatus (state, data) {
      setTimeout(() => {
        state.isLoading = data
      }, 3000)
    },
    noticeDetail (state, data) {
      state.noticeDetails = data
    },
    paperworkDetail (state, data) {
      state.paperworkDetails = data
    }
  },
  getters: {
    token: (state) => {
      return state.token
    },
    noticeDetails: state => {
      return state.noticeDetails
    },
    paperworkDetails: state => {
      return state.paperworkDetails
    }
  }
})
