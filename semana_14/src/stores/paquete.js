import { defineStore } from 'pinia'
import { fetchAll, fetchById, create, update, remove } from '@/services/api'
import { useToast } from 'vue-toastification'

export const usePaqueteStore = defineStore('paquete', {
  state: () => ({
    paquetes: [],
    paquete: null,
    loading: false,
    error: null,
  }),
  actions: {
    // Obtener todos los paquetes
    async fetchPaquetes() {
      this.loading = true
      this.error = null
      try {
        const response = await fetchAll('paquete')
        this.paquetes = response
        useToast().success('Paquetes cargados exitosamente')
      } catch (error) {
        this.error = 'Error al cargar paquetes: ' + error
        useToast().error(this.error)
        throw error
      } finally {
        this.loading = false
      }
    },

    // Crear un nuevo paquete
    async createPaquete(paqueteData) {
      this.loading = true
      this.error = null
      try {
        const response = await create('paquete', paqueteData)
        this.paquetes.push(response)
        useToast().success('Paquete creado exitosamente')
        return response
      } catch (error) {
        this.error = 'Error al crear paquete: ' + error
        useToast().error(this.error)
        throw error
      } finally {
        this.loading = false
      }
    },

    // Actualizar un paquete existente
    async updatePaquete(id, paqueteData) {
      this.loading = true
      this.error = null
      try {
        const response = await update('paquete', id, paqueteData)
        const index = this.paquetes.findIndex((p) => p.id === id)
        if (index !== -1) {
          this.paquetes[index] = response
        }
        useToast().success('Paquete actualizado exitosamente')
        return response
      } catch (error) {
        this.error = `Error al actualizar paquete con ID ${id}: ${error}`
        useToast().error(this.error)
        throw error
      } finally {
        this.loading = false
      }
    },

    // Eliminar un paquete
    async deletePaquete(id) {
      this.loading = true
      this.error = null
      try {
        await remove('paquete', id)
        this.paquetes = this.paquetes.filter((p) => p.id !== id)
        useToast().success('Paquete eliminado exitosamente')
      } catch (error) {
        this.error = `Error al eliminar paquete con ID ${id}: ${error}`
        useToast().error(this.error)
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
