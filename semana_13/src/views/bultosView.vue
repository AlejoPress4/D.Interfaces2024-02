<template>
  <BaseCrudComponent
    title="Bultos"
    :items="bultos"
    :fields="['peso', 'fragil', 'contenido', 'valorDeclarado', 'remitente', 'destinatario']"
    :createItem="createBulto"
    :updateItem="updateBulto"
    :deleteItem="deleteBulto"
    @itemCreated="onBultoCreated"
    @itemUpdated="onBultoUpdated"
    @itemDeleted="onBultoDeleted"
  >
    <template #form="{ formData, isEditing }">
      <BultoForm :formData="formData" :isEditing="isEditing" />
    </template>
  </BaseCrudComponent>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useBultoStore } from '@/stores/bulto'
import BaseCrudComponent from '@/components/baseCrud.vue'
import BultoForm from '@/components/bultoForm.vue'

const bultoStore = useBultoStore()
const bultos = ref([])

onMounted(async () => {
  await bultoStore.fetchBultos()
  bultos.value = bultoStore.bultos
})

const createBulto = async (bultoData) => {
  return await bultoStore.createBulto(bultoData)
}

const updateBulto = async (id, bultoData) => {
  return await bultoStore.updateBulto(id, bultoData)
}

const deleteBulto = async (id) => {
  await bultoStore.deleteBulto(id)
}

const onBultoCreated = (newBulto) => {
  console.log('Nuevo bulto creado:', newBulto)
}

const onBultoUpdated = (updatedBulto) => {
  console.log('Bulto actualizado:', updatedBulto)
}

const onBultoDeleted = (deletedBultoId) => {
  console.log('Bulto eliminado:', deletedBultoId)
}
</script>
