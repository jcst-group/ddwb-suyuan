import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

var state = {
  proName: '',
  batchId: ''
}
var mutations = {
  setProName (state, newToken) {
    state.proName = newToken
  },
  setBatchId (state, newBatchId) {
    state.batchId = newBatchId
  }
}
var actions = {
  setMuProName (context, params) {
    context.commit('setProName', params)
  },
  setMuBatchId (context, params) {
    console.log(params)
    context.commit('setBatchId', params)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
