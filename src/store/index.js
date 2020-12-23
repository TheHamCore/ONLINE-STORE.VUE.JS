import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import getters from './getters/getters';
import mutations from './mutations/mutations';
import commonActions from './actions/actions';
import apiRequests from './actions/api-requests';

const actions = {...commonActions, ...apiRequests};

let store = new Vuex.Store({
    state: {
        products: [],
        cart:[]
    },
    getters,
    actions,
    mutations
});

export default store;
