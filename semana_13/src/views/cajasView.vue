<template>
  <div class="container-fluid py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>Gestión de Cajas</h1>
      <button class="btn btn-primary" @click="openCreateModal">
        <i class="bi bi-plus-lg me-1"></i>
        Nueva Caja
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
                placeholder="Buscar por remitente o número de guía..."
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
        <div v-if="cajaStore.loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Cargando...</span>
          </div>
        </div>

        <div v-else-if="cajaStore.error" class="alert alert-danger" role="alert">
          {{ cajaStore.error }}
        </div>

        <div v-else-if="!cajaStore.cajas.length" class="text-center py-5">
          <i class="bi bi-box-seam display-4 text-muted"></i>
          <p class="mt-3 text-muted">No se encontraron cajas</p>
        </div>

        <div v-else class="table-responsive">
          <table class="table table-hover align-middle">
            <thead class="table-light">
              <tr>
                <th>Nro. Guía</th>
                <th>Remitente</th>
                <th>Destinatario</th>
                <th>Contenido</th>
                <th>Peso</th>
                <th>Dimensiones</th>
                <th>Fecha Ingreso</th>
                <th>Fecha Salida</th>
                <th>Bodega</th>
                <th>Cliente</th>
                <th class="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="caja in cajaStore.cajas" :key="caja.nroGuia">
                <td>{{ caja.nroGuia }}</td>
                <td>{{ caja.remitente?.nombre || 'N/A' }}</td>
                <td>{{ caja.destinatario?.nombre || 'N/A' }}</td>
                <td>{{ caja.contenido }}</td>
                <td>{{ caja.peso }} kg</td>
                <td>{{ formatDimensiones(caja.dimensiones) }}</td>
                <td>{{ formatDate(caja.fechaHoraIngreso) }}</td>
                <td>{{ formatDate(caja.fechaHoraSalida) }}</td>
                <td>{{ caja.bodega }}</td>
                <td>{{ caja.cliente?.nombre || 'N/A' }}</td>
                <td>
                  <div class="d-flex justify-content-center gap-2">
                    <button
                      class="btn btn-sm btn-outline-primary"
                      @click="editCaja(caja)"
                      title="Editar"
                    >
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button
                      class="btn btn-sm btn-outline-danger"
                      @click="confirmDelete(caja)"
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

    <CajaForm ref="cajaForm" :caja="selectedCaja" @save="saveCaja" @cancel="closeModal" />

    <!-- Modal Eliminar -->
    <div
      class="modal fade"
      id="deleteModal"
      tabindex="-1"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteModalLabel">Confirmar Eliminación</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>¿Está seguro que desea eliminar esta caja?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Cancelar
            </button>
            <button type="button" class="btn btn-danger" @click="handleDelete">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCajaStore } from '@/stores/caja.js'
import { useClienteStore } from '@/stores/clients.js'
import CajaForm from '@/components/cajaForm.vue'

const cajaStore = useCajaStore()
const clienteStore = useClienteStore()
const searchQuery = ref('')
const selectedCaja = ref(null)
const cajaForm = ref(null)

let deleteModal = null

onMounted(async () => {
  await loadCajas()
  await clienteStore.fetchClientes()
  deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'))
})

const loadCajas = async () => {
  await cajaStore.fetchCajas()
}

const handleSearch = async () => {
  if (!searchQuery.value.trim()) {
    await loadCajas()
    return
  }

  try {
    if (searchQuery.value.match(/^[0-9a-zA-Z]+$/)) {
      // Buscar por número de guía
      const caja = await cajaStore.fetchCajaByGuia(searchQuery.value)
      cajaStore.cajas = caja ? [caja] : []
    } else {
      // Buscar por remitente
      const cajas = await cajaStore.fetchCajasByRemitente(searchQuery.value)
      cajaStore.cajas = cajas
    }
  } catch (error) {
    console.error('Error en la búsqueda:', error)
  }
}

const openCreateModal = () => {
  selectedCaja.value = null
  cajaForm.value.show()
}

const editCaja = (caja) => {
  selectedCaja.value = { ...caja }
  cajaForm.value.show()
}

const confirmDelete = (caja) => {
  selectedCaja.value = caja
  deleteModal.show()
}

const handleDelete = async () => {
  if (!selectedCaja.value) return

  try {
    await cajaStore.deleteCaja(selectedCaja.value.nroGuia)
    deleteModal.hide()
  } catch (error) {
    console.error('Error al eliminar caja:', error)
  }
}

const saveCaja = async (cajaData) => {
  try {
    if (selectedCaja.value) {
      await cajaStore.updateCaja(selectedCaja.value.nroGuia, cajaData)
    } else {
      await cajaStore.createCaja(cajaData)
    }
    closeModal()
    await loadCajas()
  } catch (error) {
    console.error('Error al guardar caja:', error)
  }
}

const closeModal = () => {
  selectedCaja.value = null
  cajaForm.value.hide()
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleString('es-CO', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const formatDimensiones = (dimensiones) => {
  return `${dimensiones.ancho}x${dimensiones.alto}x${dimensiones.largo} cm`
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
