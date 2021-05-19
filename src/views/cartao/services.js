export default {
    adicionar: { method: 'post', url: 'cartoes' },  
    adicionarCompraCartao: { method: 'post', url: 'compras/cartao' },  
    detalhar: { method: 'get', url: 'cartoes/{id}' },
    listarPorUsuario: { method: 'get', url: 'cartoes/usuario/{id}' },
    listarBandeiras: { method: 'get', url: 'bandeiras' },
   
}
