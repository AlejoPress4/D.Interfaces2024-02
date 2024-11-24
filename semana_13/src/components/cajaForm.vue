<template>
  <div
    class="modal fade"
    id="cajaModal"
    tabindex="-1"
    aria-labelledby="cajaModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="cajaModalLabel">
            {{ isEditing ? 'Editar Caja' : 'Nueva Caja' }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm" class="row g-3">
            <div class="col-md-6">
              <label for="remitente" class="form-label">Remitente</label>
              <select v-model="formData.remitente" id="remitente" class="form-select" required>
                <option value="">Seleccione un remitente</option>
                <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
                  {{ cliente.nombre }}
                </option>
              </select>
            </div>
            <div class="col-md-6">
              <label for="destinatario" class="form-label">Destinatario</label>
              <select
                v-model="formData.destinatario"
                id="destinatario"
                class="form-select"
                required
              >
                <option value="">Seleccione un destinatario</option>
                <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
                  {{ cliente.nombre }}
                </option>
              </select>
            </div>
            <div class="col-md-6">
              <label for="peso" class="form-label">Peso (kg)</label>
              <input
                v-model.number="formData.peso"
                type="number"
                class="form-control"
                id="peso"
                required
                step="0.01"
              />
            </div>
            <div class="col-md-6">
              <label for="valorDeclarado" class="form-label">Valor Declarado</label>
              <input
                v-model.number="formData.valorDeclarado"
                type="number"
                class="form-control"
                id="valorDeclarado"
                required
                step="0.01"
              />
            </div>
            <div class="col-12">
              <label for="contenido" class="form-label">Contenido</label>
              <textarea
                v-model="formData.contenido"
                class="form-control"
                id="contenido"
                rows="3"
                required
              ></textarea>
            </div>
            <div class="col-md-4">
              <label for="ancho" class="form-label">Ancho (cm)</label>
              <input
                v-model.number="formData.dimensiones.ancho"
                type="number"
                class="form-control"
                id="ancho"
                required
                step="0.1"
              />
            </div>
            <div class="col-md-4">
              <label for="alto" class="form-label">Alto (cm)</label>
              <input
                v-model.number="formData.dimensiones.alto"
                type="number"
                class="form-control"
                id="alto"
                required
                step="0.1"
              />
            </div>
            <div class="col-md-4">
              <label for="largo" class="form-label">Largo (cm)</label>
              <input
                v-model.number="formData.dimensiones.largo"
                type="number"
                class="form-control"
                id="largo"
                required
                step="0.1"
              />
            </div>
            <div class="col-md-6">
              <label for="fechaHoraIngreso" class="form-label">Fecha y Hora de Ingreso</label>
              <input
                v-model="formData.fechaHoraIngreso"
                type="datetime-local"
                class="form-control"
                id="fechaHoraIngreso"
                required
              />
            </div>
            <div class="col-md-6">
              <label for="fechaHoraSalida" class="form-label">Fecha y Hora de Salida</label>
              <input
                v-model="formData.fechaHoraSalida"
                type="datetime-local"
                class="form-control"
                id="fechaHoraSalida"
              />
            </div>
            <div class="col-md-6">
              <label for="bodega" class="form-label">Bodega</label>
              <input
                v-model="formData.bodega"
                type="text"
                class="form-control"
                id="bodega"
                required
              />
            </div>
            <div class="col-md-6">
              <label for="cliente" class="form-label">Cliente</label>
              <select v-model="formData.cliente" id="cliente" class="form-select" required>
                <option value="">Seleccione un cliente</option>
                <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
                  {{ cliente.nombre }}
                </option>
              </select>
            </div>
            <div class="col-12">
              <div class="form-check">
                <input
                  v-model="formData.fragil"
                  class="form-check-input"
                  type="checkbox"
                  id="fragil"
                />
                <label class="form-check-label" for="fragil"> Frágil </label>
              </div>
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
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useClienteStore } from '@/stores/clients.js'

const props = defineProps({
  caja: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['save', 'cancel'])

const clienteStore = useClienteStore()
const clientes = ref([])

const formData = ref({
  remitente: '',
  destinatario: '',
  peso: 0,
  fragil: false,
  contenido: '',
  valorDeclarado: 0,
  dimensiones: {
    ancho: 0,
    alto: 0,
    largo: 0,
  },
  fechaHoraIngreso: '',
  fechaHoraSalida: '',
  bodega: '',
  cliente: '',
})

const isEditing = ref(false)
let modal = null

onMounted(async () => {
  modal = new bootstrap.Modal(document.getElementById('cajaModal'))
  await loadClientes()
})

watch(
  () => props.caja,
  (newCaja) => {
    if (newCaja) {
      formData.value = { ...newCaja }
      isEditing.value = true
    } else {
      resetForm()
      isEditing.value = false
    }
  },
  { deep: true },
)

const loadClientes = async () => {
  try {
    await clienteStore.fetchClientes()
    clientes.value = clienteStore.clientes
  } catch (error) {
    console.error('Error al cargar clientes:', error)
  }
}

const submitForm = () => {
  emit('save', formData.value)
}

const resetForm = () => {
  formData.value = {
    remitente: '',
    destinatario: '',
    peso: 0,
    fragil: false,
    contenido: '',
    valorDeclarado: 0,
    dimensiones: {
      ancho: 0,
      alto: 0,
      largo: 0,
    },
    fechaHoraIngreso: '',
    fechaHoraSalida: '',
    bodega: '',
    cliente: '',
  }
}

const show = () => {
  modal.show()
}

const hide = () => {
  modal.hide()
}

defineExpose({
  show,
  hide,
})
</script>
