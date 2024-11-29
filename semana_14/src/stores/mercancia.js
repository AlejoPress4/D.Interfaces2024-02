import { defineStore } from 'pinia'
import { fetchAll, fetchById, create, update, remove, fetchMercanciaByNombre } from '@/services/api'

export const useMercanciaStore = defineStore('mercancia', {
  state: () => ({
    mercancias: [],
    clientes: [],
    loading: false,
    error: null,
  }),

  actions: {
    // Normaliza la estructura de la mercancía para asegurar consistencia
    normalizeMercancia(mercancia) {
      if (!mercancia) return null

      // Asegurarse de que el cliente tenga la estructura correcta
      let clienteNormalizado = mercancia.cliente
      if (typeof mercancia.cliente === 'string') {
        // Si el cliente es un ID, buscar en la lista de clientes
        const clienteEncontrado = this.clientes.find((c) => c.id === mercancia.cliente)
        if (clienteEncontrado) {
          clienteNormalizado = clienteEncontrado
        }
      }

      return {
        ...mercancia,
        cliente: clienteNormalizado,
      }
    },

    async fetchMercancias() {
      this.loading = true
      this.error = null
      try {
        const response = await fetchAll('mercancia')
        // Normalizar cada mercancía antes de guardarla
        this.mercancias = Array.isArray(response)
          ? response.map((m) => this.normalizeMercancia(m))
          : []
      } catch (error) {
        this.error = 'Error al obtener mercancías: ' + error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchMercancia(id) {
      this.loading = true
      this.error = null
      try {
        const response = await fetchById('mercancia', id)
        if (!response) return null

        // Asegurarse de tener la lista de clientes actualizada
        if (this.clientes.length === 0) {
          await this.fetchClientesForSelect()
        }

        // Normalizar la mercancía antes de devolverla
        return this.normalizeMercancia(response)
      } catch (error) {
        if (error.response?.status === 404) {
          return null
        }
        this.error = `Error al buscar mercancía con ID ${id}: ${error.message}`
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchMercanciaByNombre(nombre) {
      this.loading = true
      this.error = null
      try {
        const response = await fetchMercanciaByNombre(nombre)
        if (!response) return []

        // Asegurarse de tener la lista de clientes actualizada
        if (this.clientes.length === 0) {
          await this.fetchClientesForSelect()
        }

        // Normalizar los resultados
        const mercancias = Array.isArray(response) ? response : [response]
        return mercancias.map((m) => this.normalizeMercancia(m))
      } catch (error) {
        this.error = `Error al buscar mercancía por nombre "${nombre}": ${error.message}`
        throw error
      } finally {
        this.loading = false
      }
    },

    async createMercancia(mercanciaData) {
      this.loading = true
      this.error = null
      try {
        // Asegurarse de enviar solo el ID del cliente si es un objeto
        const dataToSend = {
          ...mercanciaData,
          cliente: mercanciaData.cliente?.id || mercanciaData.cliente,
        }

        const response = await create('mercancia', dataToSend)
        return this.normalizeMercancia(response)
      } catch (error) {
        this.error = 'Error al crear mercancía: ' + error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateMercancia(id, mercanciaData) {
      this.loading = true
      this.error = null
      try {
        // Asegurarse de enviar solo el ID del cliente si es un objeto
        const dataToSend = {
          ...mercanciaData,
          cliente: mercanciaData.cliente?.id || mercanciaData.cliente,
        }

        const response = await update('mercancia', id, dataToSend)
        return this.normalizeMercancia(response)
      } catch (error) {
        this.error = `Error al actualizar mercancía con ID ${id}: ${error.message}`
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteMercancia(id) {
      this.loading = true
      this.error = null
      try {
        await remove('mercancia', id)
      } catch (error) {
        this.error = `Error al eliminar mercancía con ID ${id}: ${error.message}`
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchClientesForSelect() {
      this.loading = true
      this.error = null
      try {
        const response = await fetchAll('cliente')
        this.clientes = Array.isArray(response) ? response : []
      } catch (error) {
        this.error = 'Error al obtener lista de clientes: ' + error.message
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
