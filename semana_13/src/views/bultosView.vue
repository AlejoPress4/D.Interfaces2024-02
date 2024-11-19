<template>
  <div class="container-fluid py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>Gestión de Bultos</h1>
      <button class="btn btn-primary" @click="showCreateModal = true">
        <i class="bi bi-plus-lg me-1"></i>
        Nuevo Bulto
      </button>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Buscar por peso o remitente..."
            v-model="searchQuery"
            @input="handleSearch"
          />
        </div>

        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Peso</th>
                <th>Frágil</th>
                <th>Contenido</th>
                <th>Valor Declarado</th>
                <th>Remitente</th>
                <th>Destinatario</th>
                <th>Dimensiones</th>
                <th>Fecha Ingreso</th>
                <th>Fecha Salida</th>
                <th>Bodega</th>
                <th>Cliente</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="bulto in bultos" :key="bulto.id">
                <td>{{ bulto.peso }} kg</td>
                <td>
                  <span :class="['badge', bulto.fragil ? 'bg-danger' : 'bg-success']">
                    {{ bulto.fragil ? 'Frágil' : 'No Frágil' }}
                  </span>
                </td>
                <td>{{ bulto.contenido }}</td>
                <td>${{ formatCurrency(bulto.valorDeclarado) }}</td>
                <td>{{ bulto.remitente?.nombre || 'N/A' }}</td>
                <td>{{ bulto.destinatario?.nombre || 'N/A' }}</td>
                <td>{{ `${bulto.ancho}x${bulto.alto}x${bulto.largo}` }}</td>
                <td>{{ formatDate(bulto.fechaHoraIngreso) }}</td>
                <td>{{ formatDate(bulto.fechaHoraSalida) }}</td>
                <td>{{ bulto.bodega }}</td>
                <td>{{ bulto.cliente }}</td>
                <td>
                  <button class="btn btn-link text-primary p-1" @click="editBulto(bulto)">
                    <i class="bi bi-pencil-square"></i>
                  </button>
                  <button class="btn btn-link text-danger p-1" @click="confirmDelete(bulto)">
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
              <tr v-if="bultos.length === 0">
                <td colspan="12" class="text-center py-4 text-muted">No hay bultos registrados</td>
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
              {{ showEditModal ? 'Editar Bulto' : 'Nuevo Bulto' }}
            </h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSubmit">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Peso (kg)</label>
                  <input type="number" class="form-control" v-model="formData.peso" required />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Valor Declarado</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="formData.valorDeclarado"
                    required
                  />
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
                <div class="col-md-4 mb-3">
                  <label class="form-label">Ancho</label>
                  <input type="number" class="form-control" v-model="formData.ancho" required />
                </div>
                <div class="col-md-4 mb-3">
                  <label class="form-label">Alto</label>
                  <input type="number" class="form-control" v-model="formData.alto" required />
                </div>
                <div class="col-md-4 mb-3">
                  <label class="form-label">Largo</label>
                  <input type="number" class="form-control" v-model="formData.largo" required />
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
                <input type="text" class="form-control" v-model="formData.cliente" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Remitente</label>
                <input type="text" class="form-control" v-model="formData.remitente" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Destinatario</label>
                <input type="text" class="form-control" v-model="formData.destinatario" required />
              </div>
              <div class="mb-3 form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="fragilCheck"
                  v-model="formData.fragil"
                />
                <label class="form-check-label" for="fragilCheck">Frágil</label>
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
            <p>¿Está seguro que desea eliminar este bulto?</p>
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
import { useBultoStore } from '@/stores/bulto.js'

const toast = useToast()
const bultoStore = useBultoStore()
const bultos = ref([])
const searchQuery = ref('')
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const selectedBulto = ref(null)

const formData = ref({
  peso: '',
  fragil: false,
  contenido: '',
  valorDeclarado: '',
  remitente: '',
  destinatario: '',
  ancho: '',
  alto: '',
  largo: '',
  fechaHoraIngreso: '',
  fechaHoraSalida: '',
  bodega: '',
  cliente: '',
})

onMounted(async () => {
  await fetchBultos()
})

const fetchBultos = async () => {
  try {
    await bultoStore.fetchBultos()
    bultos.value = bultoStore.bultos
  } catch (error) {
    toast.error('Error al cargar los bultos')
  }
}

const handleSearch = async () => {
  if (searchQuery.value.trim()) {
    try {
      await bultoStore.searchBultos(searchQuery.value)
      bultos.value = bultoStore.bultos
    } catch (error) {
      toast.error('Error en la búsqueda')
    }
  } else {
    await fetchBultos()
  }
}

const editBulto = (bulto) => {
  selectedBulto.value = bulto
  formData.value = { ...bulto }
  showEditModal.value = true
}

const confirmDelete = (bulto) => {
  selectedBulto.value = bulto
  showDeleteModal.value = true
}

const handleDelete = async () => {
  if (!selectedBulto.value) return

  try {
    await bultoStore.deleteBulto(selectedBulto.value.id)
    await fetchBultos()
    showDeleteModal.value = false
    toast.success('Bulto eliminado exitosamente')
  } catch (error) {
    toast.error('Error al eliminar el bulto')
  }
}

const handleSubmit = async () => {
  try {
    if (showEditModal.value) {
      await bultoStore.updateBulto(selectedBulto.value.id, formData.value)
      toast.success('Bulto actualizado exitosamente')
    } else {
      await bultoStore.createBulto(formData.value)
      toast.success('Bulto creado exitosamente')
    }
    await fetchBultos()
    closeModal()
  } catch (error) {
    toast.error(showEditModal.value ? 'Error al actualizar el bulto' : 'Error al crear el bulto')
  }
}

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  selectedBulto.value = null
  formData.value = {
    peso: '',
    fragil: false,
    contenido: '',
    valorDeclarado: '',
    remitente: '',
    destinatario: '',
    ancho: '',
    alto: '',
    largo: '',
    fechaHoraIngreso: '',
    fechaHoraSalida: '',
    bodega: '',
    cliente: '',
  }
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
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
