<template>
  <div class="container-fluid py-4">
    <div class="row mb-4">
      <div class="col-12">
        <div class="d-flex justify-content-between align-items-center">
          <h2 class="mb-0">Gestión de Mercancías</h2>
          <button
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#mercanciaModal"
            @click="prepareNewMercancia"
          >
            <i class="bi bi-plus-lg me-2"></i>Nueva Mercancía
          </button>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <!-- Search Bar -->
        <div class="row mb-4">
          <div class="col-md-6 col-lg-4">
            <div class="input-group">
              <input
                v-model="searchQuery"
                type="text"
                class="form-control"
                placeholder="Buscar mercancías..."
              />
              <button class="btn btn-outline-secondary" type="button" @click="handleSearch">
                <i class="bi bi-search"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-4">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Cargando...</span>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="alert alert-danger" role="alert">
          {{ error }}
        </div>

        <!-- Empty State -->
        <div v-else-if="!mercancias.length" class="text-center py-4">
          <i class="bi bi-box-seam display-4 text-muted"></i>
          <p class="mt-2 text-muted">No se encontraron mercancías</p>
        </div>

        <!-- Data Table -->
        <div v-else class="table-responsive">
          <table class="table table-hover table-striped">
            <thead class="table-light">
              <tr>
                <th class="px-3">Contenido</th>
                <th class="px-3">Dimensiones</th>
                <th class="px-3">Fecha/Hora</th>
                <th class="px-3">Ubicación</th>
                <th class="px-3">Cliente</th>
                <th class="text-center px-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="mercancia in mercancias" :key="mercancia.id">
                <td class="px-3">
                  <div class="d-flex align-items-center">
                    <div>
                      <div class="fw-semibold">{{ mercancia.contenido }}</div>
                      <small class="text-muted">ID: {{ mercancia.id }}</small>
                    </div>
                  </div>
                </td>
                <td class="px-3">
                  {{ mercancia.ancho }}x{{ mercancia.alto }}x{{ mercancia.largo }}
                </td>
                <td class="px-3">
                  <div>Ingreso: {{ formatDateTime(mercancia.fechaHoraIngreso) }}</div>
                  <div>Salida: {{ formatDateTime(mercancia.fechaHoraSalida) }}</div>
                </td>
                <td class="px-3">{{ mercancia.bodega }}</td>
                <td class="px-3">{{ mercancia.cliente }}</td>
                <td class="px-3">
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

    <!-- Modal para crear/editar mercancía -->
    <div class="modal fade" id="mercanciaModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ isEditing ? 'Editar Mercancía' : 'Nueva Mercancía' }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSubmit" class="row g-3">
              <div class="col-md-12">
                <label for="contenido" class="form-label">Contenido</label>
                <textarea
                  id="contenido"
                  v-model="formData.contenido"
                  class="form-control"
                  rows="3"
                  required
                ></textarea>
              </div>

              <div class="col-md-4">
                <label for="ancho" class="form-label">Ancho</label>
                <input
                  type="number"
                  class="form-control"
                  id="ancho"
                  v-model="formData.ancho"
                  step="0.01"
                  required
                />
              </div>

              <div class="col-md-4">
                <label for="alto" class="form-label">Alto</label>
                <input
                  type="number"
                  class="form-control"
                  id="alto"
                  v-model="formData.alto"
                  step="0.01"
                  required
                />
              </div>

              <div class="col-md-4">
                <label for="largo" class="form-label">Largo</label>
                <input
                  type="number"
                  class="form-control"
                  id="largo"
                  v-model="formData.largo"
                  step="0.01"
                  required
                />
              </div>

              <div class="col-md-6">
                <label for="bodega" class="form-label">Bodega</label>
                <input
                  type="text"
                  class="form-control"
                  id="bodega"
                  v-model="formData.bodega"
                  required
                />
              </div>

              <div class="col-md-6">
                <label for="cliente" class="form-label">Cliente</label>
                <input
                  type="text"
                  class="form-control"
                  id="cliente"
                  v-model="formData.cliente"
                  required
                />
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
import { useMercanciaStore } from '@/stores/mercancia'

const mercanciaStore = useMercanciaStore()
const mercancias = ref([])
const searchQuery = ref('')
const loading = ref(false)
const error = ref(null)
const isEditing = ref(false)
const formData = ref({
  contenido: '',
  ancho: '',
  alto: '',
  largo: '',
  fechaHoraIngreso: '',
  fechaHoraSalida: '',
  bodega: '',
  cliente: '',
})

onMounted(async () => {
  await loadMercancias()
})

const loadMercancias = async () => {
  loading.value = true
  error.value = null
  try {
    await mercanciaStore.fetchMercancias()
    mercancias.value = mercanciaStore.mercancias
  } catch (e) {
    error.value = 'Error al cargar las mercancías'
  } finally {
    loading.value = false
  }
}

const handleSearch = async () => {
  if (searchQuery.value.trim()) {
    loading.value = true
    error.value = null
    try {
      const result = await mercanciaStore.fetchMercanciaByNombre(searchQuery.value)
      mercancias.value = Array.isArray(result) ? result : [result]
    } catch (e) {
      error.value = 'Error al buscar mercancías'
    } finally {
      loading.value = false
    }
  } else {
    await loadMercancias()
  }
}

const prepareNewMercancia = () => {
  isEditing.value = false
  formData.value = {
    contenido: '',
    ancho: '',
    alto: '',
    largo: '',
    fechaHoraIngreso: new Date().toISOString(),
    fechaHoraSalida: '',
    bodega: '',
    cliente: '',
  }
}

const editMercancia = (mercancia) => {
  isEditing.value = true
  formData.value = { ...mercancia }
  const modal = new bootstrap.Modal(document.getElementById('mercanciaModal'))
  modal.show()
}

const confirmDelete = async (mercancia) => {
  if (confirm('¿Está seguro de que desea eliminar esta mercancía?')) {
    loading.value = true
    error.value = null
    try {
      await mercanciaStore.deleteMercancia(mercancia.id)
      await loadMercancias()
    } catch (e) {
      error.value = 'Error al eliminar la mercancía'
    } finally {
      loading.value = false
    }
  }
}

const handleSubmit = async () => {
  loading.value = true
  error.value = null
  try {
    if (isEditing.value) {
      await mercanciaStore.updateMercancia(formData.value.id, formData.value)
    } else {
      await mercanciaStore.createMercancia(formData.value)
    }
    await loadMercancias()
    const modal = bootstrap.Modal.getInstance(document.getElementById('mercanciaModal'))
    modal.hide()
  } catch (e) {
    error.value = 'Error al guardar la mercancía'
  } finally {
    loading.value = false
  }
}

const formatDateTime = (dateString) => {
  if (!dateString) return 'No establecida'
  return new Date(dateString).toLocaleString()
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
