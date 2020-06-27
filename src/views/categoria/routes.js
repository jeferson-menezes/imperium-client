// categoria
export default [
    {
      name: 'categoria',
      path: '/categoria',
      meta: { icon: 'mdi-shape-outline', title: 'Categoria' },
      component: () => import(/* webpackChunkName: "categoria" */ './Categoria')
    }
  ]
  