import store from '../store'

export default (req) => {
    window._Vue.$emit('loading-progress::show')
    return ({ status }) => {
        window._Vue.$emit('loading-progress::hide')
        if (status === 403) {
            window._Vue.$emit('sweet-toast::show', { message: 'Sessão expirada!', type: 'info' })
            store.dispatch('auth/ActionLogout')
        }

        if (status === 0) {
            window._Vue.$emit('sweet-toast::show', { message: 'Não foi possivel conectar ao servidor!', type: 'info' })
        }
    }
}