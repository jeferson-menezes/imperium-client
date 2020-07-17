import * as types from './mutation-types'

export default {
    [types.SET_DESPESAS_MES](state, payload) {
        state.despesasMes = payload
    },
    [types.SET_RECEITAS_MES](state, payload) {
        state.receitasMes = payload
    },

}
