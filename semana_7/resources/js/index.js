class App {
  static async main() {
    App.data = await App.fetchData('https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.json')
    console.log(App.data)

    const lista = document.querySelector('#lista')
    const departamentosSelect = document.querySelector('#departamentos')
    const ciudadesSelect = document.querySelector('#ciudades')

    // Función pura para generar opciones de departamentos
    const generarOpcionesDepartamentos = data => {
      return data.reduce((options, item) => {
        return options + `<option value="${item.departamento}">${item.departamento}</option>`
      }, '<option value="">Selecciona un departamento</option>')
    }

    // Función pura para generar opciones de ciudades
    const generarOpcionesCiudades = ciudades => {
      return ciudades.reduce((options, ciudad) => {
        return options + `<option value="${ciudad}">${ciudad}</option>`
      }, '<option value="">Selecciona una ciudad</option>')
    }

    // Inicializar combo box de departamentos
    const inicializarDepartamentos = (data, selectElement) => {
      selectElement.innerHTML = generarOpcionesDepartamentos(data)
    }

    // Manejar evento de cambio de departamento
    const manejarCambioDepartamento = (event, filtrarCiudades, actualizarCiudadesComboBox) => {
      const departamento = event.target.value
      if (departamento) {
        const ciudades = filtrarCiudades(departamento)
        actualizarCiudadesComboBox(ciudades)
      } else {
        ciudadesSelect.innerHTML = '<option value="">Selecciona una ciudad</option>'
      }
    }

    // Inicializar combo box de departamentos
    inicializarDepartamentos(App.data, departamentosSelect)

    // Evento para actualizar ciudades cuando se selecciona un departamento
    departamentosSelect.addEventListener('change', e => manejarCambioDepartamento(e, App.filtrarCiudades, App.actualizarCiudadesComboBox))

    // Generar lista de departamentos con ciudades
    let deptosLista = ''
    App.data.forEach(item => {
      let ciudades = ''
      item.ciudades.forEach(ciudad => {
        ciudades += `<li>${ciudad}</li>`
      })
      deptosLista += `<li data-departamento="${item.departamento}">${item.departamento} <ol>${ciudades}</ol></li>`
    })
    lista.innerHTML = `<ol id="deptos">${deptosLista}</ol>`

    // Función pura para manejar el evento de clic
    const manejarClickDepartamento = (event, filtrarCiudades) => {
      const liElement = event.target.closest('li[data-departamento]')
      if (liElement) {
        const depto = liElement.getAttribute('data-departamento')
        console.log(filtrarCiudades(depto))
      } else {
        console.log('No se ha seleccionado un departamento')
      }
    }

    // Evento para mostrar ciudades cuando se hace clic en un departamento
    document.querySelector('#deptos').addEventListener('click', e => manejarClickDepartamento(e, App.filtrarCiudades))
  }
  static async fetchData(url) {
    return (await fetch(url)).json()
  }

  static filtrarCiudades(departamento) {
    return App.data.filter(item => item.departamento === departamento).flatMap(item => item.ciudades)
    // return App.data.find(d => d.departamento === departamento).ciudades
  }

  static actualizarCiudadesComboBox(ciudades) {
    const ciudadesSelect = document.querySelector('#ciudades')
    let options = '<option value="">Selecciona una ciudad</option>'
    ciudades.forEach(ciudad => {
      options += `<option value="${ciudad}">${ciudad}</option>`
    })
    ciudadesSelect.innerHTML = options
  }
}

App.main()
