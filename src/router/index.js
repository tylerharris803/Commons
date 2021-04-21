import Vue from 'vue'
import VueRouter from 'vue-router'
import Users from '../views/Users.vue'
import Profile from '../views/Profile.vue'
import Dashboard from '../views/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Users',
    component: Users
  },
  {
  path: '/dashboard',
  name: 'Dashboard',
  component: Dashboard
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: Profile
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
