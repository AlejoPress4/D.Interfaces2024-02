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
  'remitente',
  'destinatario',
  'peso',
  'fragil',
  'contenido',
  'valorDeclarado',
  'ancho',
  'largo',
  'alto',
]
const requiredFields = [
  'remitente',
  'destinatario',
  'peso',
  'fragil',
  'contenido',
  'valorDeclarado',
  'ancho',
  'largo',
  'alto',
]
const fieldLabels = {
  remitente: 'Remitente',
  destinatario: 'Destinatario',
  peso: 'Peso',
  fragil: 'Frágil',
  contenido: 'Contenido',
  valorDeclarado: 'Valor Declarado',
  ancho: 'Ancho',
  largo: 'Largo',
  alto: 'Alto',
}
const fieldTypes = {
  remitente: 'text',
  destinatario: 'text',
  peso: 'number',
  fragil: 'checkbox',
  contenido: 'textarea',
  valorDeclarado: 'number',
  ancho: 'number',
  largo: 'number',
  alto: 'number',
}

const formData = reactive({ ...props.formData })

const submitForm = () => {
  emit('submit', formData)
}
</script>
