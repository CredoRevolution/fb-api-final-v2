import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import FbView from '@/views/FbView.vue'
import FbBusiness from '@/views/FbBusiness.vue'
import InstBusiness from '@/views/InstBusiness.vue'
import InstView from '@/views/InstView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/Fb',
    name: 'Fb',
    component: FbView,
  },
  {
    path: '/FbBusiness',
    name: 'FbBusiness',
    component: FbBusiness,
  },
  {
    path: '/InstBusiness',
    name: 'InstBusiness',
    component: InstBusiness,
  },
  {
    path: '/Inst',
    name: 'Inst',
    component: InstView,
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
