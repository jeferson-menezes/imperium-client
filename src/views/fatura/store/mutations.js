// faturas
import * as types from './mutation-types'

export default {
    
    [types.SET_FATURAS](state, payload) {
        state.faturas = payload
    },

    [types.SET_FATURA_ATUAL](state, payload) {
        state.faturaAtual = payload
    }
}
