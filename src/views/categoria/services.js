// categoria
export default {
    adicionar: { method: 'post', url: 'categorias' },
    listar: { method: 'get', url: 'categorias' },
    excluir: { method: 'delete', url: 'categorias/{id}' },
    atualizar: { method: 'put', url: 'categorias/{id}' },
    inativar: { method: 'patch', url: 'categorias/{id}/inativa' },
    listarPorNatureza: { method: 'get', url: 'categorias/natureza/{natureza}' },
}
