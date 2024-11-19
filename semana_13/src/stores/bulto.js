import { defineStore } from 'pinia'
import { fetchAll, fetchById, create, update, remove, fetchBultosByRemitente } from '@/services/api'
import { useToast } from 'vue-toastification'
import { useClienteStore } from './clients.js'

export const useBultoStore = defineStore('bulto', {
  state: () => ({
    bultos: [],
    loading: false,
    error: null,
  }),

  actions: {
    normalizeContacto(contacto) {
      if (!contacto) return null
      if (typeof contacto === 'string') {
        try {
          contacto = JSON.parse(contacto)
        } catch (e) {
          return null
        }
      }
      return {
        id: contacto.id,
        nombre: contacto.nombre,
        ciudad: contacto.ciudad,
        direccion: contacto.direccion,
        telefono: contacto.telefono,
      }
    },

    normalizeBulto(bulto) {
      if (!bulto) return null
      return {
        ...bulto,
        remitente: this.normalizeContacto(bulto.remitente),
        destinatario: this.normalizeContacto(bulto.destinatario),
      }
    },

    async fetchBultos() {
      this.loading = true
      this.error = null
      try {
        const response = await fetchAll('bulto')
        this.bultos = Array.isArray(response) ? response.map((b) => this.normalizeBulto(b)) : []
      } catch (error) {
        this.error = 'Error al cargar los bultos: ' + error.message
        useToast().error(this.error)
      } finally {
        this.loading = false
      }
    },

    async fetchBulto(id) {
      this.loading = true
      this.error = null
      try {
        const response = await fetchById('bulto', id)
        return this.normalizeBulto(response)
      } catch (error) {
        if (error.response?.status === 404) {
          useToast().warning('No se encontró el bulto especificado')
          return null
        }
        this.error = `Error al buscar bulto con ID ${id}: ${error.message}`
        useToast().error(this.error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async searchBultos(criteria) {
      this.loading = true
      this.error = null
      try {
        let results = []

        if (!isNaN(criteria) && criteria.trim() !== '') {
          const response = await fetchAll('bulto')
          results = response.filter((b) => b.peso === parseFloat(criteria))
        } else {
          results = await fetchBultosByRemitente(criteria)
        }

        this.bultos = results.map((b) => this.normalizeBulto(b))

        if (this.bultos.length === 0) {
          useToast().info('No se encontraron bultos con ese criterio')
        }
      } catch (error) {
        this.error = `Error en la búsqueda: ${error.message}`
        useToast().error(this.error)
      } finally {
        this.loading = false
      }
    },

    async createBulto(bultoData) {
      this.loading = true
      this.error = null
      try {
        const response = await create('bulto', bultoData)
        const newBulto = this.normalizeBulto(response)
        this.bultos.push(newBulto)
        useToast().success('Bulto creado exitosamente')
        return newBulto
      } catch (error) {
        this.error = 'Error al crear el bulto: ' + error.message
        useToast().error(this.error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateBulto(id, bultoData) {
      this.loading = true
      this.error = null
      try {
        const response = await update('bulto', id, bultoData)
        const updatedBulto = this.normalizeBulto(response)
        const index = this.bultos.findIndex((b) => b.id === id)
        if (index !== -1) {
          this.bultos[index] = updatedBulto
        }
        useToast().success('Bulto actualizado exitosamente')
        return updatedBulto
      } catch (error) {
        this.error = `Error al actualizar el bulto: ${error.message}`
        useToast().error(this.error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteBulto(id) {
      this.loading = true
      this.error = null
      try {
        await remove('bulto', id)
        this.bultos = this.bultos.filter((b) => b.id !== id)
        useToast().success('Bulto eliminado exitosamente')
      } catch (error) {
        this.error = `Error al eliminar el bulto: ${error.message}`
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
