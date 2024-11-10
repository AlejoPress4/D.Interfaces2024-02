class App {
  static main() {
    // Llamar a la función cargarClientes cuando se carga la página
    document.addEventListener('DOMContentLoaded', App.cargarClientes)
  }

  static async cargarClientes() {
    const tbody = document.querySelector('.table tbody') // Selecciona el tbody de la tabla

    try {
      // Realizar la solicitud para obtener los datos de los clientes
      const respuesta = await fetch('http://localhost:7070/cliente')
      const datos = await respuesta.json()

      // Limpiar el tbody antes de agregar datos
      tbody.innerHTML = ''

      // Iterar sobre cada cliente y agregar una fila a la tabla
      datos.data.forEach((cliente, index) => {
        const fila = document.createElement('tr')
        fila.innerHTML = `
          <th scope="row">${index + 1}</th>
          <td>${cliente.id}</td>
          <td>${cliente.nombre}</td>
          <td>${cliente.direccion}</td>
          <td>${cliente.telefono}</td>
          <td>${cliente.ciudad}</td>
        `
        tbody.appendChild(fila)
      })
    } catch (error) {
      console.error('Error al cargar los clientes:', error)
    }
  }
}

// Ejecutar el método main de la clase App
App.main()
