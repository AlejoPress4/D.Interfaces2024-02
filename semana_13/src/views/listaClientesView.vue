<template>
  <div class="container-fluid py-4">
    <h2 class="mb-4">Lista de Clientes</h2>
    <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover table-striped">
            <thead class="table-light">
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Dirección</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cliente in clientes" :key="cliente.id">
                <td>{{ cliente.nombre }}</td>
                <td>{{ cliente.email }}</td>
                <td>{{ cliente.telefono }}</td>
                <td>{{ cliente.direccion }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useClienteStore } from '@/stores/clients.js'

const clienteStore = useClienteStore()
const clientes = ref([])

onMounted(async () => {
  await loadClientes()
})

const loadClientes = async () => {
  await clienteStore.fetchClientes()
  clientes.value = clienteStore.clientes
}
</script>

<style scoped>
.table th {
  font-weight: 600;
}
</style>
