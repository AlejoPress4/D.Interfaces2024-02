import { defineStore } from 'pinia'
import { fetchAll, fetchById, create, update, remove, fetchByRemitente } from '@/services/api'
import { useToast } from 'vue-toastification'

export const usePaqueteStore = defineStore('paquete', {
  state: () => ({
    paquetes: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchPaquetes() {
      this.loading = true
      this.error = null
      try {
        this.paquetes = await fetchAll('paquete')
        useToast().success('Paquetes cargados exitosamente')
      } catch (error) {
        this.error = 'Error al cargar los paquetes: ' + error
        useToast().error(this.error)
      } finally {
        this.loading = false
      }
    },

    async fetchPaquete(id) {
      this.loading = true
      this.error = null
      try {
        const paquete = await fetchById('paquete', id)
        useToast().success('Paquete encontrado')
        return paquete
      } catch (error) {
        this.error = `Error al buscar paquete con ID ${id}: ${error}`
        useToast().error(this.error)
        return null
      } finally {
        this.loading = false
      }
    },

    async searchPaquetes(query) {
      this.loading = true
      this.error = null
      try {
        let result
        if (query.match(/^[0-9a-fA-F]{24}$/)) {
          // Si el query parece ser un ID de MongoDB
          result = await this.fetchPaquete(query)
          result = result ? [result] : []
        } else {
          result = await fetchByRemitente('paquete', query)
        }
        this.paquetes = Array.isArray(result) ? result : [result]
        useToast().success(`Se encontraron ${this.paquetes.length} paquete(s)`)
        return this.paquetes
      } catch (error) {
        this.error = `Error al buscar paquetes: ${error}`
        useToast().error(this.error)
        return []
      } finally {
        this.loading = false
      }
    },

    async createPaquete(paqueteData) {
      this.loading = true
      this.error = null
      try {
        const newPaquete = await create('paquete', paqueteData)
        this.paquetes.push(newPaquete)
        useToast().success('Paquete creado exitosamente')
        return newPaquete
      } catch (error) {
        this.error = 'Error al crear el paquete: ' + error
        useToast().error(this.error)
        return null
      } finally {
        this.loading = false
      }
    },

    async updatePaquete(id, paqueteData) {
      this.loading = true
      this.error = null
      try {
        const updatedPaquete = await update('paquete', id, paqueteData)
        const index = this.paquetes.findIndex((p) => p.id === id)
        if (index !== -1) {
          this.paquetes[index] = updatedPaquete
        }
        useToast().success('Paquete actualizado exitosamente')
        return updatedPaquete
      } catch (error) {
        this.error = `Error al actualizar el paquete: ${error}`
        useToast().error(this.error)
        return null
      } finally {
        this.loading = false
      }
    },

    async deletePaquete(id) {
      this.loading = true
      this.error = null
      try {
        await remove('paquete', id)
        this.paquetes = this.paquetes.filter((p) => p.id !== id)
        useToast().success('Paquete eliminado exitosamente')
      } catch (error) {
        this.error = `Error al eliminar el paquete: ${error}`
        useToast().error(this.error)
      } finally {
        this.loading = false
      }
    },
  },
})
