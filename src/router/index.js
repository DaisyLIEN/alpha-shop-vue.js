import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import ShoppingCartCheckout from '../views/ShoppingCartCheckout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/1'
  },
  {
    path: '/:step',
    name: 'ShoppingCartCheckout',
    component: ShoppingCartCheckout
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  }  
]

const router = new VueRouter({
  routes
})

export default router
