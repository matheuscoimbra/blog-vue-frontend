export const  baseApiUrl = 'http://localhost:8081'

import Vue from 'vue'

export const userKey = '__auth_user';

export function showError(e) {
    if(e && e.response && e.response.data) {
        if(e.response.data instanceof Array){
            Vue.toasted.global.defaultError({ msg : e.response.data.errors[0] })
        }else{
            Vue.toasted.global.defaultError({ msg : e.response.data.message})
        }
    } else if(typeof e === 'string') {
        Vue.toasted.global.defaultError({ msg : e })
    } else {
        Vue.toasted.global.defaultError()
    }
}

export default { baseApiUrl, showError, userKey }