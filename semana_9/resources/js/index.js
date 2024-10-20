import Helpers from './helpers.js'

class App {
  static #urlAPI = 'http://localhost:7070'

  static async main() {
    const listOptions = document.querySelectorAll('#main-menu a')
    listOptions.forEach(item => item.addEventListener('click', App.#mainMenu))
  }

  static #mainMenu = async e => {
    let option = 'ninguna'
    if (e !== undefined) {
      e.preventDefault()
      option = e.target.text
    }

    switch (option) {
      case 'Listado de clientes':
        await Helpers.loadPage('./resources/html/customer-list.html', 'main')
        await App.#createCustomerTable()
        break
      case 'Nuevo cliente':
        await Helpers.loadPage('./resources/html/new-customer.html', 'main')
        App.#createCustomers()
        break
      case 'Buscar|Actualizar':
        await Helpers.loadPage('./resources/html/update-customer.html', 'main')
        App.#searchCustomers()
        break
      case 'Eliminar':
        await Helpers.loadPage('./resources/html/delete-customer.html', 'main')
        App.#deleteCustomers()
        break
      default:
        console.warn(`Problemas con la opción "${option}"`)
    }
  }

  static async #createCustomerTable() {
    // ejemplo de una petición get: ver ./resources/assets/Peticiones.http, línea 154
    const response = await Helpers.fetchData(`${App.#urlAPI}/cliente`)
    if ((response.message = 'ok')) {
      const tableHeader = `
        <tr>
          <th>Identificación</th>
          <th>Nombre</th>
          <th>Dirección</th>
          <th>Teléfono</th>
          <th>Ciudad</th>
        </tr>
      `
      let tableRows = ''
      response.data.forEach(c => {
        tableRows += `
          <tr>
            <td>${c.id}</td>
            <td>${c.nombre}</td>
            <td>${c.direccion}</td>
            <td>${c.telefono}</td>
            <td>${c.ciudad}</td>
          </tr>
        `
      })

      const table = `
        <table>
          ${tableHeader}
          ${tableRows}
        </table>      
      `
      document.querySelector('#customer-list').insertAdjacentHTML('beforeend', table)
    }
  }

  static #createCustomers() {
    document.querySelector('#add-customer').addEventListener('click', async e => {
      e.preventDefault()

      if (!Helpers.okForm('#new-customer')) {
        return
      }

      const response = await Helpers.fetchData(`${App.#urlAPI}/cliente`, {
        method: 'POST',
        body: App.#getBody(),
      })

      const messageElement = document.createElement('div')
      messageElement.classList.add('message')

      if (response.message === 'ok') {
        console.info('Cliente agregado', response.data)
        messageElement.textContent = 'Cliente agregado exitosamente'
        messageElement.classList.add('success')
        document.querySelector('#new-customer').reset()
      } else {
        console.warn('No se pudo agregar el registro', response)
        messageElement.textContent = 'Error al agregar el cliente'
        messageElement.classList.add('error')
      }

      document.querySelector('#create-customers').appendChild(messageElement)
      setTimeout(() => {
        messageElement.remove()
      }, 5000)
    })
  }

  static #searchCustomers() {
    // cuando se pulse el botón "Buscar"...
    document.querySelector('#search-customer').addEventListener('click', async e => {
      e.preventDefault()
      // Buscar el ID dado...
      const id = document.querySelector('#id').value
      const response = await Helpers.fetchData(`${App.#urlAPI}/cliente/id/${id}`)

      // si se encuentra el registro, mostrar los datos
      if ((response.message = 'ok')) {
        document.querySelector('#id').value = response.id || ''
        document.querySelector('#nombre').value = response.nombre || ''
        document.querySelector('#direccion').value = response.direccion || ''
        document.querySelector('#telefono').value = response.telefono || ''
        document.querySelector('#ciudad').value = response.ciudad || ''
      }
    })

    App.updateCustomer()
  }

  static updateCustomer() {
    document.querySelector('#update').addEventListener('click', async e => {
      e.preventDefault()
      const id = document.querySelector('#id').value
      const response = await Helpers.fetchData(`${App.#urlAPI}/cliente/${id}`, {
        method: 'PATCH',
        body: App.#getBody(),
      })

      if (response.message == 'ok') {
        console.info('Registro actualizado', response.data)
      } else {
        console.warn(response)
      }
    })
  }

  static #getBody() {
    return {
      id: document.querySelector('#id').value,
      nombre: document.querySelector('#nombre').value,
      direccion: document.querySelector('#direccion').value,
      ciudad: document.querySelector('#ciudad').value,
      telefono: document.querySelector('#telefono').value,
    }
  }

  static #deleteCustomers() {
    document.querySelector('#delete-customer').addEventListener('click', async e => {
      e.preventDefault()
      const id = document.querySelector('#id').value
      const form = document.querySelector('#new-customer')
  
      if (!Helpers.validateId(id)) {
        Helpers.showMessage(form, 'ID inválido. Debe tener entre 5 y 15 caracteres.', false)
        return
      }
  
      try {
        const response = await Helpers.fetchData(`${App.#urlAPI}/cliente/${id}`, {
          method: 'DELETE',
        })
  
        if (response.message === 'ok') {
          console.info('Cliente eliminado', response.data)
          Helpers.showMessage(form, 'Cliente eliminado exitosamente', true)
          document.querySelector('#id').value = ''
        } else {
          console.warn('No se pudo eliminar el cliente', response)
          Helpers.showMessage(form, 'Error al eliminar el cliente', false)
        }
      } catch (error) {
        console.error('Error al eliminar el cliente:', error)
        Helpers.showMessage(form, 'Error al eliminar el cliente. Intente nuevamente.', false)
      }
    })
  }
}

App.main()
