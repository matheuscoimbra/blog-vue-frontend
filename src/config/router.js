import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import ArticlesByCategory from '@/components/article/ArticlesByCategory'
import ArticleById from '@/components/article/ArticleById'
import Auth from '@/components/auth/Auth'
import {userKey} from "../global";

Vue.use(Router)

const routes = [{
    name:'home',
    path:'/',
    component:Home
},{
    name:'adminPages',
    path:'/admin',
    component:AdminPages,
    meta:{ requiresAdmin: true }
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

const router = new Router({
    mode: 'history',
    routes
})
router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)

    if(to.matched.some(record => record.meta.requiresAdmin)) {
        const user = JSON.parse(json)
        user && user.admin ? next() : next({ path: '/' })
    } else {
        next()
    }
})
export default router
