
import '../fatura/Faturas.vue'
export default [
  {
    name: 'cartao',
    path: '/cartao',
    meta: { icon: 'mdi-credit-card-multiple-outline ', title: 'Cartao', show: true },
    component: () => import(/* webpackChunkName: "cartao" */ './Cartao'),
    children: [
      {
        name: 'faturas',
        path: ':id/faturas',
        meta: { icon: 'mdi-credit-card-multiple-outline ', title: 'Faturas', show:  false},
        component: () => import(/* webpackChunkName: "faturas" */ '../fatura/Faturas.vue'),
      }
    ]
  }
]
