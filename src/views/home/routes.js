export default [
    {
      name: 'home',
      path: '/home',
      meta: { icon: 'mdi-view-dashboard-outline', title: 'Home', show: true },
      component: () => import(/* webpackChunkName: "home" */ './Home')
    }
  ]
  