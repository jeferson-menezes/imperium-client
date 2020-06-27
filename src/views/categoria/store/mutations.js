// categoria
import * as types from './mutation-types'

export default {
    [types.SET_CATEGORIAS](state, payload) {
        state.categorias = payload
    },
    [types.ADD_CATEGORIA](state, payload) {
        state.categorias.push(payload)
    },
    [types.REMOVE_CATEGORIA](state, payload) {
        const index = state.categorias.findIndex(c => c.id === payload)
        state.categorias.splice(index, 1);
    },
    [types.UPDATE_CATEGORIA](state, payload) {
        state.categorias = [...state.categorias.filter(e => e.id !== payload.id), payload]
    }
}
