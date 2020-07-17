import services from '@/http'
import * as types from './mutation-types'

export const ActionListarDespesasPorMes = ({ commit }, payload) => {
    return services.home.listarDespesasMes(payload)
        .then(res => commit(types.SET_DESPESAS_MES, res.data))
}


export const ActionListarReceitasPorMes = ({ commit }, payload) => {
    return services.home.listarReceitasMes(payload)
        .then(res => commit(types.SET_RECEITAS_MES, res.data))
}