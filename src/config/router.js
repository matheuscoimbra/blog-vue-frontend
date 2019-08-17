import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import ArticlesByCategory from '@/components/article/ArticlesByCategory'
import ArticleById from '@/components/article/ArticleById'
import Auth from '@/components/auth/Auth'

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
    },
    {
        name:'articleById',
        path:'/article/:id',
        component:ArticleById
    },
    {
        name: 'auth',
        path: '/auth',
        component: Auth
    }
]

export default new Router({
    mode:'history',
    routes
})

