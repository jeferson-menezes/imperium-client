import * as types from './mutation-types'

export default {
    [types.SET_TRANSFERENCIAS](state, payload) {
        state.transferencias = payload
    },
    [types.ADD_TRANSFERENCIA](state, payload) {
        state.transferencias.content.push(payload)
    }
}
