import services from '@/http'
import * as types from './mutation-types'

export const ActionListarPorUsuario = ({ commit }, payload) => {
    return services.conta.listarPorUsuario(payload)
        .then(res => commit(types.SET_CONTAS, res.body))
}

export const ActionListarTipoContas = ({ commit }, payload) => {
    return services.conta.listarTipoContas()
        .then(res => commit(types.SET_TIPOS_CONTAS, res.data))
}

export const ActionAdicionarConta = ({ commit }, payload) => {
    return services.conta.adicionar(payload)
        .then(res => {
            console.log(res);

            commit(types.ADD_CONTA, res.data)
        })
}