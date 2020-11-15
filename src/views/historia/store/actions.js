import services from '@/http'
import * as types from './mutation-types'


export const ActionListarHistoriasPorUsuarios = ({ commit }, payload) => {
    return services.historia.listarPorUsuario(payload)
        .then(res => {
            if (payload.page)
                commit(types.ADD_HISTORIAS, res.data.content)
            else
                commit(types.SET_HISTORIAS, res.data)
        })
}
