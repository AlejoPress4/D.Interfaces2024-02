import { defineStore } from 'pinia'
import { fetchAll, fetchById, create, update, remove } from '@/services/api'
import { useToast } from 'vue-toastification'

export const useBultoStore = defineStore('bulto', {
  state: () => ({
    bultos: [],
    loading: false,
    error: null,
  }),

  actions: {
    normalizeBulto(bulto) {
      return {
        ...bulto,
        remitente: bulto.remitente || {},
        destinatario: bulto.destinatario || {},
      }
    },

    async fetchBultos() {
      this.loading = true
      try {
        const response = await fetchAll('bulto')
        this.bultos = response.map(this.normalizeBulto)
      } catch (error) {
        this.error = `Error al cargar los bultos: ${error.message}`
        useToast().error(this.error)
      } finally {
        this.loading = false
      }
    },

    async fetchBultoById(id) {
      this.loading = true
      try {
        const response = await fetchById('bulto', id)
        return this.normalizeBulto(response)
      } catch (error) {
        this.error = `Error al cargar el bulto: ${error.message}`
        useToast().error(this.error)
      } finally {
        this.loading = false
      }
    },

    async createBulto(bultoData) {
      this.loading = true
      try {
        const response = await create('bulto', bultoData)
        this.bultos.push(this.normalizeBulto(response))
        useToast().success('Bulto creado exitosamente')
      } catch (error) {
        this.error = `Error al crear el bulto: ${error.message}`
        useToast().error(this.error)
      } finally {
        this.loading = false
      }
    },

    async updateBulto(nroGuia, bultoData) {
      this.loading = true
      try {
        const response = await update(`bulto/${nroGuia}`, bultoData)
        const index = this.bultos.findIndex((b) => b.nroGuia === nroGuia)
        if (index !== -1) {
          this.bultos[index] = this.normalizeBulto(response)
        }
        useToast().success('Bulto actualizado exitosamente')
      } catch (error) {
        this.error = `Error al actualizar el bulto: ${error.message}`
        useToast().error(this.error)
      } finally {
        this.loading = false
      }
    },

    async deleteBulto(nroGuia) {
      this.loading = true
      try {
        await remove(`bulto/${nroGuia}`)
        this.bultos = this.bultos.filter((b) => b.nroGuia !== nroGuia)
        useToast().success('Bulto eliminado exitosamente')
      } catch (error) {
        this.error = `Error al eliminar el bulto: ${error.message}`
        useToast().error(this.error)
      } finally {
        this.loading = false
      }
    },
  },
})
