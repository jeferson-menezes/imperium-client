import services from '@/http'
import * as types from './mutation-types'

export const ActionAdicionarTransferencia = ({ commit }, payload) => {
    return services.transferencia.adicionar(payload)
        .then(res => commit(types.ADD_TRANSFERENCIA, res.data))
}

export const ActionListarTransferenciasPorUsuario = ({ commit }, payload) => {
    return services.transferencia.listarPorUsuario(payload)
        .then(res => commit(types.SET_TRANSFERENCIAS, res.data))
}