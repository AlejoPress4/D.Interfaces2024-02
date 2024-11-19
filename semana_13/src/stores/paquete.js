import { defineStore } from 'pinia'
import { fetchAll, fetchById, create, update, remove, fetchByRemitente } from '@/services/api'
import { useToast } from 'vue-toastification'
import { useClienteStore } from './clients.js'

export const usePaqueteStore = defineStore('paquete', {
  state: () => ({
    paquetes: [],
    loading: false,
    error: null,
  }),
  actions: {
    setLoading(value) {
      this.loading = value
    },
    setError(error) {
      this.error = error
      useToast().error(this.error)
    },
    setPaquetes(paquetes) {
      this.paquetes = paquetes
    },
    async fetchPaquetes() {
      this.setLoading(true)
      this.setError(null)
      try {
        const paquetes = await fetchAll('paquete')
        this.setPaquetes(paquetes)
      } catch (error) {
        this.setError('Error al cargar los paquetes: ' + error.message)
      } finally {
        this.setLoading(false)
      }
    },
    async fetchPaquete(id) {
      this.setLoading(true)
      this.setError(null)
      try {
        return await fetchById('paquete', id)
      } catch (error) {
        this.setError(`Error al buscar paquete con ID ${id}: ${error.message}`)
        throw error
      } finally {
        this.setLoading(false)
      }
    },
    async fetchPaqueteByRemitente(remitente) {
      this.setLoading(true)
      this.setError(null)
      try {
        return await fetchByRemitente('paquete', remitente)
      } catch (error) {
        this.setError(`Error al buscar paquetes del remitente ${remitente}: ${error.message}`)
        throw error
      } finally {
        this.setLoading(false)
      }
    },
    async createPaquete(paqueteData) {
      this.setLoading(true)
      this.setError(null)
      try {
        const newPaquete = await create('paquete', paqueteData)
        this.paquetes = [...this.paquetes, newPaquete]
        useToast().success('Paquete creado exitosamente')
        return newPaquete
      } catch (error) {
        this.setError('Error al crear el paquete: ' + error.message)
        throw error
      } finally {
        this.setLoading(false)
      }
    },
    async updatePaquete(id, paqueteData) {
      this.setLoading(true)
      this.setError(null)
      try {
        const updatedPaquete = await update('paquete', id, paqueteData)
        this.paquetes = this.paquetes.map((p) => (p.id === id ? updatedPaquete : p))
        useToast().success('Paquete actualizado exitosamente')
        return updatedPaquete
      } catch (error) {
        this.setError(`Error al actualizar el paquete: ${error.message}`)
        throw error
      } finally {
        this.setLoading(false)
      }
    },
    async deletePaquete(id) {
      this.setLoading(true)
      this.setError(null)
      try {
        await remove('paquete', id)
        this.paquetes = this.paquetes.filter((p) => p.id !== id)
        useToast().success('Paquete eliminado exitosamente')
      } catch (error) {
        this.setError(`Error al eliminar el paquete: ${error.message}`)
        throw error
      } finally {
        this.setLoading(false)
      }
    },
    async fetchClientes() {
      const clienteStore = useClienteStore()
      await clienteStore.fetchClientes()
      return clienteStore.clientes
    },
  },
})
