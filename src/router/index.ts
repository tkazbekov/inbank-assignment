import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import RejectView from '@/views/RejectView.vue'
import SuccessView from '@/views/SuccessView.vue'

import { useLoanStore } from '@/stores/loan'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/success',
      name: 'success',
      beforeEnter: (to, from, next) => {
        if (!useLoanStore().loanData) {
          next({ name: 'home' })
        } else {
          next()
        }
      },
      component: SuccessView
    },
    {
      path: '/rejection',
      name: 'rejection',
      beforeEnter: (to, from, next) => {
        if (!useLoanStore().loanData) {
          next({ name: 'home' })
        } else {
          next()
        }
      },
      component: RejectView
    }
  ]
})

export default router
