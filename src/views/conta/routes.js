export default [
    {
      name: 'conta',
      path: '/conta',
      meta: { icon: 'mdi-bank-outline', title: 'Conta' },
      component: () => import(/* webpackChunkName: "conta" */ './Conta')
    }
  ]
  