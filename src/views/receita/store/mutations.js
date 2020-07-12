import * as types from './mutation-types'

export default {
    [types.SET_RECEITAS](state, payload) {
        state.receitas = payload
    },
    [types.ADD_RECEITA](state, payload) {
        state.receitas.content.push(payload)
    },
    [types.UPDATE_RECEITA](state, payload) {
        state.receitas.content = [...state.receitas.content.filter(e => e.id !== payload.id), payload]
    },
    [types.REMOVE_RECEITA](state, payload) {
        const index = state.receitas.content.findIndex(c => c.id === payload)
        state.receitas.content.splice(index, 1);
    }
}
