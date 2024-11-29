<template>
  <form @submit.prevent="submitForm" class="space-y-4">
    <div v-for="field in fields" :key="field" class="flex flex-col">
      <label :for="field" class="mb-1 font-medium">{{ fieldLabels[field] }}</label>
      <input
        :id="field"
        v-model="formData[field]"
        :type="fieldTypes[field]"
        :required="requiredFields.includes(field)"
        class="px-4 py-2 border rounded-md"
      />
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

const fields = ['id', 'nombre', 'direccion', 'telefono', 'ciudad']
const requiredFields = ['nombre', 'direccion', 'telefono', 'ciudad']
const fieldLabels = {
  id: 'ID',
  nombre: 'Nombre',
  direccion: 'Dirección',
  telefono: 'Teléfono',
  ciudad: 'Ciudad',
}
const fieldTypes = {
  id: 'text',
  nombre: 'text',
  direccion: 'text',
  telefono: 'tel',
  ciudad: 'text',
}

const formData = reactive({ ...props.formData })

const submitForm = () => {
  emit('submit', formData)
}
</script>
