export default {
    adicionar: { method: 'post', url: 'contas' },
    atualizar: { method: 'put', url: 'contas/{id}' },
    detalhar: { method: 'get', url: 'contas/{id}' },
    alterarSaldo: { method: 'patch', url: 'contas/{id}' },
    inativar: { method: 'patch', url: 'contas/{id}/inativa' },
    listarPorUsuario: { method: 'get', url: 'contas/usuario/{id}' },
    listarTipoContas: { method: 'get', url: 'tipos/conta' },
}
