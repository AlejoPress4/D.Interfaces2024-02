import { defineStore } from 'pinia'
import { fetchAll, fetchById, create, update, remove, fetchSobresByRemitente } from '@/services/api'
import { useToast } from 'vue-toastification'
import { useClienteStore } from './clients.js'

export const useSobreStore = defineStore('sobre', {
  state: () => ({
    sobres: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchSobres() {
      this.loading = true
      this.error = null
      try {
        this.sobres = await fetchAll('sobre')
      } catch (error) {
        this.error = 'Error al cargar los sobres: ' + error.message
        useToast().error(this.error)
      } finally {
        this.loading = false
      }
    },
    async fetchSobre(id) {
      this.loading = true
      this.error = null
      try {
        return await fetchById('sobre', id)
      } catch (error) {
        this.error = `Error al buscar sobre con ID ${id}: ${error.message}`
        useToast().error(this.error)
        throw error
      } finally {
        this.loading = false
      }
    },
    async fetchSobreByRemitente(remitente) {
      this.loading = true
      this.error = null
      try {
        return await fetchSobresByRemitente(remitente)
      } catch (error) {
        this.error = `Error al buscar sobres del remitente ${remitente}: ${error.message}`
        useToast().error(this.error)
        throw error
      } finally {
        this.loading = false
      }
    },
    async createSobre(sobreData) {
      this.loading = true
      this.error = null
      try {
        const newSobre = await create('sobre', sobreData)
        this.sobres.push(newSobre)
        useToast().success('Sobre creado exitosamente')
        return newSobre
      } catch (error) {
        this.error = 'Error al crear el sobre: ' + error.message
        useToast().error(this.error)
        throw error
      } finally {
        this.loading = false
      }
    },
    async updateSobre(id, sobreData) {
      this.loading = true
      this.error = null
      try {
        const updatedSobre = await update('sobre', id, sobreData)
        const index = this.sobres.findIndex((s) => s.id === id)
        if (index !== -1) {
          this.sobres[index] = updatedSobre
        }
        useToast().success('Sobre actualizado exitosamente')
        return updatedSobre
      } catch (error) {
        this.error = `Error al actualizar el sobre: ${error.message}`
        useToast().error(this.error)
        throw error
      } finally {
        this.loading = false
      }
    },
    async deleteSobre(id) {
      this.loading = true
      this.error = null
      try {
        await remove('sobre', id)
        this.sobres = this.sobres.filter((s) => s.id !== id)
        useToast().success('Sobre eliminado exitosamente')
      } catch (error) {
        this.error = `Error al eliminar el sobre: ${error.message}`
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
