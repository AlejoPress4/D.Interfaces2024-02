import { defineStore } from 'pinia'
import { fetchAll, fetchById, create, update, remove, fetchClienteByNombre } from '@/services/api'

export const useClienteStore = defineStore('cliente', {
  state: () => ({
    clientes: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchClientes() {
      this.loading = true
      this.error = null
      try {
        const response = await fetchAll('cliente')
        this.clientes = response
      } catch (error) {
        this.error = 'Error al obtener clientes: ' + error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchCliente(id) {
      this.loading = true
      this.error = null
      try {
        const response = await fetchById('cliente', id)
        return response
      } catch (error) {
        this.error = `Error al obtener cliente con ID ${id}: ${error.message}`
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchClienteByNombre(nombre) {
      this.loading = true
      this.error = null
      try {
        const response = await fetchClienteByNombre(nombre)
        return response
      } catch (error) {
        this.error = `Error al buscar cliente con nombre "${nombre}": ${error.message}`
        throw error
      } finally {
        this.loading = false
      }
    },

    async createCliente(clienteData) {
      this.loading = true
      this.error = null
      try {
        const response = await create('cliente', clienteData)
        this.clientes.push(response)
        return response
      } catch (error) {
        this.error = 'Error al crear cliente: ' + error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateCliente(id, clienteData) {
      this.loading = true
      this.error = null
      try {
        const response = await update('cliente', id, clienteData)
        const index = this.clientes.findIndex((c) => c.id === id)
        if (index !== -1) {
          this.clientes[index] = response
        }
        return response
      } catch (error) {
        this.error = `Error al actualizar cliente con ID ${id}: ${error.message}`
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteCliente(id) {
      this.loading = true
      this.error = null
      try {
        await remove('cliente', id)
        this.clientes = this.clientes.filter((c) => c.id !== id)
      } catch (error) {
        if (error.response?.status === 400) {
          const message =
            error.response.data.message || 'No se puede eliminar el cliente debido a dependencias.'
          const section = this.extractSectionFromMessage(message)
          this.error = `Advertencia: ${message}\nEl cliente está registrado en: ${section || 'una sección desconocida'}.`
        } else {
          this.error = `Error al eliminar cliente con ID ${id}: ${error.message}`
        }
        throw error
      } finally {
        this.loading = false
      }
    },

    extractSectionFromMessage(message) {
      const match = message.match(/registrado en envíos de tipo (\w+)/i)
      return match ? match[1] : null
    },
  },
})
