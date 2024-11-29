<template>
  <div class="container-fluid py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="m-0">Gestión de Mercancías</h2>
      <button class="btn btn-primary d-flex align-items-center gap-2" @click="openCreateModal">
        <i class="bi bi-plus-lg"></i>
        Nueva Mercancía
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
                placeholder="Buscar por ID o contenido..."
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
        <div v-if="mercanciaStore.loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Cargando...</span>
          </div>
        </div>

        <div v-else-if="mercanciaStore.error" class="alert alert-danger" role="alert">
          {{ mercanciaStore.error }}
        </div>

        <div v-else-if="!mercanciaStore.mercancias.length" class="text-center py-5">
          <i class="bi bi-box-seam display-4 text-muted"></i>
          <p class="mt-3 text-muted">No se encontraron mercancías</p>
        </div>

        <div v-else class="table-responsive">
          <table class="table table-hover align-middle">
            <thead class="table-light">
              <tr>
                <th>ID</th>
                <th>Contenido</th>
                <th>Dimensiones</th>
                <th>Fecha/Hora</th>
                <th>Bodega</th>
                <th>Cliente</th>
                <th class="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="mercancia in mercanciaStore.mercancias" :key="mercancia.id">
                <td>{{ mercancia.id }}</td>
                <td>{{ mercancia.contenido }}</td>
                <td>{{ formatDimensiones(mercancia) }}</td>
                <td>
                  <div><strong>Ingreso:</strong> {{ formatDate(mercancia.fechaHoraIngreso) }}</div>
                  <div><strong>Salida:</strong> {{ formatDate(mercancia.fechaHoraSalida) }}</div>
                </td>
                <td>{{ mercancia.bodega }}</td>
                <td>{{ getClienteName(mercancia.cliente) }}</td>
                <td>
                  <div class="d-flex justify-content-center gap-2">
                    <button
                      class="btn btn-sm btn-outline-primary"
                      @click="editMercancia(mercancia)"
                      title="Editar"
                    >
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button
                      class="btn btn-sm btn-outline-danger"
                      @click="confirmDelete(mercancia)"
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
      id="mercanciaModal"
      tabindex="-1"
      aria-labelledby="mercanciaModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="mercanciaModalLabel">
              {{ isEditing ? 'Editar Mercancía' : 'Nueva Mercancía' }}
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
              <div class="col-12">
                <label class="form-label">Contenido</label>
                <textarea
                  v-model="formData.contenido"
                  class="form-control"
                  rows="3"
                  required
                ></textarea>
              </div>

              <div class="col-md-4">
                <label class="form-label">Ancho (m)</label>
                <input
                  v-model="formData.ancho"
                  type="number"
                  class="form-control"
                  step="0.01"
                  required
                />
              </div>

              <div class="col-md-4">
                <label class="form-label">Alto (m)</label>
                <input
                  v-model="formData.alto"
                  type="number"
                  class="form-control"
                  step="0.01"
                  required
                />
              </div>

              <div class="col-md-4">
                <label class="form-label">Largo (m)</label>
                <input
                  v-model="formData.largo"
                  type="number"
                  class="form-control"
                  step="0.01"
                  required
                />
              </div>

              <div class="col-md-6">
                <label class="form-label">Fecha/Hora Ingreso</label>
                <input
                  v-model="formData.fechaHoraIngreso"
                  type="datetime-local"
                  class="form-control"
                  required
                />
              </div>

              <div class="col-md-6">
                <label class="form-label">Fecha/Hora Salida</label>
                <input
                  v-model="formData.fechaHoraSalida"
                  type="datetime-local"
                  class="form-control"
                />
              </div>

              <div class="col-md-6">
                <label class="form-label">Bodega</label>
                <input v-model="formData.bodega" type="text" class="form-control" required />
              </div>

              <div class="col-md-6">
                <label class="form-label">Cliente</label>
                <select v-model="formData.cliente" class="form-select" required>
                  <option value="">Seleccione un cliente</option>
                  <option
                    v-for="cliente in mercanciaStore.clientes"
                    :key="cliente.id"
                    :value="cliente.id"
                  >
                    {{ cliente.nombre }}
                  </option>
                </select>
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
import { useMercanciaStore } from '@/stores/mercancia.js'
import { useToast } from 'vue-toastification'

const mercanciaStore = useMercanciaStore()
const toast = useToast()

const searchQuery = ref('')
const isEditing = ref(false)
const formData = ref({
  id: '',
  contenido: '',
  ancho: '',
  alto: '',
  largo: '',
  fechaHoraIngreso: '',
  fechaHoraSalida: '',
  bodega: '',
  cliente: '',
})

let modal = null

onMounted(async () => {
  modal = new bootstrap.Modal(document.getElementById('mercanciaModal'))
  await loadInitialData()
})

const loadInitialData = async () => {
  try {
    await Promise.all([mercanciaStore.fetchMercancias(), mercanciaStore.fetchClientesForSelect()])
  } catch (error) {
    toast.error('Error al cargar los datos iniciales')
  }
}

const handleSearch = async () => {
  try {
    if (!searchQuery.value.trim()) {
      await mercanciaStore.fetchMercancias()
      return
    }

    // Try to fetch by ID first
    if (searchQuery.value.match(/^[0-9a-fA-F]{24}$/)) {
      const mercancia = await mercanciaStore.fetchMercancia(searchQuery.value)
      if (mercancia) {
        mercanciaStore.mercancias = [mercancia]
        return
      }
    }

    // If not found by ID or not an ID, search by name
    const result = await mercanciaStore.fetchMercanciaByNombre(searchQuery.value)
    mercanciaStore.mercancias = Array.isArray(result) ? result : [result]
  } catch (error) {
    toast.error('Error al buscar mercancías')
  }
}

const openCreateModal = () => {
  isEditing.value = false
  formData.value = {
    contenido: '',
    ancho: '',
    alto: '',
    largo: '',
    fechaHoraIngreso: new Date().toISOString().slice(0, 16),
    fechaHoraSalida: '',
    bodega: '',
    cliente: '',
  }
  modal.show()
}

const editMercancia = (mercancia) => {
  isEditing.value = true
  formData.value = {
    ...mercancia,
    fechaHoraIngreso: mercancia.fechaHoraIngreso
      ? new Date(mercancia.fechaHoraIngreso).toISOString().slice(0, 16)
      : '',
    fechaHoraSalida: mercancia.fechaHoraSalida
      ? new Date(mercancia.fechaHoraSalida).toISOString().slice(0, 16)
      : '',
  }
  modal.show()
}

const confirmDelete = async (mercancia) => {
  if (!confirm(`¿Está seguro de que desea eliminar la mercancía ${mercancia.id}?`)) return

  try {
    await mercanciaStore.deleteMercancia(mercancia.id)
    toast.success('Mercancía eliminada correctamente')
    await mercanciaStore.fetchMercancias()
  } catch (error) {
    toast.error('Error al eliminar la mercancía')
  }
}

const handleSubmit = async () => {
  try {
    if (isEditing.value) {
      await mercanciaStore.updateMercancia(formData.value.id, formData.value)
      toast.success('Mercancía actualizada correctamente')
    } else {
      await mercanciaStore.createMercancia(formData.value)
      toast.success('Mercancía creada correctamente')
    }
    modal.hide()
    await mercanciaStore.fetchMercancias()
  } catch (error) {
    toast.error('Error al guardar la mercancía')
  }
}

const formatDimensiones = (mercancia) => {
  return `${mercancia.ancho}x${mercancia.alto}x${mercancia.largo} m`
}

const formatDate = (dateString) => {
  if (!dateString) return 'No establecida'
  return new Date(dateString).toLocaleString()
}

const getClienteName = (clienteId) => {
  const cliente = mercanciaStore.clientes.find((c) => c.id === clienteId)
  return cliente ? cliente.nombre : 'Cliente no especificado'
}
</script>

<style scoped>
.table th {
  font-weight: 600;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
}

.modal-lg {
  max-width: 800px;
}
</style>
