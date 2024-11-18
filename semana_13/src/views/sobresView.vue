<template>
  <BaseCrudComponent
    title="Sobres"
    :items="sobres"
    :fields="['remitente', 'destinatario', 'contenido', 'certificado']"
    :createItem="createSobre"
    :updateItem="updateSobre"
    :deleteItem="deleteSobre"
    @itemCreated="onSobreCreated"
    @itemUpdated="onSobreUpdated"
    @itemDeleted="onSobreDeleted"
  >
    <template #form="{ formData, isEditing }">
      <SobreForm :formData="formData" :isEditing="isEditing" />
    </template>
  </BaseCrudComponent>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSobreStore } from '@/stores/sobre.js'
import BaseCrudComponent from '@/components/baseCrud.vue'
import SobreForm from '@/components/sobreform.vue' //mayuscula???

const sobreStore = useSobreStore()
const sobres = ref([])

onMounted(async () => {
  await sobreStore.fetchSobres()
  sobres.value = sobreStore.sobres
})

const createSobre = async (sobreData) => {
  return await sobreStore.createSobre(sobreData)
}

const updateSobre = async (id, sobreData) => {
  return await sobreStore.updateSobre(id, sobreData)
}

const deleteSobre = async (id) => {
  await sobreStore.deleteSobre(id)
}

const onSobreCreated = (newSobre) => {
  console.log('Nuevo sobre creado:', newSobre)
}

const onSobreUpdated = (updatedSobre) => {
  console.log('Sobre actualizado:', updatedSobre)
}

const onSobreDeleted = (deletedSobreId) => {
  console.log('Sobre eliminado:', deletedSobreId)
}
</script>
