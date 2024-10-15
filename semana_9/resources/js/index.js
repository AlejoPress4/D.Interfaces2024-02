class App {
  static #urlAPI = 'http://localhost:7070'

  static async main() {
    //recuperar todos
    const response = await fetch(`${App.#urlAPI}/cliente`)
    let clientes = await response.json()

    const listOptions = document.querySelectorAll('.menu a')
    listOptions.forEach(item => item.addEventListener('click', App.#mainMenu))

    // Cargar la página de inicio por defecto
    await App.#loadPage('./resources/html/ver', '#main-content')

    // Añadir evento de clic al logo
    //document.getElementById('logo').addEventListener('click', () => App.#loadPage('./resources/html/inicio.html', '#main-content'))
    let filas = ''
    clientes.forEach(cliente => {
      filas += `
        <tr>
          <td>${cliente.id}</td>
          <td>${cliente.nombre}</td>
          <td>${cliente.telefono}</td>
          <td>${cliente.direccion}</td>
          <td>${cliente.ciudad}</td>
          <td>
            <button class="btn btn-warning btn-sm">Editar</button>
            <button class="btn btn-danger btn-sm">Eliminar</button>
          </td>
        </tr>
      `
    })
    const table = `<<table>${filas}</table>`
    document.querySelectorAll('#tabla.clientes').innerHTML = table
  }

  /**
   * Hace una petición HTTP y retorna la respuesta obtenida
   * @param {String} url La dirección donde se encuentra el recurso
   * @param {Object} data Un objecto con metadatos de la petición
   * @returns Un objeto JSON con el recurso solicitado
   */
  static async fetchData(url, data = {}) {
    if (Object.keys(data).length > 0) {
      if (!('headers' in data)) {
        data.headers = {
          'Content-Type': 'application/json; charset=utf-8',
        }
      }

      if ('body' in data) {
        data.body = JSON.stringify(data.body)
      }
    }

    const respuesta = await fetch(url, data)
    return await respuesta.json()
  }

  static #mainMenu = async e => {
    let option = 'Ninguna'
    if (e != undefined) {
      e.preventDefault()
      option = e.target.text
      switch (option) {
        case 'Ver Clientes':
          await App.#loadPage('./resources/html/verclientes.html', '#main-content')
          break
        case 'Editar':
          await App.#loadPage('./resources/html/editarcliente.html', '#main-content')
          break
        case 'Agregar':
          await App.#loadPage('./resources/html/agregarcliente.html', '#main-content')
          break
        default:
          console.log('Opción no reconocida')
      }
    }
  }
  static async #loadPage(url, container = null) {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Problema de acceso al recurso: ${response.status} - ${response.statusText} , al intentar acceder al recurso ${response.url}`)
      }
      const html = await response.text()
      const elemento = document.querySelector(container)
      if (!elemento) {
        throw new Error(`No se encontró el contenedor: ${container}`)
      }
      elemento.innerHTML = html

    } catch (error) {
      console.log('No se pudo cargar la página:', error)
    }
  }
  static async fetchJSON(url) {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Problema de acceso al recurso: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.log('No se pudieron recuperar los datos:', ReferenceError)
    }
  }
}

App.main()
