import App from '../App'

export default [{
  path: '/',
  component: App,
  children: [{
    path: '/home',
    component: r => require.ensure([], () => r(require('../page/home')), 'home')
  }, {
    path: '/signin',
    component: r => require.ensure([], () => r(require('../page/signin')), 'signin')
  }, {
    path: '/signinsucc',
    component: r => require.ensure([], () => r(require('../page/signinsucc')), 'signinsucc')
  }, {
    path: '/login',
    component: r => require.ensure([], () => r(require('../page/login')), 'login')
  }, {
    path: '/recharge',
    component: r => require.ensure([], () => r(require('../page/recharge')), 'recharge')
  }, {
    path: '/rechargesucc',
    component: r => require.ensure([], () => r(require('../page/rechargesucc')), 'rechargesucc')
  }, {
    path: '/withdraw',
    component: r => require.ensure([], () => r(require('../page/withdraw')), 'withdraw')
  }, {
    path: '/withdrawsucc',
    component: r => require.ensure([], () => r(require('../page/withdrawsucc')), 'withdrawsucc')
  }, {
    path: '/cancel',
    component: r => require.ensure([], () => r(require('../page/cancel')), 'cancel')
  }, {
    path: '/cancelsucc',
    component: r => require.ensure([], () => r(require('../page/cancelsucc')), 'cancelsucc')
  }, {
    path: '/reset',
    component: r => require.ensure([], () => r(require('../page/reset')), 'reset')
  }, {
    path: '/resetsucc',
    component: r => require.ensure([], () => r(require('../page/resetsucc')), 'resetsucc')
  }


  ]
}]
