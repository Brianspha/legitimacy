import Vue from 'vue'
import VueRouter from 'vue-router'
import EducationHistory from '../views/EducationHistory.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: EducationHistory
  },
  {
    path: '/history',
    name: 'EducationHistory',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/EducationHistory.vue')
  },
  {
    path: '/add',
    name: 'AddQualification',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AddQualification.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
