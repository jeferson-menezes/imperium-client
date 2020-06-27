import * as types from './mutation-types'

export default {
    [types.SET_CONTAS](state, payload) {
        state.contas = payload
    },
    [types.SET_TIPOS_CONTAS](state, payload) {
        state.tiposConta = payload
    },
    [types.ADD_CONTA](state, payload) {
        state.contas.push(payload)
    }
}
