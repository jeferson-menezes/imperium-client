import services from '@/http'
import * as storage from '../storage'
import * as types from './mutation-types'


export const ActionLogar = ({ dispatch }, payload) => {
    return services.auth.login(payload).then(res => {
        dispatch('ActionSetLogin', res.data)
    })
}

export const ActionSetLogin = ({ commit }, payload) => {
    storage.setHeaderToken(payload.token)

    storage.setLocalToken(payload.token)
    storage.setLocalUser(payload.usuario)
    commit(types.SET_TOKEN, payload.token)
    commit(types.SET_USER, payload.usuario)
}


export const ActionChecaToken = ({ dispatch, state }) => {

    if (state.token) {
        return Promise.resolve(state.token)
    }

    const token = storage.getLocalToken()

    if (!token) {
        return Promise.reject(new Error('Token inválido!'))
    }

    dispatch('ActionSetToken', token)

    const user = storage.getLocalUser()

    dispatch("ActionSetUser", user)

    return dispatch('ActionValidaToken', { token })
}

export const ActionValidaToken = ({ dispatch }, payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await services.auth.valida(payload)
            dispatch("ActionSetLogin", res.body)
            resolve()
        } catch (error) {
            reject(error)
        }
    });
}

export const ActionSetToken = ({ commit }, token) => {
    storage.setLocalToken(token)
    storage.setHeaderToken(token)
    commit(types.SET_TOKEN, token)
}

export const ActionSetUser = ({ commit }, user) => {
    storage.setLocalUser(user)
    commit(types.SET_USER, user)
}

export const ActionLogout = ({ commit }) => {
    storage.deleteLocalToken()
    storage.deleteLocalUser()
    commit(types.SET_TOKEN, '')
    commit(types.SET_USER, {})

}