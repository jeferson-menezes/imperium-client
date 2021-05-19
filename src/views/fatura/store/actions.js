// faturas
import services from '@/http'
import * as types from './mutation-types'


export const ActionListarFaturas = ({ commit }, payload) => {
    return services.fatura.listar(payload)
        .then(res => commit(types.SET_FATURAS, res.body))
}

export const ActionDetalharFatura = ({ commit }, payload) => {
    return services.fatura.detalhar(payload)
        .then(res => commit(types.SET_FATURA_ATUAL, res.body))
}

export const ActionTotaisFatura = ({ commit }, payload) => {
    return services.fatura.totais(payload)
        .then(res=> console.log(res.body))
}