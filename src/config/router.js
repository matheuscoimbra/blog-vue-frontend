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
        component: Auth,
        meta: {
            public: true  // Allow access to even if not logged in
        }
    }
]

const router = new Router({
    mode: 'history',
    routes
})
router.beforeEach((to, from, next) => {
    const isPublic = to.matched.some(record => record.meta.public)
    const json = localStorage.getItem(userKey)
    const loggedIn = !!json

    if (!isPublic && !loggedIn) {
        return next({
            path:'/auth',
            query: {redirect: to.fullPath}  // Store the full path to redirect the user to after login
        });
    }

    if(to.matched.some(record => record.meta.requiresAdmin)) {
        const user = JSON.parse(json)
        user && user.admin ? next() : next({ path: '/' })
    } else {
        next()
    }
})
export default router
