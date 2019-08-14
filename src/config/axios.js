import Vue from 'vue'

// Lib imports
import axios from 'axios'

Vue.use({
    install(Vue){
        Vue.prototype.$http = axios.create({
            baseURL:'http://localhost:8081',
            headers: {'Authorization': "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0ZUB0ZXN0ZS5jb20iLCJleHAiOjE1NjU4OTM1MTJ9._NnXk7pvkVlVqHPJC_2aR6CD69IB5FDNnAfYtSldczMrwL-30znS13gBDKVnTYsFhHRa-XUYBpelNUWaraTSFA"}
        });

        Vue.prototype.$http.interceptors.request.use(config => {
            console.log(config.method);
            return config
        }, error=> Promise.reject(error))
    }
});