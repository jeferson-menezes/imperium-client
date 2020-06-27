// categoria
import services from '@/http'
import * as types from './mutation-types'

export const ActionListarCategorias = ({ commit }) => {
    return services.categoria.listar()
        .then(res => commit(types.SET_CATEGORIAS, res.body))
}

export const ActionAdicionarCategoria = ({ commit }, payload) => {
    return services.categoria.adicionar(payload)
        .then(res => commit(types.ADD_CATEGORIA, res.body))
        .catch(err => console.error(err))
}

export const ActionExcluirCategoria = ({ commit }, payload) => {
    return services.categoria.excluir(payload)
        .then(res => commit(types.REMOVE_CATEGORIA, payload.id))
}

export const ActionAtualizarCategoria = ({ commit }, payload) => {
    return services.categoria.atualizar({ id: payload.id }, payload)
        .then(res => commit(types.UPDATE_CATEGORIA, res.body))
}

export const ActionInativarCategoria = ({ commit }, payload) => {
    return services.categoria.inativar(payload, "")
        .then(res => commit(types.UPDATE_CATEGORIA, res.body))
}