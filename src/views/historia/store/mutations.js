import * as types from './mutation-types'

export default {
    [types.SET_HISTORIAS](state, payload) {
        state.historias = payload
    },
    [types.ADD_HISTORIAS](state, payload) {
        state.historias.content = [...state.historias.content, ...payload]
    }
}
