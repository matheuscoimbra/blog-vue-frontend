import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import ArticlesByCategory from '@/components/article/ArticlesByCategory'
Vue.use(Router)

const routes = [{
    name:'home',
    path:'/',
    component:Home
},{
    name:'adminPages',
    path:'/admin',
    component:AdminPages
},
    {
        name:'articlesByCategory',
        path:'/categories/:id/articles',
        component:ArticlesByCategory
    }
]

export default new Router({
    mode:'history',
    routes
})

