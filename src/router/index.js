import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/estudos',
      name: 'estudos',
      component: () => import('../views/EstudosView.vue')
    },
    {
      path: '/desafios',
      name: 'desafios',
      component: () => import('../views/DesafiosView.vue')
    },
    {
      path: '/temas',
      name: 'temas',
      component: () => import('../views/TemasView.vue')
    },
    {
      path: '/redacao',
      name: 'redacao',
      component: () => import('../views/RedacaoView.vue')
    },
    {
      path: '/areadoaluno',
      name: 'areadoaluno',
      component: () => import('../views/AreaAlunoView.vue')
    },
    {
      path: '/escrever',
      name: 'escrever',
      component: () => import('../views/EscreverView.vue')
    },
    {
      path: '/atividades',
      name: 'atividades',
      component: () => import('../views/AtividadesView.vue')
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: () => import('../views/QuizView.vue')
    },
    {
      path: '/canva',
      name: 'canva',
      component: () => import('../views/CanvaView.vue')
    },
  ]
})

export default router
