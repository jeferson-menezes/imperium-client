export default [
    {
      name: 'receita',
      path: '/receita',
      meta: { icon: 'mdi-finance', title: 'receita', show: true },
      component: () => import(/* webpackChunkName: "receita" */ './Receita')
    }
  ]
  