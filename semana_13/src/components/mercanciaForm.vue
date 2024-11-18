<template>
  <form @submit.prevent="submitForm" class="space-y-4">
    <div v-for="field in fields" :key="field" class="flex flex-col">
      <label :for="field" class="mb-1 font-medium">{{ fieldLabels[field] }}</label>
      <input
        v-if="fieldTypes[field] !== 'textarea'"
        :id="field"
        v-model="formData[field]"
        :type="fieldTypes[field]"
        :required="requiredFields.includes(field)"
        class="px-4 py-2 border rounded-md"
      />
      <textarea
        v-else
        :id="field"
        v-model="formData[field]"
        :required="requiredFields.includes(field)"
        class="px-4 py-2 border rounded-md"
        rows="3"
      ></textarea>
    </div>
    <div class="flex justify-end space-x-2">
      <button type="button" @click="$emit('cancel')" class="px-4 py-2 border rounded-md">
        Cancelar
      </button>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        {{ isEditing ? 'Actualizar' : 'Crear' }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { reactive } from 'vue'

const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['submit', 'cancel'])

const fields = [
  'contenido',
  'ancho',
  'alto',
  'largo',
  'fechaHoraIngreso',
  'fechaHoraSalida',
  'bodega',
  'cliente',
]
const requiredFields = [
  'contenido',
  'ancho',
  'alto',
  'largo',
  'fechaHoraIngreso',
  'bodega',
  'cliente',
]
const fieldLabels = {
  contenido: 'Contenido',
  ancho: 'Ancho',
  alto: 'Alto',
  largo: 'Largo',
  fechaHoraIngreso: 'Fecha y Hora de Ingreso',
  fechaHoraSalida: 'Fecha y Hora de Salida',
  bodega: 'Bodega',
  cliente: 'Cliente',
}
const fieldTypes = {
  contenido: 'textarea',
  ancho: 'number',
  alto: 'number',
  largo: 'number',
  fechaHoraIngreso: 'datetime-local',
  fechaHoraSalida: 'datetime-local',
  bodega: 'text',
  cliente: 'text',
}

const formData = reactive({ ...props.formData })

const submitForm = () => {
  emit('submit', formData)
}
</script>
