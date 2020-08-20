const SIGNIN = 'SIGNIN'
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const SETBALANCE = 'SETBALANCE'
const CANCEL = 'CANCEL'
const SETCARDIIID = 'SETCARDIIID'

const SET_TOKEN = 'SET_TOKEN'


export default {

  [SET_TOKEN](state, token) {
    state.token = token;
    localStorage.setItem("token", token)
  },

  [SIGNIN](state, signinData) {
    state.login = true;
    state.userInfo = signinData.data.user;
    sessionStorage.setItem("userInfo", JSON.stringify(signinData.data.user));
    state.card_I = signinData.data.card_I;
    state.card_II = signinData.data.card_II;
  },

  [LOGIN](state, loginData) {
    state.login = true;
    state.userInfo = loginData.data.user;
    sessionStorage.setItem("userInfo", JSON.stringify(loginData.data.user));
    state.card_I = loginData.data.card_I;
    state.card_II = loginData.data.card_II;
  },

  [LOGOUT](state) {
    state.login = false
    state.card_I = null
    state.card_II = null
    state.token = ''
    state.userInfo = {}
    localStorage.setItem("token", '')
    sessionStorage.setItem("userInfo", JSON.stringify(''))
  },


  [SETBALANCE](state, balanceData) {
    state.card_I = balanceData.data.card_I;
    state.card_II = balanceData.data.card_II;
  },

  [CANCEL](state, card_II_id) {
    state.card_II_id = card_II_id;
  },


}
