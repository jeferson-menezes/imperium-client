// conta
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
    },
    [types.UPDATE_CONTA](state, payload) {
        state.contas = [...state.contas.filter(e => e.id !== payload.id), payload]
    },
    [types.REMOVE_CONTA](state, payload) {
        const index = state.contas.findIndex(c => c.id === payload)
        state.contas.splice(index, 1);
    }
}
