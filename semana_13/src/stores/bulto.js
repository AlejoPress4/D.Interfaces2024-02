import { defineStore } from 'pinia'
import { fetchAll, fetchById, create, update, remove, fetchByRemitente } from '@/services/api'

export const useBultoStore = defineStore('bulto', {
  state: () => ({
    bultos: [],
  }),
  actions: {
    async fetchBultos() {
      this.bultos = await fetchAll('bulto')
    },
    async fetchBulto(id) {
      return await fetchById('bulto', id)
    },
    async fetchBultoByRemitente(remitente) {
      return await fetchByRemitente('bulto', remitente)
    },
    async createBulto(bultoData) {
      const newBulto = await create('bulto', bultoData)
      this.bultos.push(newBulto)
      return newBulto
    },
    async updateBulto(id, bultoData) {
      const updatedBulto = await update('bulto', id, bultoData)
      const index = this.bultos.findIndex((b) => b.id === id)
      if (index !== -1) {
        this.bultos[index] = updatedBulto
      }
      return updatedBulto
    },
    async deleteBulto(id) {
      await remove('bulto', id)
      this.bultos = this.bultos.filter((b) => b.id !== id)
    },
  },
})
