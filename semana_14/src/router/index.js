import { createRouter, createWebHistory } from 'vue-router'
// Use absolute paths from src directory
import ClientesView from '@/views/cajasView.vue'
import MercanciasView from '@/views/mercanciaView.vue'
import PaquetesView from '@/views/paquetesView.vue'
import BultosView from '@/views/bultosView.vue'
import SobresView from '@/views/sobresView.vue'
import CajasView from '@/views/cajasView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Clientes',
      component: ClientesView,
    },
    {
      path: '/mercancias',
      name: 'Mercancías',
      component: MercanciasView,
    },
    {
      path: '/paquetes',
      name: 'Paquetes',
      component: PaquetesView,
    },
    {
      path: '/bultos',
      name: 'Bultos',
      component: BultosView,
    },
    {
      path: '/sobres',
      name: 'Sobres',
      component: SobresView,
    },
    {
      path: '/cajas',
      name: 'Cajas',
      component: CajasView,
    },
  ],
})

export default router
