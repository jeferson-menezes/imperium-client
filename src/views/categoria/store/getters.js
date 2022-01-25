// categoria
export const getCategoriasReceita = ({ categorias }) => categorias.filter(e => e.natureza === 'RECEITA')

export const getCategoriasDespesa = ({ categorias }) => categorias.filter(e => e.natureza === 'DESPESA')