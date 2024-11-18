import { defineStore } from 'pinia'
import { fetchAll, fetchById, create, update, remove, fetchClienteByNombre } from '@/services/api'

export const useClienteStore = defineStore('cliente', {
  state: () => ({
    clientes: [],
  }),
  actions: {
    async fetchClientes() {
      this.clientes = await fetchAll('cliente')
      console.log(this.clientes)
    },
    async fetchCliente(id) {
      return await fetchById('cliente', id)
    },
    async fetchClienteByNombre(nombre) {
      return await fetchClienteByNombre(nombre)
    },
    async createCliente(clienteData) {
      const newCliente = await create('cliente', clienteData)
      this.clientes.push(newCliente)
      return newCliente
    },
    async updateCliente(id, clienteData) {
      const updatedCliente = await update('cliente', id, clienteData)
      const index = this.clientes.findIndex((c) => c.id === id)
      if (index !== -1) {
        this.clientes[index] = updatedCliente
      }
      return updatedCliente
    },
    async deleteCliente(id) {
      await remove('cliente', id)
      this.clientes = this.clientes.filter((c) => c.id !== id)
    },
  },
})
