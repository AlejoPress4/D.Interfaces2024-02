<template>
  <BaseCrudComponent
    title="Cajas"
    :items="cajas"
    :fields="[
      'remitente',
      'destinatario',
      'peso',
      'fragil',
      'contenido',
      'valorDeclarado',
      'ancho',
      'largo',
      'alto',
    ]"
    :createItem="createCaja"
    :updateItem="updateCaja"
    :deleteItem="deleteCaja"
    @itemCreated="onCajaCreated"
    @itemUpdated="onCajaUpdated"
    @itemDeleted="onCajaDeleted"
  >
    <template #form="{ formData, isEditing }">
      <CajaForm :formData="formData" :isEditing="isEditing" />
    </template>
  </BaseCrudComponent>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCajaStore } from '@/stores/caja'
import BaseCrudComponent from '@/components/baseCrud.vue'
import CajaForm from '@/components/cajaForm.vue'

const cajaStore = useCajaStore()
const cajas = ref([])

onMounted(async () => {
  await cajaStore.fetchCajas()
  cajas.value = cajaStore.cajas
})

const createCaja = async (cajaData) => {
  return await cajaStore.createCaja(cajaData)
}

const updateCaja = async (id, cajaData) => {
  return await cajaStore.updateCaja(id, cajaData)
}

const deleteCaja = async (id) => {
  await cajaStore.deleteCaja(id)
}

const onCajaCreated = (newCaja) => {
  console.log('Nueva caja creada:', newCaja)
}

const onCajaUpdated = (updatedCaja) => {
  console.log('Caja actualizada:', updatedCaja)
}

const onCajaDeleted = (deletedCajaId) => {
  console.log('Caja eliminada:', deletedCajaId)
}
</script>
