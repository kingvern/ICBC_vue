import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import fetch from '../config/fetch'


Vue.use(Vuex)

const state = {
  login: false,

  token:'',

  userInfo: JSON.parse(sessionStorage.getItem("userInfo")),


  card_I: {
    "balance": 0,
    "outflow_in_week": 0,
    "inflow_in_week": 0,
    "card_id": ''
  },

  card_II: {
    "balance": 0,
    "outflow_in_week": 0,
    "inflow_in_week": 0,
    "card_id": ''
  },

  card_II_id: '',
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})
