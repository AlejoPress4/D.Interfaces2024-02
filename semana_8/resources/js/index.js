class App {
  static #deptos // un atributo privado
  static #localidades // otro atributo privado

  static async main() {
    App.#deptos = await App.fetchJSON('https://raw.githubusercontent.com/proyecto26/colombia/refs/heads/master/departments.json')
    console.log(App.#deptos.data.length)

    App.#localidades = await App.fetchJSON('https://raw.githubusercontent.com/proyecto26/colombia/refs/heads/master/cities.json')
    console.log(App.#localidades.data.length)

    // paso 3: referenciar las opciones del menú
    const listOptions = document.querySelectorAll('.menu a')
    // console.log(listOptions)
    listOptions.forEach(item => item.addEventListener('click', App.#mainMenu))
  }

  static #mainMenu = async e => {
    let option = 'Ninguna'
    if (e != undefined) {
      e.preventDefault()
      option = e.target.text
      switch (option) {
        case 'Our Work':
          console.log('primera opción')
          break
        case 'About':
          console.log('segunda opción')
          break
        case 'Careers':
          console.log('tercera opción')
          break
        case 'Contact':
            await App.#loadPage('./resources/html/contacto.html', 'main')
            const deptos = document.querySelector('#deptos')
            let options = ''
            App.#deptos.data.forEach(depto => {
              options += <option value="${depto.id}">${depto.name}</option>
            })
            deptos.innerHTML = options
  
            deptos.addEventListener('change', e => {
              console.log('departamento ' + e.target.value)
            })
          break
      }
    }
  }

  static async #loadPage(url, container = null){
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Problema de acceso al recurso: ${url}`)
      }
      const hmtl = await response.text()
      const elemento = document.querySelector(container)
      if(!elemento){
        throw new Error(`No se encontró el contenedor: ${container}`)
      }
      elemento.innerHTML = hmtl
      }
      catch (error) {
      console.error('No se pudo cargar la página:', error)
  }
  }
  static async fetchJSON(url) {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Problema de acceso al recurso: ${url}`)
      }
      return await response.json()
    } catch (error) {
      console.error('No se pudieron recuperar los datos:', error)
    }
  }
}

App.main()