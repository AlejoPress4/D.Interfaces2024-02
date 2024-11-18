<template>
  <BaseCrudComponent
    title="Paquetes"
    :items="paquetes"
    :fields="['peso', 'fragil', 'contenido', 'valorDeclarado', 'remitente', 'destinatario']"
    :createItem="createPaquete"
    :updateItem="updatePaquete"
    :deleteItem="deletePaquete"
    @itemCreated="onPaqueteCreated"
    @itemUpdated="onPaqueteUpdated"
    @itemDeleted="onPaqueteDeleted"
  >
    <template #form="{ formData, isEditing }">
      <PaqueteForm :formData="formData" :isEditing="isEditing" />
    </template>
  </BaseCrudComponent>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePaqueteStore } from '@/stores/paquete'
import BaseCrudComponent from '@/components/baseCrud.vue'
import PaqueteForm from '@/components/paqueteForm.vue'

const paqueteStore = usePaqueteStore()
const paquetes = ref([])

onMounted(async () => {
  await paqueteStore.fetchPaquetes()
  paquetes.value = paqueteStore.paquetes
})

const createPaquete = async (paqueteData) => {
  return await paqueteStore.createPaquete(paqueteData)
}

const updatePaquete = async (id, paqueteData) => {
  return await paqueteStore.updatePaquete(id, paqueteData)
}

const deletePaquete = async (id) => {
  await paqueteStore.deletePaquete(id)
}

const onPaqueteCreated = (newPaquete) => {
  console.log('Nuevo paquete creado:', newPaquete)
}

const onPaqueteUpdated = (updatedPaquete) => {
  console.log('Paquete actualizado:', updatedPaquete)
}

const onPaqueteDeleted = (deletedPaqueteId) => {
  console.log('Paquete eliminado:', deletedPaqueteId)
}
</script>
