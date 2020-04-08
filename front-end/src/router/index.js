import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Projects from '../views/Projects.vue'
import Current from '../views/Current.vue'
import Users from '../views/Users.vue'
import Join from '../views/Join.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  },
  {
    path: '/current',
    name: 'Current',
    component: Current
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/new',
    name: 'Join',
    component: Join
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
