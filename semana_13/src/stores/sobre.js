import { defineStore } from 'pinia'
import { fetchAll, fetchById, create, update, remove, fetchSobresByRemitente } from '@/services/api'

export const useSobreStore = defineStore('sobre', {
  state: () => ({
    sobres: [],
  }),
  actions: {
    async fetchSobres() {
      this.sobres = await fetchAll('sobre')
    },
    async fetchSobre(id) {
      return await fetchById('sobre', id)
    },
    async fetchSobreByRemitente(remitente) {
      return await fetchSobresByRemitente(remitente)
    },
    async createSobre(sobreData) {
      const newSobre = await create('sobre', sobreData)
      this.sobres.push(newSobre)
      return newSobre
    },
    async updateSobre(id, sobreData) {
      const updatedSobre = await update('sobre', id, sobreData)
      const index = this.sobres.findIndex((s) => s.id === id)
      if (index !== -1) {
        this.sobres[index] = updatedSobre
      }
      return updatedSobre
    },
    async deleteSobre(id) {
      await remove('sobre', id)
      this.sobres = this.sobres.filter((s) => s.id !== id)
    },
  },
})
