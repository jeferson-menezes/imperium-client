export default {
    adicionar: { method: 'post', url: 'despesas' },
    atualizar: { method: 'put', url: 'despesas/{id}' },
    detalhar: { method: 'get', url: 'despesas/{id}' },
    inativar: { method: 'patch', url: 'despesas/{id}/inativa' },
    excluir: { method: 'delete', url: 'despesas/{id}' },
    listar: { method: 'get', url: 'despesas/usuario/{id}?page={page}&size={size}' },
    finaliza: { method: 'patch', url: 'despesas/{id}/finaliza' },
    alterarConta: { method: 'patch', url: 'despesas/{id}/altera/conta' },
    alterarValor: { method: 'patch', url: 'despesas/{id}/altera/valor' },
    listarPorData: { method: 'get', url: 'despesas/filtra/usuario/{id}/data/{data}' },
    listarPorDescricao: { method: 'get', url: 'despesas/filtra/usuario/{id}/descricao/{descricao}' },
    listarPorMes: { method: 'get', url: 'despesas/filtra/usuario/{id}/mes/{mes}' }
}
