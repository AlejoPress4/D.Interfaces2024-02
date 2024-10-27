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
      case 'Agregar Mercancia':
        await Helpers.loadPage('./resources/html/add-merchandise.html', 'main')
        App.#addMerchandise()
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

      const customerData = App.#getBody()
      let isValid = true
      let errorMessage = ''

      if (!Helpers.validateId(customerData.id)) {
        isValid = false
        errorMessage += 'ID inválido. Debe tener entre 5 y 15 caracteres.\n'
      }
      if (!Helpers.validateName(customerData.nombre)) {
        isValid = false
        errorMessage += 'Nombre inválido. Debe tener entre 1 y 50 caracteres.\n'
      }
      if (!Helpers.validateAddress(customerData.direccion)) {
        isValid = false
        errorMessage += 'Dirección inválida. Debe tener al menos 10 caracteres.\n'
      }
      if (!Helpers.validatePhone(customerData.telefono)) {
        isValid = false
        errorMessage += 'Teléfono inválido. Debe ser un número válido de Colombia.\n'
      }
      if (!Helpers.validateCity(customerData.ciudad)) {
        isValid = false
        errorMessage += 'Ciudad inválida. Debe tener entre 4 y 50 caracteres.\n'
      }

      if (!isValid) {
        Helpers.showMessage(document.querySelector('#create-customers'), errorMessage, false)
        return
      }

      const response = await Helpers.fetchData(`${App.#urlAPI}/cliente`, {
        method: 'POST',
        body: customerData,
      })

      if (response.message === 'ok') {
        console.info('Cliente agregado', response.data)
        Helpers.showMessage(document.querySelector('#create-customers'), 'Cliente agregado exitosamente', true)
        document.querySelector('#new-customer').reset()
      } else {
        console.warn('No se pudo agregar el registro', response)
        Helpers.showMessage(document.querySelector('#create-customers'), 'Error al agregar el cliente: ' + response.message, false)
      }
    })
  }

  static #searchCustomers() {
    document.querySelector('#search-customer').addEventListener('click', async e => {
      e.preventDefault()
      const id = document.querySelector('#id').value

      if (!Helpers.validateId(id)) {
        console.warn('ID inválido')
        Helpers.showMessage(document.querySelector('#update-client'), 'ID inválido. Debe tener entre 5 y 15 caracteres.', false)
        return
      }

      try {
        const response = await Helpers.fetchData(`${App.#urlAPI}/cliente/id/${id}`)

        if (response.message === 'ok' && response.data) {
          const customer = response.data
          document.querySelector('#nombre').value = customer.nombre || ''
          document.querySelector('#direccion').value = customer.direccion || ''
          document.querySelector('#telefono').value = customer.telefono || ''
          document.querySelector('#ciudad').value = customer.ciudad || ''
          console.info('Cliente encontrado', customer)
          Helpers.showMessage(document.querySelector('#update-client'), 'Cliente encontrado. Datos cargados.', true)
        } else {
          console.warn('No se encontró el cliente', response)
          document.querySelector('#update-client').reset()
          Helpers.showMessage(document.querySelector('#update-client'), 'No se encontró el cliente con el ID proporcionado.', false)
        }
      } catch (error) {
        console.error('Error al buscar el cliente:', error)
        Helpers.showMessage(document.querySelector('#update-client'), 'Error al buscar el cliente. Intente nuevamente.', false)
      }
    })

    App.updateCustomer()
  }

  static updateCustomer() {
    document.querySelector('#update').addEventListener('click', async e => {
      e.preventDefault()

      const customerData = App.#getBody()
      let isValid = true
      let errorMessage = ''

      if (!Helpers.validateId(customerData.id)) {
        isValid = false
        errorMessage += 'ID inválido. Debe tener entre 5 y 15 caracteres.\n'
      }
      if (!Helpers.validateName(customerData.nombre)) {
        isValid = false
        errorMessage += 'Nombre inválido. Debe tener entre 1 y 50 caracteres.\n'
      }
      if (!Helpers.validateAddress(customerData.direccion)) {
        isValid = false
        errorMessage += 'Dirección inválida. Debe tener al menos 10 caracteres.\n'
      }
      if (!Helpers.validatePhone(customerData.telefono)) {
        isValid = false
        errorMessage += 'Teléfono inválido. Debe ser un número válido de Colombia.\n'
      }
      if (!Helpers.validateCity(customerData.ciudad)) {
        isValid = false
        errorMessage += 'Ciudad inválida. Debe tener entre 4 y 50 caracteres.\n'
      }

      if (!isValid) {
        Helpers.showMessage(document.querySelector('#update-customers'), errorMessage, false)
        return
      }

      try {
        const response = await Helpers.fetchData(`${App.#urlAPI}/cliente/${customerData.id}`, {
          method: 'PATCH',
          body: customerData,
        })

        if (response.message === 'ok') {
          console.info('Cliente actualizado exitosamente', response.data)
          Helpers.showMessage(document.querySelector('#update-customers'), 'Cliente actualizado exitosamente', true)
        } else {
          console.warn('No se pudo actualizar el cliente', response)
          Helpers.showMessage(document.querySelector('#update-customers'), 'Error al actualizar el cliente: ' + response.message, false)
        }
      } catch (error) {
        console.error('Error al actualizar el cliente:', error)
        Helpers.showMessage(document.querySelector('#update-customers'), 'Error al actualizar el cliente. Intente nuevamente.', false)
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
    const form = document.querySelector('#new-customer')
    const deleteButton = document.querySelector('#delete-customer')

    deleteButton.addEventListener('click', async e => {
      e.preventDefault()
      const id = document.querySelector('#id').value

      if (!Helpers.validateId(id)) {
        Helpers.showMessage(form, 'ID inválido. Debe tener entre 5 y 15 caracteres.', false)
        return
      }

      try {
        const confirmDelete = confirm('¿Está seguro de que desea eliminar este cliente? Esta acción no se puede deshacer.')
        if (!confirmDelete) {
          return
        }

        const response = await Helpers.fetchData(`${App.#urlAPI}/cliente/${id}`, {
          method: 'DELETE',
        })

        if (response.message === 'ok') {
          console.info('Cliente eliminado', response.data)
          Helpers.showMessage(form, 'Cliente eliminado exitosamente', true)
          document.querySelector('#id').value = ''
        } else {
          console.warn('No se pudo eliminar el cliente', response)
          Helpers.showMessage(form, 'Error al eliminar el cliente: ' + response.message, false)
        }
      } catch (error) {
        console.error('Error al eliminar el cliente:', error)
        Helpers.showMessage(form, 'Error al eliminar el cliente. Intente nuevamente.', false)
      }
    })
  }

  static #addMerchandise() {
    App.#loadClients()
    document.querySelector('#add-merchandise').addEventListener('click', App.#handleAddMerchandise)
  }

  static async #loadClients() {
    try {
      const response = await Helpers.fetchData(`${App.#urlAPI}/cliente`)
      if (response.message === 'ok') {
        const clientSelect = document.querySelector('#cliente')
        const options = Helpers.toOptionList({
          items: response.data,
          value: 'id',
          text: 'nombre',
          firstOption: 'Seleccione un cliente',
        })
        clientSelect.innerHTML = options
      }
    } catch (error) {
      console.error('Error loading clients:', error)
    }
  }

  static async #handleAddMerchandise(e) {
    e.preventDefault()
    const merchandiseData = App.#getMerchandiseData()
    const { isValid, errorMessage } = Helpers.validateMerchandise(merchandiseData)

    if (!isValid) {
      Helpers.showMessage(document.querySelector('#add-merchandise-form'), errorMessage, false)
      return
    }

    try {
      const response = await fetch(`${App.#urlAPI}/mercancia`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(merchandiseData),
      })

      if (!response.ok) {
        throw new Error(`Problema de acceso al recurso: ${response.status} - ${response.statusText}`)
      }

      const result = await response.json()
      console.info('Mercancía agregada', result)
      Helpers.showMessage(document.querySelector('#add-merchandise-form'), 'Mercancía agregada exitosamente', true)
      document.querySelector('#add-merchandise-form').reset()
    } catch (error) {
      console.error('Error al agregar la mercancía:', error)
      Helpers.showMessage(document.querySelector('#add-merchandise-form'), `Error al agregar la mercancía: ${error.message}`, false)
    }
  }

  static #getMerchandiseData() {
    return {
      contenido: document.querySelector('#contenido').value,
      ancho: parseFloat(document.querySelector('#ancho').value),
      alto: parseFloat(document.querySelector('#alto').value),
      largo: parseFloat(document.querySelector('#largo').value),
      fechaHoraIngreso: document.querySelector('#fechaHoraIngreso').value,
      fechaHoraSalida: document.querySelector('#fechaHoraSalida').value,
      bodega: document.querySelector('#bodega').value,
      cliente: document.querySelector('#cliente').value,
    }
  }
}
App.main()
