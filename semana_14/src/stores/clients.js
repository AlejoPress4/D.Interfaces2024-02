import { defineStore } from 'pinia'
import { fetchAll, fetchById, create, update, remove, fetchClienteByNombre } from '@/services/api'
import { useToast } from 'vue-toastification'

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
        useToast().success('Clientes cargados exitosamente')
      } catch (error) {
        this.error = 'Error al obtener clientes: ' + error.message
        useToast().error(this.error)
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
        useToast().success('Cliente encontrado')
        return response
      } catch (error) {
        this.error = `Error al obtener cliente con ID ${id}: ${error.message}`
        useToast().error(this.error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async searchClientes(query) {
      this.loading = true
      this.error = null
      try {
        let result
        if (query.match(/^[0-9a-fA-F]{24}$/)) {
          // Si el query parece ser un ID de MongoDB
          result = await this.fetchCliente(query)
          result = result ? [result] : []
        } else {
          result = await fetchClienteByNombre(query)
        }
        this.clientes = Array.isArray(result) ? result : [result]
        useToast().success(`Se encontraron ${this.clientes.length} cliente(s)`)
        return this.clientes
      } catch (error) {
        this.error = `Error al buscar clientes: ${error.message}`
        useToast().error(this.error)
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
        useToast().success('Cliente creado exitosamente')
        return response
      } catch (error) {
        this.error = 'Error al crear cliente: ' + error.message
        useToast().error(this.error)
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
        useToast().success('Cliente actualizado exitosamente')
        return response
      } catch (error) {
        this.error = `Error al actualizar cliente con ID ${id}: ${error.message}`
        useToast().error(this.error)
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
        useToast().success('Cliente eliminado exitosamente')
      } catch (error) {
        if (error.response?.status === 400) {
          const message =
            error.response.data.message || 'No se puede eliminar el cliente debido a dependencias.'
          const section = this.extractSectionFromMessage(message)
          this.error = `Advertencia: ${message}\nEl cliente está registrado en: ${section || 'una sección desconocida'}.`
        } else {
          this.error = `Error al eliminar cliente con ID ${id}: ${error.message}`
        }
        useToast().error(this.error)
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
