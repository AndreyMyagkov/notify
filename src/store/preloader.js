export default {
    state: {
        loading: false,
    },

    mutations: {
        setLoadingStatus(state, payload) {
            state.loading = payload
        },
    },

    actions: {
        setLoadingStatus({commit}, payload) {
            commit('setLoadingStatus', payload)
        },
    },

    getters: {
        getLoadingStatus (state) {
            return state.loading
        }
    }
}