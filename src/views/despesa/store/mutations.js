import * as types from './mutation-types'

export default {
    [types.SET_DESPESAS](state, payload) {
        state.despesas = payload
    },
    [types.ADD_DESPESA](state, payload) {
        state.despesas.push(payload)
    },
    [types.UPDATE_DESPESA](state, payload) {
        state.despesas = [...state.despesas.filter(e => e.id !== payload.id), payload]
    },
    [types.REMOVE_DESPESA](state, payload) {
        const index = state.despesas.findIndex(c => c.id === payload)
        state.despesas.splice(index, 1);
    }
}
