import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        isMenuVisible:false,
        user: null
    },
    mutations:{
        toggleMenu(state,isVisible){
            if(!state.user) {
                state.isMenuVisible = false
                return
            }
            if(isVisible === undefined){
                state.isMenuVisible = !state.isMenuVisible;
            }else{
                state.isMenuVisible = isVisible;
            }

            console.log("State "+state.isMenuVisible)
        },
        setUser(state, user) {
            state.user = user
            if(user) {
                console.log(user.token)
                this.$http.defaults.headers.common['Authorization'] = `bearer ${user.token}`
                state.isMenuVisible = true
            } else {
                delete this.$http.defaults.headers.common['Authorization']
                state.isMenuVisible = false
            }
        }
    }
})