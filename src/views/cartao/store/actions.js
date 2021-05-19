// cartao
import services from '@/http'
import * as types from './mutation-types'

export const ActionAdicionarCartao = ({ commit }, payload) => {
    return services.cartao.adicionar(payload)
        .then(res => commit(types.SET_CARTOES, [res.body]))
}

export const ActionListarCartoes = ({ commit }, payload) => {
    return services.cartao.listarPorUsuario(payload)
        .then(res => {
            commit(types.SET_CARTOES, res.body)
        })
}

// bandeiras

export const ActionListarBandeiras = ({ commit }, payload) => {
    return services.cartao.listarBandeiras()
        .then(res => commit(types.SET_BANDEIRAS, res.body))
}

//  compra cartao

export const ActionAdicionarCompraCartao = ({ commit }, payload) => {
    return services.cartao.adicionarCompraCartao(payload)
        .then(res => console.log(res))
}
