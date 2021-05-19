export default {
    listar: { method: 'get', url: 'faturas/cartao/{id}' },
    detalhar: { method: 'get', url: 'faturas/{id}' },
    totais: { method: 'get', url: 'faturas/totais/cartao/{id}' },
}