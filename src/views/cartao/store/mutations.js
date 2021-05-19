// categoria
import * as types from './mutation-types'

export default {
    [types.SET_CARTOES](state, payload) {
        state.cartoes = payload
    },

    [types.SET_BANDEIRAS](state, payload) {
        state.bandeiras = payload
    }
}
