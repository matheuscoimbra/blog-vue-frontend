export const  baseApiUrl = 'http://localhost:8081'

import Vue from 'vue'

export const userKey = '__knowledge_user'

export function showError(e) {
    console.log(e.response.data )
    if(e && e.response && e.response.data) {
        Vue.toasted.global.defaultError({ msg : e.response.data.errors[0] })
    } else if(typeof e === 'string') {
        Vue.toasted.global.defaultError({ msg : e })
    } else {
        Vue.toasted.global.defaultError()
    }
}

export default { baseApiUrl, showError, userKey }