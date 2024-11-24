<template>
  <div class="container-fluid py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>Gestión de Paquetes</h1>
      <button class="btn btn-primary" @click="showCreateModal = true">
        <i class="bi bi-plus-lg me-1"></i>
        Nuevo Paquete
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
              <tr v-for="paquete in paquetes" :key="paquete.id">
                <td>{{ paquete.remitente?.nombre || 'N/A' }}</td>
                <td>{{ paquete.destinatario?.nombre || 'N/A' }}</td>
                <td>{{ paquete.contenido }}</td>
                <td>{{ paquete.peso }} kg</td>
                <td>
                  {{
                    paquete.dimensiones
                      ? `${paquete.dimensiones.ancho}x${paquete.dimensiones.alto}x${paquete.dimensiones.largo}`
                      : 'N/A'
                  }}
                </td>
                <td>{{ formatDate(paquete.fechaHoraIngreso) }}</td>
                <td>{{ formatDate(paquete.fechaHoraSalida) }}</td>
                <td>{{ paquete.bodega }}</td>
                <td>{{ paquete.cliente }}</td>
                <td>
                  <button class="btn btn-link text-primary p-1" @click="editPaquete(paquete)">
                    <i class="bi bi-pencil-square"></i>
                  </button>
                  <button class="btn btn-link text-danger p-1" @click="confirmDelete(paquete)">
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
              <tr v-if="paquetes.length === 0">
                <td colspan="10" class="text-center py-4 text-muted">
                  No hay paquetes registrados
                </td>
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
              {{ showEditModal ? 'Editar Paquete' : 'Nuevo Paquete' }}
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
            <p>¿Está seguro que desea eliminar este paquete?</p>
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
import { ref, onMounted, computed } from 'vue'
import { useToast } from 'vue-toastification'
import { storeToRefs } from 'pinia'
import { usePaqueteStore } from '@/stores/paquete.js'

const toast = useToast()
const paqueteStore = usePaqueteStore()
const { paquetes, loading, error } = storeToRefs(paqueteStore)
const clientes = ref([])
const searchQuery = ref('')
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const selectedPaquete = ref(null)

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
  await fetchPaquetes()
  await fetchClientes()
})

const fetchPaquetes = async () => {
  await paqueteStore.fetchPaquetes()
}

const fetchClientes = async () => {
  try {
    clientes.value = await paqueteStore.fetchClientes()
  } catch (error) {
    toast.error('Error al cargar los clientes')
  }
}

const handleSearch = async () => {
  if (searchQuery.value.trim()) {
    try {
      const results = await paqueteStore.fetchPaqueteByRemitente(searchQuery.value)
      paqueteStore.setPaquetes(results)
    } catch (error) {
      toast.error('Error en la búsqueda')
    }
  } else {
    await fetchPaquetes()
  }
}

const editPaquete = (paquete) => {
  selectedPaquete.value = paquete
  formData.value = {
    ...paquete,
    dimensiones: paquete.dimensiones || { ancho: '', alto: '', largo: '' },
  }
  showEditModal.value = true
}

const confirmDelete = (paquete) => {
  selectedPaquete.value = paquete
  showDeleteModal.value = true
}

const handleDelete = async () => {
  if (!selectedPaquete.value) return

  try {
    await paqueteStore.deletePaquete(selectedPaquete.value.id)
    showDeleteModal.value = false
  } catch (error) {
    toast.error('Error al eliminar el paquete')
  }
}

const handleSubmit = async () => {
  try {
    if (showEditModal.value) {
      await paqueteStore.updatePaquete(selectedPaquete.value.id, formData.value)
    } else {
      await paqueteStore.createPaquete(formData.value)
    }
    closeModal()
  } catch (error) {
    toast.error(
      showEditModal.value ? 'Error al actualizar el paquete' : 'Error al crear el paquete',
    )
  }
}

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  selectedPaquete.value = null
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
