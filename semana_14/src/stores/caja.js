import { defineStore } from 'pinia'
import { fetchAll, fetchById, create, update, remove, fetchByRemitente } from '@/services/api'
import { useToast } from 'vue-toastification'
import { useClienteStore } from './clients.js'

export const useCajaStore = defineStore('caja', {
  state: () => ({
    cajas: [],
    clientes: [],
    loading: false,
    error: null,
  }),

  actions: {
    // Normalizar la estructura de la caja
    normalizeCaja(caja) {
      return {
        ...caja,
        remitente: caja.remitente || {},
        destinatario: caja.destinatario || {},
        cliente: caja.cliente || {},
        dimensiones: caja.dimensiones || {
          ancho: 0,
          alto: 0,
          largo: 0,
        },
      }
    },

    async fetchCajas() {
      this.loading = true
      this.error = null
      try {
        const response = await fetchAll('caja')
        this.cajas = response.map(this.normalizeCaja)
      } catch (error) {
        this.error = 'Error al cargar las cajas: ' + error.message
        useToast().error(this.error)
      } finally {
        this.loading = false
      }
    },

    async fetchCajaByNroGuia(nroGuia) {
      this.loading = true
      this.error = null
      try {
        const response = await fetchById('caja', nroGuia)
        return this.normalizeCaja(response)
      } catch (error) {
        this.error = `Error al buscar caja con número de guía ${nroGuia}: ${error.message}`
        useToast().error(this.error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchCajasByRemitente(remitente) {
      this.loading = true
      this.error = null
      try {
        const response = await fetchByRemitente('caja', remitente)
        this.cajas = response.map(this.normalizeCaja)
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
        // Asegurar que los IDs de cliente, remitente y destinatario sean correctos
        const dataToSend = {
          ...cajaData,
          cliente: cajaData.cliente?.id || cajaData.cliente,
          remitente: cajaData.remitente?.id || cajaData.remitente,
          destinatario: cajaData.destinatario?.id || cajaData.destinatario,
        }

        const response = await create('caja', dataToSend)
        const newCaja = this.normalizeCaja(response)
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

    async updateCaja(nroGuia, cajaData) {
      this.loading = true
      this.error = null
      try {
        // Asegurar que los IDs de cliente, remitente y destinatario sean correctos
        const dataToSend = {
          ...cajaData,
          cliente: cajaData.cliente?.id || cajaData.cliente,
          remitente: cajaData.remitente?.id || cajaData.remitente,
          destinatario: cajaData.destinatario?.id || cajaData.destinatario,
        }

        const response = await update('caja', nroGuia, dataToSend)
        const updatedCaja = this.normalizeCaja(response)

        const index = this.cajas.findIndex((c) => c.nroGuia === nroGuia)
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

    async deleteCaja(nroGuia) {
      this.loading = true
      this.error = null
      try {
        await remove('caja', nroGuia)
        this.cajas = this.cajas.filter((c) => c.nroGuia !== nroGuia)
        useToast().success('Caja eliminada exitosamente')
      } catch (error) {
        this.error = `Error al eliminar la caja: ${error.message}`
        useToast().error(this.error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchClientesForSelect() {
      const clienteStore = useClienteStore()
      await clienteStore.fetchClientes()
      this.clientes = clienteStore.clientes
      return this.clientes
    },
  },
})
