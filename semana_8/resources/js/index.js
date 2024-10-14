class App {
  static async main() {
    const listOptions = document.querySelectorAll('.menu a')
    listOptions.forEach(item => item.addEventListener('click', App.#mainMenu))

    // Cargar la página de inicio por defecto
    await App.#loadPage('./resources/html/inicio.html', '#main-content')

    // Añadir evento de clic al logo
    document.getElementById('logo').addEventListener('click', () => App.#loadPage('./resources/html/inicio.html', '#main-content'))
  }

  static #mainMenu = async e => {
    let option = 'Ninguna'
    if (e != undefined) {
      e.preventDefault()
      option = e.target.text
      switch (option) {
        case 'Catálogo de productos':
          await App.#loadPage('./resources/html/inicio.html', '#main-content')
          break
        case 'Comprar':
          await App.#loadPage('./resources/html/comprar.html', '#main-content')
          break
        case 'Acerca de':
          await App.#loadPage('./resources/html/acerca.html', '#main-content')
          break
        case 'Contacto':
          await App.#loadPage('./resources/html/contacto.html', '#main-content')
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

      // Si es la página de inicio, inicializar Masonry
      if (url.includes('./resources/html/inicio.html')) {
        // Usa setTimeout para asegurarte de que el DOM se ha actualizado (buena practica)
        setTimeout(() => {
          App.#initMasonry()
        }, 0)
      }
    } catch (error) {
      console.log('No se pudo cargar la página:', error)
    }
  }

  static #initMasonry() {
    const grid = document.querySelector('.masonry-grid')
    if (!grid) {
      console.error('No se encontró el contenedor de la cuadrícula')
      return
    }

    // Asegúrate de que Masonry está disponible
    if (typeof Masonry === 'undefined') {
      console.error('Masonry no está definido. Asegúrate de que la biblioteca está cargada correctamente.')
      return
    }

    // Asegúrate de que imagesLoaded está disponible
    if (typeof imagesLoaded === 'undefined') {
      console.error('imagesLoaded no está definido. Asegúrate de que la biblioteca está cargada correctamente.')
      return
    }

    // Asegúrate de que todas las imágenes estén cargadas antes de inicializar Masonry
    imagesLoaded(grid, function () {
      new Masonry(grid, {
        itemSelector: '.masonry-grid-item',
        columnWidth: '.masonry-grid-item',
        percentPosition: true,
        gutter: 30,
      })
    })
  }
}
App.main()
