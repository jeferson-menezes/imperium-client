import * as types from './mutation-types'

export default {
    [types.SET_DESPESAS](state, payload) {
        state.despesas = payload
    },
    [types.ADD_DESPESA](state, payload) {
        state.despesas.content.push(payload)
    },
    [types.UPDATE_DESPESA](state, payload) {
        state.despesas.content = [...state.despesas.content.filter(e => e.id !== payload.id), payload]
    },
    [types.REMOVE_DESPESA](state, payload) {
        const index = state.despesas.content.findIndex(c => c.id === payload)
        state.despesas.content.splice(index, 1);
    }
}
