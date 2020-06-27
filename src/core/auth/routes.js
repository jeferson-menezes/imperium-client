export default [
    {
      name: 'login',
      path: '/',
      meta: { icon: 'login', title: 'Login' },
      component: () => import(/* webpackChunkName: "login" */ './Login')
    }
  ]
  