import loadMore from '../assets/js/loadMore.js'
import axios from 'axios'

const API_URL = 'https://tocode.ru/static/c/vue-pro/notifyApi.php';

export default {
    state: {
        messages: [],
        messagesMain: []
    },
    mutations: {
        setMessage(state, payload) {
            state.messages = payload
        },
        setMessageMain(state, payload) {
            state.messagesMain = payload
        },
        loadMessages(state, payload) {
            state.messagesMain = [...state.messagesMain, ...payload]
        }
    },
    actions: {
        setMessage ({commit}, payload) {
            commit('setMessage', payload)
        },
        setMessageMain ({commit}, payload) {
            commit('setMessageMain', payload)
        },
        loadMessages ({commit, getters}) {
            let res = getters.getMessagesFilter
            commit('loadMessages', loadMore(res,3))
        },
        getNotifyLazy({commit, dispatch}, payload) {
            dispatch('setLoadingStatus', true);
            
            setTimeout(() => (dispatch('getNotify')), 1800)
            
        },
        getNotify({commit, dispatch}, payload) {
            dispatch('setLoadingStatus', true);
            axios
                .get(API_URL)
                .then(response => {
                    let res = response.data.notify,
                        messages = [],
                        messagesMain = [];

                    // filter
                    for (let i = 0; i < res.length; i++) {
                        if (res[i].main) {
                            messagesMain.push(res[i]);
                        } else {
                            messages.push(res[i]);
                        }
                    }


                    dispatch('setMessage', messages);
                    dispatch('setMessageMain', messagesMain)
                })
                .catch(error => {
                    console.log(error)
                    dispatch('setError', 'Error: Network error');
                })
                .finally(() => {
                    dispatch('setLoadingStatus', false);
                })
        }
    },
    getters: {
        getMessages (state) {
            return state.messages
        },
        getMessagesMain (state) {
            return state.messagesMain
        },
        getMessagesFilter (state) {
            return state.messages.filter(mes => {
                return mes.main===false
            })
        },
    }
}