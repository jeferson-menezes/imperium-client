export default [
  {
    name: 'conta',
    path: '/conta',
    meta: { icon: 'mdi-bank-outline', title: 'Conta', show: true },
    component: () => import(/* webpackChunkName: "conta" */ './Conta')
  },
  {
    name: 'conta-detalhe',
    path: '/conta/:id/detalhe',
    meta: { icon: 'mdi-bank-outline', title: 'Conta Detalhes', show: false },
    component: () => import(/* webpackChunkName: "conta-detalhe" */ './ContaDetalhe')
  }
]
