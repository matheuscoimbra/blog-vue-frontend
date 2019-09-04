import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import ArticlesByCategory from '@/components/article/ArticlesByCategory'
import ArticleById from '@/components/article/ArticleById'
import Auth from '@/components/auth/Auth'
import Blog from '@/components/publico/Blog'
import Sobre from '@/components/publico/Sobre'
import {userKey} from "../global";
import CalendarAdmin from "@/components/admin/CalendarTemp";

Vue.use(Router)

const routes = [{
    name:'home',
    path:'/',
    component:Home
},{
    name:'adminPages',
    path:'/admin',
    component:AdminPages,
    meta:{ requiresAdmin: false }
},{
    name:'calendarAdmin',
    path:'/calendar',
    component:CalendarAdmin,
    meta:{ requiresAdmin: true }
},
    {
        name:'articlesByCategory',
        path:'/categories/:id/articles',
        component:ArticlesByCategory,
        meta: {
            public: true  // Allow access to even if not logged in
        }
    },
    {
        name:'articleById',
        path:'/article/:id/:post_slug',
        component:ArticleById,
        meta: {
            public: true  // Allow access to even if not logged in
        }
    },
    {
        name: 'auth',
        path: '/auth',
        component: Auth,
        meta: {
            public: true  // Allow access to even if not logged in
        }
    },
    {
        name: 'blog',
        path: '/blog',
        component: Blog,
        meta: {
            public: true  // Allow access to even if not logged in
        }
    },
    {
        name: 'sobre',
        path: '/sobre',
        component: Sobre,
        meta: {
            public: true  // Allow access to even if not logged in
        }
    },
    { path: '*', //404
        redirect: '/blog' }
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
            path:'/blog',
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
