import Vue from 'vue'

// Lib imports
import axios from 'axios'

Vue.use({
    install(Vue){
        Vue.prototype.$http = axios.create({
            baseURL:'http://localhost:8081',
            headers: {'Authorization': "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0ZUB0ZXN0ZS5jb20iLCJleHAiOjE1NjYwNjMyNzJ9.cTFIsgXAsyMTDy14iX7yGOJ_pFebEDEe6NDSTh48O-RaMnDX-dF8le-ocCRpzebxqN3Bq8t6x1lmDLYtgEAzYw"}
        });

        Vue.prototype.$http.interceptors.request.use(config => {
            console.log(config.method);
            return config
        }, error=> Promise.reject(error))
    }
});