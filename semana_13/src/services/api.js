import axios from 'axios'

// Configuración base para Axios
const apiClient = axios.create({
  baseURL: 'http://localhost:7070',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
})

// Función genérica para manejar errores
const handleRequestError = (error) => {
  console.error('Error en la petición:', error.response || error.message)
  throw error.response?.data || error.message
}

// **Peticiones GET**

// Obtener todos los elementos de un recurso
export const fetchAll = async (endpoint) => {
  try {
    const response = await apiClient.get(`/${endpoint}`)
    return response.data.data
  } catch (error) {
    handleRequestError(error)
  }
}

// Obtener un elemento por su ID
export const fetchById = async (endpoint, id) => {
  try {
    const response = await apiClient.get(`/${endpoint}/${id}`)
    return response.data.data
  } catch (error) {
    handleRequestError(error)
  }
}

// Obtener un elemento filtrado por remitente
export const fetchByRemitente = async (endpoint, remitente) => {
  try {
    const response = await apiClient.get(`/${endpoint}?remitente=${remitente}`)
    return response.data.data
  } catch (error) {
    handleRequestError(error)
  }
}

// Obtener un elemento filtrado por nombre (cliente o mercancía)
export const fetchByNombre = async (endpoint, nombre) => {
  try {
    const response = await apiClient.get(`/${endpoint}?nombre=${nombre}`)
    return response.data.data
  } catch (error) {
    handleRequestError(error)
  }
}

// **Peticiones POST**

// Crear un nuevo elemento
export const create = async (endpoint, data) => {
  try {
    const response = await apiClient.post(`/${endpoint}`, data)
    return response.data.data
  } catch (error) {
    handleRequestError(error)
  }
}

// **Peticiones PUT**

// Actualizar un elemento existente
export const update = async (endpoint, id, data) => {
  try {
    const response = await apiClient.put(`/${endpoint}/${id}`, data)
    return response.data.data
  } catch (error) {
    handleRequestError(error)
  }
}

// **Peticiones DELETE**

// Eliminar un elemento por su ID
export const remove = async (endpoint, id) => {
  try {
    const response = await apiClient.delete(`/${endpoint}/${id}`)
    return response.data.data
  } catch (error) {
    handleRequestError(error)
  }
}

// **Funciones adicionales específicas para casos de uso**

/**
 * Obtener cliente por nombre
 * @param {string} nombre - Nombre del cliente
 */
export const fetchClienteByNombre = async (nombre) => {
  return fetchByNombre('cliente', nombre)
}

/**
 * Obtener bultos por remitente
 * @param {string} remitente - Nombre del remitente
 */
export const fetchBultosByRemitente = async (remitente) => {
  return fetchByRemitente('bulto', remitente)
}

/**
 * Obtener cajas por remitente
 * @param {string} remitente - Nombre del remitente
 */
export const fetchCajasByRemitente = async (remitente) => {
  return fetchByRemitente('caja', remitente)
}

/**
 * Obtener sobres por remitente
 * @param {string} remitente - Nombre del remitente
 */
export const fetchSobresByRemitente = async (remitente) => {
  return fetchByRemitente('sobre', remitente)
}

/**
 * Obtener mercancía por nombre
 * @param {string} nombre - Nombre de la mercancía
 */
export const fetchMercanciaByNombre = async (nombre) => {
  return fetchByNombre('mercancia', nombre)
}
