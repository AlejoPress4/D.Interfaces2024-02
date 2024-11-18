<template>
  <div class="container-fluid py-4">
    <div class="row mb-4">
      <div class="col-12">
        <div class="d-flex justify-content-between align-items-center">
          <h2 class="mb-0">Gestión de Clientes</h2>
          <button
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#clienteModal"
            @click="prepareNewCliente"
          >
            <i class="bi bi-plus-lg me-2"></i>Nuevo Cliente
          </button>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="row mb-4">
          <div class="col-md-6 col-lg-4">
            <div class="input-group">
              <input
                v-model="searchNombre"
                type="text"
                class="form-control"
                placeholder="Buscar por nombre..."
                @input="searchByNombre"
              />
              <button class="btn btn-outline-secondary" type="button">
                <i class="bi bi-search"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="table-responsive">
          <table class="table table-hover table-striped">
            <thead class="table-light">
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th class="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cliente in clientes" :key="cliente.id">
                <td>{{ cliente.nombre }}</td>
                <td>{{ cliente.email }}</td>
                <td>{{ cliente.telefono }}</td>
                <td>{{ cliente.direccion }}</td>
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
                      @click="deleteCliente(cliente.id)"
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

    <!-- Modal para crear/editar cliente -->
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
            <form @submit.prevent="submitForm">
              <div class="mb-3">
                <label for="nombre" class="form-label">Nombre</label>
                <input
                  v-model="formData.nombre"
                  type="text"
                  class="form-control"
                  id="nombre"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  v-model="formData.email"
                  type="email"
                  class="form-control"
                  id="email"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="telefono" class="form-label">Teléfono</label>
                <input
                  v-model="formData.telefono"
                  type="tel"
                  class="form-control"
                  id="telefono"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="direccion" class="form-label">Dirección</label>
                <input
                  v-model="formData.direccion"
                  type="text"
                  class="form-control"
                  id="direccion"
                  required
                />
              </div>
              <div class="text-end">
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

const clienteStore = useClienteStore()
const clientes = ref([])
const searchNombre = ref('')
const isEditing = ref(false)
const formData = ref({
  nombre: '',
  email: '',
  telefono: '',
  direccion: '',
})

onMounted(async () => {
  await loadClientes()
})

const loadClientes = async () => {
  await clienteStore.fetchClientes()
  clientes.value = clienteStore.clientes
}

const searchByNombre = async () => {
  if (searchNombre.value) {
    const result = await clienteStore.fetchClienteByNombre(searchNombre.value)
    clientes.value = Array.isArray(result) ? result : [result]
  } else {
    await loadClientes()
  }
}

const prepareNewCliente = () => {
  isEditing.value = false
  formData.value = {
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
  }
}

const editCliente = (cliente) => {
  isEditing.value = true
  formData.value = { ...cliente }
  const modal = new bootstrap.Modal(document.getElementById('clienteModal'))
  modal.show()
}

const deleteCliente = async (id) => {
  if (confirm('¿Está seguro de que desea eliminar este cliente?')) {
    await clienteStore.deleteCliente(id)
    await loadClientes()
  }
}

const submitForm = async () => {
  try {
    if (isEditing.value) {
      await clienteStore.updateCliente(formData.value.id, formData.value)
    } else {
      await clienteStore.createCliente(formData.value)
    }
    await loadClientes()
    const modal = bootstrap.Modal.getInstance(document.getElementById('clienteModal'))
    modal.hide()
  } catch (error) {
    console.error('Error al guardar el cliente:', error)
    alert('Ocurrió un error al guardar el cliente')
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
