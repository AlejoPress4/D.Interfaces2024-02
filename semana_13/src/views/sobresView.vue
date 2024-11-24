<template>
  <div class="container-fluid py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>Gestión de Sobres</h1>
      <button class="btn btn-primary" @click="showCreateModal = true">
        <i class="bi bi-plus-lg me-1"></i>
        Nuevo Sobre
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
                <th>Certificado</th>
                <th>Fecha Ingreso</th>
                <th>Fecha Salida</th>
                <th>Bodega</th>
                <th>Cliente</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="sobre in sobres" :key="sobre.id">
                <td>{{ sobre.remitente?.nombre || 'N/A' }}</td>
                <td>{{ sobre.destinatario?.nombre || 'N/A' }}</td>
                <td>{{ sobre.contenido }}</td>
                <td>
                  <span :class="['badge', sobre.certificado ? 'bg-success' : 'bg-secondary']">
                    {{ sobre.certificado ? 'Sí' : 'No' }}
                  </span>
                </td>
                <td>{{ formatDate(sobre.fechaHoraIngreso) }}</td>
                <td>{{ formatDate(sobre.fechaHoraSalida) }}</td>
                <td>{{ sobre.bodega }}</td>
                <td>{{ sobre.cliente }}</td>
                <td>
                  <button class="btn btn-link text-primary p-1" @click="editSobre(sobre)">
                    <i class="bi bi-pencil-square"></i>
                  </button>
                  <button class="btn btn-link text-danger p-1" @click="confirmDelete(sobre)">
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
              <tr v-if="sobres.length === 0">
                <td colspan="9" class="text-center py-4 text-muted">No hay sobres registrados</td>
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
              {{ showEditModal ? 'Editar Sobre' : 'Nuevo Sobre' }}
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
              <div class="mb-3 form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="certificadoCheck"
                  v-model="formData.certificado"
                />
                <label class="form-check-label" for="certificadoCheck">Certificado</label>
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
            <h5 class="modal-title">Confir mar Eliminación</h5>
            <button type="button" class="btn-close" @click="showDeleteModal = false"></button>
          </div>
          <div class="modal-body">
            <p>¿Está seguro que desea eliminar este sobre?</p>
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
import { useSobreStore } from '@/stores/sobre'

const toast = useToast()
const sobreStore = useSobreStore()
const sobres = ref([])
const clientes = ref([])
const searchQuery = ref('')
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const selectedSobre = ref(null)

const formData = ref({
  remitente: '',
  destinatario: '',
  contenido: '',
  certificado: false,
  fechaHoraIngreso: '',
  fechaHoraSalida: '',
  bodega: '',
  cliente: '',
})

onMounted(async () => {
  await fetchSobres()
  await fetchClientes()
})

const fetchSobres = async () => {
  try {
    await sobreStore.fetchSobres()
    sobres.value = sobreStore.sobres
  } catch (error) {
    toast.error('Error al cargar los sobres')
  }
}

const fetchClientes = async () => {
  try {
    clientes.value = await sobreStore.fetchClientes()
  } catch (error) {
    toast.error('Error al cargar los clientes')
  }
}

const handleSearch = async () => {
  if (searchQuery.value.trim()) {
    try {
      const results = await sobreStore.fetchSobreByRemitente(searchQuery.value)
      sobres.value = results
    } catch (error) {
      toast.error('Error en la búsqueda')
    }
  } else {
    await fetchSobres()
  }
}

const editSobre = (sobre) => {
  selectedSobre.value = sobre
  formData.value = { ...sobre }
  showEditModal.value = true
}

const confirmDelete = (sobre) => {
  selectedSobre.value = sobre
  showDeleteModal.value = true
}

const handleDelete = async () => {
  if (!selectedSobre.value) return

  try {
    await sobreStore.deleteSobre(selectedSobre.value.id)
    await fetchSobres()
    showDeleteModal.value = false
    // toast.success('Sobre eliminado exitosamente')
  } catch (error) {
    toast.error('Error al eliminar el sobre')
  }
}

const handleSubmit = async () => {
  try {
    if (showEditModal.value) {
      await sobreStore.updateSobre(selectedSobre.value.id, formData.value)
      toast.success('Sobre actualizado exitosamente')
    } else {
      await sobreStore.createSobre(formData.value)
      toast.success('Sobre creado exitosamente')
    }
    await fetchSobres()
    closeModal()
  } catch (error) {
    toast.error(showEditModal.value ? 'Error al actualizar el sobre' : 'Error al crear el sobre')
  }
}

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  selectedSobre.value = null
  formData.value = {
    remitente: '',
    destinatario: '',
    contenido: '',
    certificado: false,
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
