import services from '@/http'
import * as types from './mutation-types'

export const ActionListarPorUsuario = ({ commit }, payload) => {
    return services.conta.listarPorUsuario(payload)
        .then(res => commit(types.SET_CONTAS, res.body))
}

export const ActionListarTipoContas = ({ commit }, payload) => {
    return services.conta.listarTipoContas()
        .then(res => commit(types.SET_TIPOS_CONTAS, res.data))
}

export const ActionAdicionarConta = ({ commit }, payload) => {
    return services.conta.adicionar(payload)
        .then(res => commit(types.ADD_CONTA, res.data))
}

export const ActionDetalharConta = ({ commit }, payload) => {
    return services.conta.detalhar(payload)
}

export const ActionAtualizarConta = ({ commit }, payload) => {
    return services.conta.atualizar({ id: payload.id }, payload)
        .then(res => commit(types.UPDATE_CONTA, res.body))
}

export const ActionAlterarSaldo = ({ commit }, payload) => {
    return services.conta.alterarSaldo({ id: payload.id }, payload)
        .then(res => commit(types.UPDATE_CONTA, res.body))
}

export const ActionExcluirConta = ({ commit }, payload) => {
    return services.conta.excluir(payload)
        .then(res => commit(types.REMOVE_CONTA, payload.id))
}

export const ActionInativarConta = ({ commit }, payload) => {
    return services.conta.inativar(payload, "")
        .then(res => commit(types.UPDATE_CONTA, res.body))
}
