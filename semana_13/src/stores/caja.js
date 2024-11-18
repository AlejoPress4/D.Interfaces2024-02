import { defineStore } from 'pinia'
import { fetchAll, fetchById, create, update, remove, fetchByRemitente } from '@/services/api'

export const useCajaStore = defineStore('caja', {
  state: () => ({
    cajas: [],
  }),
  actions: {
    async fetchCajas() {
      this.cajas = await fetchAll('caja')
    },
    async fetchCaja(id) {
      return await fetchById('caja', id)
    },
    async fetchCajaByRemitente(remitente) {
      return await fetchByRemitente('caja', remitente)
    },
    async createCaja(cajaData) {
      const newCaja = await create('caja', cajaData)
      this.cajas.push(newCaja)
      return newCaja
    },
    async updateCaja(id, cajaData) {
      const updatedCaja = await update('caja', id, cajaData)
      const index = this.cajas.findIndex((c) => c.id === id)
      if (index !== -1) {
        this.cajas[index] = updatedCaja
      }
      return updatedCaja
    },
    async deleteCaja(id) {
      await remove('caja', id)
      this.cajas = this.cajas.filter((c) => c.id !== id)
    },
  },
})
