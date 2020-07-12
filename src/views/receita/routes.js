export default [
    {
      name: 'receita',
      path: '/receita',
      meta: { icon: 'mdi-finance', title: 'receita' },
      component: () => import(/* webpackChunkName: "receita" */ './Receita')
    }
  ]
  