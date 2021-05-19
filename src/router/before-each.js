import store from '../store'

export default async (to, from, next) => {
    document.title = `${to.meta.title} - Imperium`
    
    const hasToken = store.getters['auth/hasToken']
    const toLogin = (to.name === 'login')
    // console.log(toLogin, hasToken);

    if (!toLogin && !hasToken) {
        try {
            await store.dispatch('auth/ActionChecaToken')
            
            next({ path: to.path })
        } catch (error) {
            next({ name: 'login' })
        }
    } else {
        if (toLogin && hasToken) {
            next({ name: 'home' })
        } else {
            next()
        }
    }
}