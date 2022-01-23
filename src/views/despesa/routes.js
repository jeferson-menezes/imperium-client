export default [
    {
      name: 'despesa',
      path: '/despesa',
      meta: { icon: 'mdi-cart-arrow-down', title: 'Despesa', show: true },
      component: () => import(/* webpackChunkName: "despesa" */ './Despesa')
    }
  ]
  