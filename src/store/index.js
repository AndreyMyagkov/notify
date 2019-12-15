import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import notify from './notify'
import preloader from './preloader'
import error from './error'

export default new Vuex.Store({
    modules: {
        notify,
        preloader,
        error
    }
})