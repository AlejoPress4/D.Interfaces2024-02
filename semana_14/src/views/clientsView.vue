<template>
  <div class="container-fluid py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="m-0">Gestión de Clientes</h2>
      <button class="btn btn-primary d-flex align-items-center gap-2" @click="openCreateModal">
        <i class="bi bi-plus-lg"></i>
        Nuevo Cliente
      </button>
    </div>

    <div class="card mb-4">
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <div class="input-group">
              <input
                v-model="searchQuery"
                type="text"
                class="form-control"
                placeholder="Buscar por ID o nombre..."
                @keyup.enter="handleSearch"
              />
              <button class="btn btn-outline-secondary" type="button" @click="handleSearch">
                <i class="bi bi-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <div v-if="clienteStore.loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Cargando...</span>
          </div>
        </div>

        <div v-else-if="clienteStore.error" class="alert alert-danger" role="alert">
          {{ clienteStore.error }}
        </div>

        <div v-else-if="!clienteStore.clientes.length" class="text-center py-5">
          <i class="bi bi-people display-4 text-muted"></i>
          <p class="mt-3 text-muted">No se encontraron clientes</p>
        </div>

        <div v-else class="table-responsive">
          <table class="table table-hover align-middle">
            <thead class="table-light">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Ciudad</th>
                <th class="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cliente in clienteStore.clientes" :key="cliente.id">
                <td>{{ cliente.id }}</td>
                <td>{{ cliente.nombre }}</td>
                <td>{{ cliente.direccion }}</td>
                <td>{{ cliente.telefono }}</td>
                <td>{{ cliente.ciudad }}</td>
                <td>
                  <div class="d-flex justify-content-center gap-2">
                    <button
                      class="btn btn-sm btn-outline-primary"
                      @click="editCliente(cliente)"
                      title="Editar"
                    >
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button
                      class="btn btn-sm btn-outline-danger"
                      @click="confirmDelete(cliente)"
                      title="Eliminar"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal Form -->
    <div
      class="modal fade"
      id="clienteModal"
      tabindex="-1"
      aria-labelledby="clienteModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="clienteModalLabel">
              {{ isEditing ? 'Editar Cliente' : 'Nuevo Cliente' }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSubmit" class="row g-3">
              <div class="col-md-6">
                <label class="form-label">Nombre</label>
                <input v-model="formData.nombre" type="text" class="form-control" required />
              </div>
              <div class="col-md-6">
                <label class="form-label">Teléfono</label>
                <input v-model="formData.telefono" type="tel" class="form-control" required />
              </div>
              <div class="col-12">
                <label class="form-label">Dirección</label>
                <input v-model="formData.direccion" type="text" class="form-control" required />
              </div>
              <div class="col-md-6">
                <label class="form-label">Ciudad</label>
                <input v-model="formData.ciudad" type="text" class="form-control" required />
              </div>
              <div class="col-12 text-end">
                <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">
                  Cancelar
                </button>
                <button type="submit" class="btn btn-primary">
                  {{ isEditing ? 'Actualizar' : 'Crear' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useClienteStore } from '@/stores/clients.js'
import { useToast } from 'vue-toastification'

const clienteStore = useClienteStore()
const toast = useToast()

const searchQuery = ref('')
const isEditing = ref(false)
const formData = ref({
  id: '',
  nombre: '',
  direccion: '',
  telefono: '',
  ciudad: '',
})

let modal = null

onMounted(async () => {
  modal = new bootstrap.Modal(document.getElementById('clienteModal'))
  await loadClientes()
})

const loadClientes = async () => {
  try {
    await clienteStore.fetchClientes()
  } catch (error) {
    toast.error('Error al cargar los clientes')
  }
}

const handleSearch = async () => {
  try {
    if (!searchQuery.value.trim()) {
      await clienteStore.fetchClientes()
      return
    }

    // Try to fetch by ID first
    if (searchQuery.value.match(/^[0-9a-fA-F]{24}$/)) {
      const cliente = await clienteStore.fetchCliente(searchQuery.value)
      if (cliente) {
        clienteStore.clientes = [cliente]
        return
      }
    }

    // If not found by ID or not an ID, search by name
    const result = await clienteStore.fetchClienteByNombre(searchQuery.value)
    clienteStore.clientes = Array.isArray(result) ? result : [result]
  } catch (error) {
    toast.error('Error al buscar clientes')
  }
}

const openCreateModal = () => {
  isEditing.value = false
  formData.value = {
    id: '',
    nombre: '',
    direccion: '',
    telefono: '',
    ciudad: '',
  }
  modal.show()
}

const editCliente = (cliente) => {
  isEditing.value = true
  formData.value = { ...cliente }
  modal.show()
}

const confirmDelete = async (cliente) => {
  if (!confirm(`¿Está seguro de que desea eliminar al cliente ${cliente.nombre}?`)) return

  try {
    await clienteStore.deleteCliente(cliente.id)
    toast.success('Cliente eliminado correctamente')
    await loadClientes()
  } catch (error) {
    if (error.response?.status === 400) {
      toast.warning(clienteStore.error)
    } else {
      toast.error('Error al eliminar el cliente')
    }
  }
}

const handleSubmit = async () => {
  try {
    if (isEditing.value) {
      await clienteStore.updateCliente(formData.value.id, formData.value)
      toast.success('Cliente actualizado correctamente')
    } else {
      await clienteStore.createCliente(formData.value)
      toast.success('Cliente creado correctamente')
    }
    modal.hide()
    await loadClientes()
  } catch (error) {
    toast.error('Error al guardar el cliente')
  }
}
</script>

<style scoped>
.table th {
  font-weight: 600;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
}
</style>
