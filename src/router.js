import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home.vue'
import StandardSearch from '@/components/StandardSearch.vue'
import ImprovedSearch from '@/components/ImprovedSearchOptions.vue'

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
    component: StandardSearch,
    meta: {
      transition: 'none'
    }
  },
  {
    path: '/two',
    component: ImprovedSearch,
    props: true
  },
  {
    path: '/two/:term',
    component: ImprovedSearch,
    props: true
  },
  {
    path: '/two/:term/results',
    component: ImprovedSearch,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
