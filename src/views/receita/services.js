export default {
    adicionar: { method: 'post', url: 'receitas' },
    atualizar: { method: 'put', url: 'receitas/{id}' },
    finaliza: { method: 'patch', url: 'receitas/{id}/finaliza' },
    alterarConta: { method: 'patch', url: 'receitas/{id}/altera/conta' },
    alterarValor: { method: 'patch', url: 'receitas/{id}/altera/valor' },
    excluir: { method: 'delete', url: 'receitas/{id}' },
    detalhar: { method: 'get', url: 'receitas/{id}' },
    listar: { method: 'get', url: 'receitas/usuario/{id}?page={page}&size={size}' },
    listarPorData: { method: 'get', url: 'receitas/filtra/usuario/{id}/data/{data}' },
    listarPorDescricao: { method: 'get', url: 'receitas/filtra/usuario/{id}/descricao/{descricao}' },
    listarPorMes: { method: 'get', url: 'receitas/filtra/usuario/{id}/mes/{mes}' },
}
