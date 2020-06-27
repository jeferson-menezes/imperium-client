export default {
    adicionar: { method: 'post', url: 'contas' },
    listarPorUsuario: { method: 'get', url: 'contas/usuario/{id}'},
    listarTipoContas: { method: 'get', url: 'tipos/conta'}
}
