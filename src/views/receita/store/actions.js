import services from '@/http'
import * as types from './mutation-types'


export const ActionAdicionarReceita = ({ commit }, payload) => {
    return services.receita.adicionar(payload)
        // .then(res => commit(types.ADD_RECEITA, res.data))
}

export const ActionListarReceitas = ({ commit }, payload) => {
    return services.receita.listar(payload)
        .then(res => commit(types.SET_RECEITAS, res.data))
}

export const ActionDetalharReceita = ({ commit }, payload) => {
    return services.receita.detalhar(payload)
}

export const ActionAtualizarReceita = ({ commit }, payload) => {
    return services.receita.atualizar({ id: payload.id }, payload)
        .then(res => commit(types.UPDATE_RECEITA, res.data))
}

export const ActionFinalizarReceita = ({ commit }, payload) => {
    return services.receita.finaliza(payload, "")
        .then(res => commit(types.UPDATE_RECEITA, res.data))
}

export const ActionAlterarConta = ({ commit }, payload) => {
    return services.receita.alterarConta({ id: payload.id }, payload)
        .then(res => commit(types.UPDATE_RECEITA, res.data))
}

export const ActionAlterarValor = ({ commit }, payload) => {
    return services.receita.alterarValor({ id: payload.id }, payload)
        .then(res => commit(types.UPDATE_RECEITA, res.data))
}

export const ActionExcluirReceita = ({ commit }, payload) => {
    return services.receita.excluir(payload)
        .then(res => commit(types.REMOVE_RECEITA, payload.id))
}

export const ActionListarPorData = ({ commit }, payload) => {
    return services.receita.listarPorData(payload)
        .then(res => commit(types.SET_RECEITAS, res.data))
}

export const ActionListarPorDescricao = ({ commit }, payload) => {
    return services.receita.listarPorDescricao(payload)
        .then(res => commit(types.SET_RECEITAS, res.data))
}

export const ActionListarPorMes = ({ commit }, payload) => {
    return services.receita.listarPorMes(payload)
        .then(res => commit(types.SET_RECEITAS, res.data))
}