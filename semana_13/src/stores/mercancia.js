import { defineStore } from 'pinia'
import { fetchAll, fetchById, create, update, remove, fetchByNombre } from '@/services/api'

export const useMercanciaStore = defineStore('mercancia', {
  state: () => ({
    mercancias: [],
  }),
  actions: {
    async fetchMercancias() {
      this.mercancias = await fetchAll('mercancia')
    },
    async fetchMercancia(id) {
      return await fetchById('mercancia', id)
    },
    async fetchMercanciaByNombre(nombre) {
      return await fetchByNombre('mercancia', nombre)
    },
    async createMercancia(mercanciaData) {
      const newMercancia = await create('mercancia', mercanciaData)
      this.mercancias.push(newMercancia)
      return newMercancia
    },
    async updateMercancia(id, mercanciaData) {
      const updatedMercancia = await update('mercancia', id, mercanciaData)
      const index = this.mercancias.findIndex((m) => m.id === id)
      if (index !== -1) {
        this.mercancias[index] = updatedMercancia
      }
      return updatedMercancia
    },
    async deleteMercancia(id) {
      await remove('mercancia', id)
      this.mercancias = this.mercancias.filter((m) => m.id !== id)
    },
  },
})
