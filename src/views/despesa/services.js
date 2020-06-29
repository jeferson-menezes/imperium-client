export default {
    adicionar: { method: 'post', url: 'despesa' },
    atualizar: { method: 'put', url: 'despesa/{id}' },
    detalhar: { method: 'get', url: 'despesa/{id}' },
    inativar: { method: 'patch', url: 'despesa/{id}/inativa' },
    excluir: { method: 'delete', url: 'despesa/{id}' },
}
