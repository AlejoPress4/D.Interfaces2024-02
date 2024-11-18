<template>
  <div class="container-fluid p-0">
    <FullScreenMenu v-if="showMenu" :menuOptions="routes" @select="selectOption" />

    <template v-else>
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
        <div class="container-fluid">
          <a class="navbar-brand" href="#" @click="showMenu = true">Sistema de Logística</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li v-for="route in routes" :key="route.name" class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: currentView === route.name }"
                  href="#"
                  @click.prevent="currentView = route.name"
                >
                  {{ route.name }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main class="container">
        <component :is="currentComponent"></component>
      </main>

      <footer class="mt-5 text-center text-muted">
        <p>&copy; 2023 Sistema de Logística. Todos los derechos reservados.</p>
      </footer>
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FullScreenMenu from './components/mainMenu.vue'
import ClientesView from './views/clientsView.vue'
import MercanciasView from './views/mercanciaView.vue'
import PaquetesView from './views/paquetesView.vue'
import BultosView from './views/bultosView.vue'
import SobresView from './views/sobresView.vue'
import CajasView from './views/cajasView.vue'
import listaClientesView from './views/listaClientesView.vue'

const routes = [
  { name: 'Clientes', component: ClientesView },
  { name: 'Mercancías', component: MercanciasView },
  { name: 'Paquetes', component: PaquetesView },
  { name: 'Bultos', component: BultosView },
  { name: 'Sobres', component: SobresView },
  { name: 'Cajas', component: CajasView },
  { name: 'Lista de Clientes', component: listaClientesView },
]

const showMenu = ref(true)
const currentView = ref('')

const currentComponent = computed(() => {
  const route = routes.find((r) => r.name === currentView.value)
  return route ? route.component : null
})

const selectOption = (optionName) => {
  currentView.value = optionName
  showMenu.value = false
}
</script>

<style>
/* Puedes agregar estilos personalizados aquí si es necesario */
</style>
