import { defineStore } from 'pinia'
import { fetchAll, fetchById, create, update, remove, fetchByRemitente } from '@/services/api'

export const usePaqueteStore = defineStore('paquete', {
  state: () => ({
    paquetes: [],
  }),
  actions: {
    async fetchPaquetes() {
      this.paquetes = await fetchAll('paquete')
    },
    async fetchPaquete(id) {
      return await fetchById('paquete', id)
    },
    async fetchPaqueteByRemitente(remitente) {
      return await fetchByRemitente('paquete', remitente)
    },
    async createPaquete(paqueteData) {
      const newPaquete = await create('paquete', paqueteData)
      this.paquetes.push(newPaquete)
      return newPaquete
    },
    async updatePaquete(id, paqueteData) {
      const updatedPaquete = await update('paquete', id, paqueteData)
      const index = this.paquetes.findIndex((p) => p.id === id)
      if (index !== -1) {
        this.paquetes[index] = updatedPaquete
      }
      return updatedPaquete
    },
    async deletePaquete(id) {
      await remove('paquete', id)
      this.paquetes = this.paquetes.filter((p) => p.id !== id)
    },
  },
})
