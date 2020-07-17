import services from '@/http'
import * as types from './mutation-types'


export const ActionAdicionarDespesa = ({ commit }, payload) => {
    return services.despesa.adicionar(payload)
        .then(res => commit(types.ADD_DESPESA, res.data))
}

export const ActionListarDespesas = ({ commit }, payload) => {
    return services.despesa.listar(payload)
        .then(res => commit(types.SET_DESPESAS, res.data))
}

export const ActionDetalharDespesa = ({ commit }, payload) => {
    return services.despesa.detalhar(payload)
}

export const ActionAtualizarDespesa = ({ commit }, payload) => {
    return services.despesa.atualizar({ id: payload.id }, payload)
        .then(res => commit(types.UPDATE_DESPESA, res.data))
}

export const ActionFinalizarDespesa = ({ commit }, payload) => {
    return services.despesa.finaliza(payload, "")
        .then(res => commit(types.UPDATE_DESPESA, res.data))
}

export const ActionAlterarConta = ({ commit }, payload) => {
    return services.despesa.alterarConta({ id: payload.id }, payload)
        .then(res => commit(types.UPDATE_DESPESA, res.data))
}

export const ActionAlterarValor = ({ commit }, payload) => {
    return services.despesa.alterarValor({ id: payload.id }, payload)
        .then(res => commit(types.UPDATE_DESPESA, res.data))
}

export const ActionExcluirDespesa = ({ commit }, payload) => {
    return services.despesa.excluir(payload)
        .then(res => commit(types.REMOVE_DESPESA, payload.id))
}

export const ActionListarPorData = ({ commit }, payload) => {
    return services.despesa.listarPorData(payload)
        .then(res => commit(types.SET_DESPESAS, res.data))
}

export const ActionListarPorDescricao = ({ commit }, payload) => {
    return services.despesa.listarPorDescricao(payload)
        .then(res => commit(types.SET_DESPESAS, res.data))
}

export const ActionFiltrarPorMes = ({ commit }, payload) => {
    return services.despesa.filtrarPorMes(payload)
        .then(res => commit(types.SET_DESPESAS, res.data))
}