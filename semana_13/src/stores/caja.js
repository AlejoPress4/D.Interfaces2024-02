import { defineStore } from 'pinia'
import { fetchAll, fetchById, create, update, remove, fetchCajasByRemitente } from '@/services/api'
import { useToast } from 'vue-toastification'
import { useClienteStore } from './clients.js'

export const useCajaStore = defineStore('caja', {
  state: () => ({
    cajas: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchCajas() {
      this.loading = true
      this.error = null
      try {
        this.cajas = await fetchAll('caja')
      } catch (error) {
        this.error = 'Error al cargar las cajas: ' + error.message
        useToast().error(this.error)
      } finally {
        this.loading = false
      }
    },
    async fetchCaja(id) {
      this.loading = true
      this.error = null
      try {
        return await fetchById('caja', id)
      } catch (error) {
        this.error = `Error al buscar caja con ID ${id}: ${error.message}`
        useToast().error(this.error)
        throw error
      } finally {
        this.loading = false
      }
    },
    async fetchCajaByRemitente(remitente) {
      this.loading = true
      this.error = null
      try {
        return await fetchCajasByRemitente(remitente)
      } catch (error) {
        this.error = `Error al buscar cajas del remitente ${remitente}: ${error.message}`
        useToast().error(this.error)
        throw error
      } finally {
        this.loading = false
      }
    },
    async createCaja(cajaData) {
      this.loading = true
      this.error = null
      try {
        const newCaja = await create('caja', cajaData)
        this.cajas.push(newCaja)
        useToast().success('Caja creada exitosamente')
        return newCaja
      } catch (error) {
        this.error = 'Error al crear la caja: ' + error.message
        useToast().error(this.error)
        throw error
      } finally {
        this.loading = false
      }
    },
    async updateCaja(id, cajaData) {
      this.loading = true
      this.error = null
      try {
        const updatedCaja = await update('caja', id, cajaData)
        const index = this.cajas.findIndex((c) => c.id === id)
        if (index !== -1) {
          this.cajas[index] = updatedCaja
        }
        useToast().success('Caja actualizada exitosamente')
        return updatedCaja
      } catch (error) {
        this.error = `Error al actualizar la caja: ${error.message}`
        useToast().error(this.error)
        throw error
      } finally {
        this.loading = false
      }
    },
    async deleteCaja(id) {
      this.loading = true
      this.error = null
      try {
        await remove('caja', id)
        this.cajas = this.cajas.filter((c) => c.id !== id)
        useToast().success('Caja eliminada exitosamente')
      } catch (error) {
        this.error = `Error al eliminar la caja: ${error.message}`
        useToast().error(this.error)
        throw error
      } finally {
        this.loading = false
      }
    },
    async fetchClientes() {
      const clienteStore = useClienteStore()
      await clienteStore.fetchClientes()
      return clienteStore.clientes
    },
  },
})
