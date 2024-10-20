/**
 * Una clase con funciones de ayuda que normalmente son útiles en muchas partes de la aplicación,
 * evitan duplicar código y facilitan la reutilización y el mantenimiento de las aplicaciones.
 */
export default class Helpers {
  /**
   * Carga un recurso HTML en una capa de la aplicación
   * @param {String} url La ruta donde se encuentra el recurso
   * @param {String} container Opcionalmente, la capa donde se inserta el contenido
   * @returns Si el segundo argumento se da, se retorna el container, si no se retorna el recurso
   */
  static async loadPage(url, container = null) {
    try {
      const response = await fetch(url)

      if (response.ok) {
        const html = await response.text()
        const element = document.querySelector(container)
        if (element) {
          element.innerHTML = html
        }
        return element || html // para permitir encadenamiento o para retornar el HTML
      } else {
        throw new Error(`${response.status} - ${response.statusText}, al intentar acceder al recurso '${response.url}'`)
      }
    } catch (e) {
      console.log(e)
    }
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

    try {
      const response = await fetch(url, data)
      if (!response.ok) {
        throw new Error(`Problema de acceso al recurso: ${response.status} - ${response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      return { message: error.message }
    }
  }

  /**
   * Crea el HTML correspondiente a una lista de opciones para inyectar en un select
   * @param {Object} El objeto de definición de la lista
   * @returns El HTML con la lista de opciones
   */
  static toOptionList = ({
    items = [], // el array de objetos para crear la lista
    value = '', // el nombre del atributo de cada objeto que se usará como value
    text = '', // el nombre del atributo de cada objeto que se usará como text
    selected = '', // el valor que debe marcarse como seleccionado
    firstOption = '', // opcionalmente una opción adicional para iniciar la lista
  } = {}) => {
    let options = ''
    if (firstOption) {
      options += `<option value="">${firstOption}</option>`
    }
    items.forEach(item => {
      if (item[value] == selected) {
        // comprobación débil adrede
        options += `<option value="${item[value]}" selected>${item[text]}</option>`
      } else {
        options += `<option value="${item[value]}">${item[text]}</option>`
      }
    })
    return options
  }

  /**
   * Aplica las reglas de validación definidas para un formulario HTML.
   * Incluso puede indicar un callback como segundo argumento para complementar la validación
   * @param {String} formSelector Una regla CSS para referenciar el formulario a validar
   */
  static okForm = (formSelector, callBack) => {
    let ok = true
    const form = document.querySelector(formSelector)
    // si los datos del formulario no son válidos, forzar un submit para que se muestren los errores
    if (!form.checkValidity()) {
      let tmpSubmit = document.createElement('button')
      form.appendChild(tmpSubmit)
      tmpSubmit.click()
      form.removeChild(tmpSubmit)
      ok = false
    }
    if (typeof callBack === 'function') {
      ok = ok && callBack()
    }
    return ok
  }

  static idRandom = (prefix = '') =>
    prefix +
    Math.floor(Math.random() * 99999999999999)
      .toString()
      .padStart(14, '0')

  static validateId(id) {
    return id.length >= 5 && id.length <= 15
  }

  static validateName(name) {
    return name.length >= 1 && name.length <= 50
  }

  static validateAddress(address) {
    return address.length >= 10
  }

  static validatePhone(phone) {
    const phoneRegex = /^(\+57|57)?[3][0-9]{9}$|^[1-8][0-9]{6,7}$/
    return phoneRegex.test(phone)
  }

  static validateCity(city) {
    return city.length >= 4 && city.length <= 50
  }

  static validateCustomerForm(customer) {
    return this.validateId(customer.id) && this.validateName(customer.nombre) && this.validateAddress(customer.direccion) && this.validatePhone(customer.telefono) && this.validateCity(customer.ciudad)
  }

  static showMessage(element, message, isSuccess) {
    const messageElement = document.createElement('div')
    messageElement.textContent = message
    messageElement.classList.add('message', isSuccess ? 'success' : 'error')
    element.appendChild(messageElement)
    setTimeout(() => messageElement.remove(), 5000)
  }
}

/**
 * Cambia las ocurrencias de $# por los strings indicados como argumento. Ejemplo:
 * let z = 'Probando $0 de $1 con $2'.translate('strings', 'JavaScript', 'expresiones regulares')
 * retorna 'Probando strings de JavaScript con expresiones regulares'
 *
 * @param  {...any} texts los strings que se usan para hacer el reemplazo
 * @returns El string original con los reemplazos realizados
 */
String.prototype.translate = function (...texts) {
  let str = this
  const regex = /\$(\d+)/gi // no requiere comprobación de mayúsculas pero se deja como ejemplo
  return str.replace(regex, (item, index) => texts[index])
}
