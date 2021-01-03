import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

// eslint-disable-next-line no-unused-vars
async function checkAuth(to, from, next) {
  const isLoggedIn = store.getters['auth/isLoggedIn']
  if (!isLoggedIn) {
    // If has token
    if (store.getters['auth/hasToken']) {
      // Get user data
      await store.dispatch('auth/getUserData')
      // If getUserData success isLoggedIn will be set to true
      if (store.getters['auth/isLoggedIn']) {
        // token is valid, continue
        next(to)
        return
      } else {
        next('/login')
        return
      }
    }
    // No token, go to login
    next('/login')
    return
  }
  // is logged in, continue
  next()
}

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName */ '../views/Dashboard'),
    // beforeEnter: checkAuth,
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName */ '../views/Dashboard/Home')
      },
      {
        path: '/history-test',
        name: 'history-test',
        component: () => import(/* webpackChunkName */ '../views/Dashboard/TestHistory')
      },
      {
        path: '/result-test/:number',
        name: 'result-test',
        component: () => import(/* webpackChunkName */ '../views/Dashboard/TestHistory/result.vue')
      },
      {
        path: '/request-test',
        name: 'request-test',
        component: () => import(/* webpackChunkName */ '../views/Dashboard/RequestTest')
      },
      {
        path: '/request-test/checkout',
        name: 'request-test-checkout',
        component: () => import(/* webpackChunkName */ '../views/Dashboard/RequestTestCheckout')
      },
      {
        path: '/request-test/success',
        name: 'request-test-success',
        component: () => import(/* webpackChunkName */ '../views/Dashboard/RequestTestSuccess')
      },
      {
        path: '/lab',
        name: 'lab',
        component: () => import(/* webpackChunkName */ '../views/Dashboard/Lab')
      },
      {
        path: '/lab/:number/:owner',
        name: 'lab-result',
        component: () => import(/* webpackChunkName */ '../views/Dashboard/Lab/result.vue')
      }

    ]
  },
  {
    path: '/requestTest',
    name: 'requestTest',
    component: () => import(/* webpackChunkName */ '../views/RequestTest')
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "" */ '../views/Login')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

export default router
