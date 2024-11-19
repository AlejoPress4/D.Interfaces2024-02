<template>
  <div class="container-fluid py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>Gestión de Cajas</h1>
      <button class="btn btn-primary" @click="showCreateModal = true">
        <i class="bi bi-plus-lg me-1"></i>
        Nueva Caja
      </button>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Buscar por remitente..."
            v-model="searchQuery"
            @input="handleSearch"
          />
        </div>

        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Remitente</th>
                <th>Destinatario</th>
                <th>Contenido</th>
                <th>Peso</th>
                <th>Dimensiones</th>
                <th>Fecha Ingreso</th>
                <th>Fecha Salida</th>
                <th>Bodega</th>
                <th>Cliente</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="caja in cajas" :key="caja.id">
                <td>{{ caja.remitente?.nombre || 'N/A' }}</td>
                <td>{{ caja.destinatario?.nombre || 'N/A' }}</td>
                <td>{{ caja.contenido }}</td>
                <td>{{ caja.peso }} kg</td>
                <td>
                  {{
                    `${caja.dimensiones.ancho}x${caja.dimensiones.alto}x${caja.dimensiones.largo}`
                  }}
                </td>
                <td>{{ formatDate(caja.fechaHoraIngreso) }}</td>
                <td>{{ formatDate(caja.fechaHoraSalida) }}</td>
                <td>{{ caja.bodega }}</td>
                <td>{{ caja.cliente }}</td>
                <td>
                  <button class="btn btn-link text-primary p-1" @click="editCaja(caja)">
                    <i class="bi bi-pencil-square"></i>
                  </button>
                  <button class="btn btn-link text-danger p-1" @click="confirmDelete(caja)">
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
              <tr v-if="cajas.length === 0">
                <td colspan="10" class="text-center py-4 text-muted">No hay cajas registradas</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal Crear/Editar -->
    <div
      class="modal fade"
      :class="{ show: showCreateModal || showEditModal }"
      tabindex="-1"
      :style="{ display: showCreateModal || showEditModal ? 'block' : 'none' }"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ showEditModal ? 'Editar Caja' : 'Nueva Caja' }}
            </h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSubmit">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Remitente</label>
                  <select class="form-select" v-model="formData.remitente" required>
                    <option value="">Seleccione un remitente</option>
                    <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
                      {{ cliente.nombre }}
                    </option>
                  </select>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Destinatario</label>
                  <select class="form-select" v-model="formData.destinatario" required>
                    <option value="">Seleccione un destinatario</option>
                    <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
                      {{ cliente.nombre }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Contenido</label>
                <textarea
                  class="form-control"
                  v-model="formData.contenido"
                  required
                  rows="3"
                ></textarea>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Peso (kg)</label>
                  <input type="number" class="form-control" v-model="formData.peso" required />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Dimensiones (ancho x alto x largo)</label>
                  <div class="input-group">
                    <input
                      type="number"
                      class="form-control"
                      v-model="formData.dimensiones.ancho"
                      required
                      placeholder="Ancho"
                    />
                    <input
                      type="number"
                      class="form-control"
                      v-model="formData.dimensiones.alto"
                      required
                      placeholder="Alto"
                    />
                    <input
                      type="number"
                      class="form-control"
                      v-model="formData.dimensiones.largo"
                      required
                      placeholder="Largo"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Fecha y Hora de Ingreso</label>
                  <input
                    type="datetime-local"
                    class="form-control"
                    v-model="formData.fechaHoraIngreso"
                    required
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Fecha y Hora de Salida</label>
                  <input
                    type="datetime-local"
                    class="form-control"
                    v-model="formData.fechaHoraSalida"
                  />
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Bodega</label>
                <input type="text" class="form-control" v-model="formData.bodega" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Cliente</label>
                <select class="form-select" v-model="formData.cliente" required>
                  <option value="">Seleccione un cliente</option>
                  <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
                    {{ cliente.nombre }}
                  </option>
                </select>
              </div>
              <div class="modal-footer px-0 pb-0">
                <button type="button" class="btn btn-secondary" @click="closeModal">
                  Cancelar
                </button>
                <button type="submit" class="btn btn-primary">
                  {{ showEditModal ? 'Actualizar' : 'Crear' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal backdrop -->
    <div
      class="modal-backdrop fade"
      :class="{ show: showCreateModal || showEditModal || showDeleteModal }"
      v-if="showCreateModal || showEditModal || showDeleteModal"
    ></div>

    <!-- Modal Eliminar -->
    <div
      class="modal fade"
      :class="{ show: showDeleteModal }"
      tabindex="-1"
      :style="{ display: showDeleteModal ? 'block' : 'none' }"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirmar Eliminación</h5>
            <button type="button" class="btn-close" @click="showDeleteModal = false"></button>
          </div>
          <div class="modal-body">
            <p>¿Está seguro que desea eliminar esta caja?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showDeleteModal = false">
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
import { useToast } from 'vue-toastification'
import { useCajaStore } from '@/stores/caja.js'

const toast = useToast()
const cajaStore = useCajaStore()
const cajas = ref([])
const clientes = ref([])
const searchQuery = ref('')
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const selectedCaja = ref(null)

const formData = ref({
  remitente: '',
  destinatario: '',
  contenido: '',
  peso: '',
  dimensiones: {
    ancho: '',
    alto: '',
    largo: '',
  },
  fechaHoraIngreso: '',
  fechaHoraSalida: '',
  bodega: '',
  cliente: '',
})

onMounted(async () => {
  await fetchCajas()
  await fetchClientes()
})

const fetchCajas = async () => {
  try {
    await cajaStore.fetchCajas()
    cajas.value = cajaStore.cajas
  } catch (error) {
    toast.error('Error al cargar las cajas')
  }
}

const fetchClientes = async () => {
  try {
    clientes.value = await cajaStore.fetchClientes()
  } catch (error) {
    toast.error('Error al cargar los clientes')
  }
}

const handleSearch = async () => {
  if (searchQuery.value.trim()) {
    try {
      const results = await cajaStore.fetchCajaByRemitente(searchQuery.value)
      cajas.value = results
    } catch (error) {
      toast.error('Error en la búsqueda')
    }
  } else {
    await fetchCajas()
  }
}

const editCaja = (caja) => {
  selectedCaja.value = caja
  formData.value = { ...caja }
  showEditModal.value = true
}

const confirmDelete = (caja) => {
  selectedCaja.value = caja
  showDeleteModal.value = true
}

const handleDelete = async () => {
  if (!selectedCaja.value) return

  try {
    await cajaStore.deleteCaja(selectedCaja.value.id)
    await fetchCajas()
    showDeleteModal.value = false
    toast.success('Caja eliminada exitosamente')
  } catch (error) {
    toast.error('Error al eliminar la caja')
  }
}

const handleSubmit = async () => {
  try {
    if (showEditModal.value) {
      await cajaStore.updateCaja(selectedCaja.value.id, formData.value)
      toast.success('Caja actualizada exitosamente')
    } else {
      await cajaStore.createCaja(formData.value)
      toast.success('Caja creada exitosamente')
    }
    await fetchCajas()
    closeModal()
  } catch (error) {
    toast.error(showEditModal.value ? 'Error al actualizar la caja' : 'Error al crear la caja')
  }
}

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  selectedCaja.value = null
  formData.value = {
    remitente: '',
    destinatario: '',
    contenido: '',
    peso: '',
    dimensiones: {
      ancho: '',
      alto: '',
      largo: '',
    },
    fechaHoraIngreso: '',
    fechaHoraSalida: '',
    bodega: '',
    cliente: '',
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleString('es-CO', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<style>
.modal {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
