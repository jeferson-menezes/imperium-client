export default [
    {
      name: 'despesa',
      path: '/despesa',
      meta: { icon: 'mdi-cart-arrow-down', title: 'Despesa' },
      component: () => import(/* webpackChunkName: "despesa" */ './Despesa')
    }
  ]
  