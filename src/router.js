import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home.vue'
import Imperative from '@/components/Imperative.vue'
import Declarative from '@/components/Declarative.vue'

const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      transition: 'none'
    }
  },
  {
    path: '/one',
    component: Imperative,
  },
  {
    path: '/two',
    component: Declarative,
    props: true
  },
  {
    path: '/two/id/:seed/ben/:ben/claim/:claim/',
    component: Declarative,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
