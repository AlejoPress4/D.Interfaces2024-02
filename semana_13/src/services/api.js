import axios from 'axios'

// Base URL for the API
const API_URL = 'http://localhost:7070'

// Create an Axios instance for all API calls
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
})

/**
 * Generic function for GET requests.
 * @param {string} endpoint - The API endpoint.
 * @param {object} [params] - Optional query parameters.
 * @returns {Promise<any>} The response data.
 */
export const fetchAll = async (endpoint, params = {}) => {
  const response = await api.get(endpoint, { params })
  console.log(response.data.data)
  return response.data.data
}

/**
 * Generic function for GET requests by ID.
 * @param {string} endpoint - The API endpoint.
 * @param {string | number} id - The ID to fetch.
 * @returns {Promise<any>} The response data.
 */
export const fetchById = async (endpoint, id) => {
  const response = await api.get(`${endpoint}/id/${id}`)
  return response.data
}

/**
 * Generic function for GET requests by custom property.
 * @param {string} endpoint - The API endpoint.
 * @param {string} property - The property to search by.
 * @param {string | number} value - The property value.
 * @returns {Promise<any>} The response data.
 */
export const fetchByProperty = async (endpoint, property, value) => {
  const response = await api.get(`${endpoint}/${property}/${value}`)
  return response.data
}

/**
 * Generic function for POST requests.
 * @param {string} endpoint - The API endpoint.
 * @param {object} data - The data to create.
 * @returns {Promise<any>} The response data.
 */
export const create = async (endpoint, data) => {
  const response = await api.post(endpoint, data)
  return response.data
}

/**
 * Generic function for PATCH requests.
 * @param {string} endpoint - The API endpoint.
 * @param {string | number} id - The ID to update.
 * @param {object} data - The updated data.
 * @returns {Promise<any>} The response data.
 */
export const update = async (endpoint, id, data) => {
  const response = await api.patch(`${endpoint}/${id}`, data)
  return response.data
}

/**
 * Generic function for DELETE requests.
 * @param {string} endpoint - The API endpoint.
 * @param {string | number} id - The ID to delete.
 * @returns {Promise<void>} Nothing.
 */
export const remove = async (endpoint, id) => {
  await api.delete(`${endpoint}/${id}`)
}

/**
 * Specific function for fetching envio estados.
 * @returns {Promise<any>} The response data for envio estados.
 */
export const fetchEnvioEstados = async () => {
  return await fetchAll('/envio/estados')
}

/**
 * Specific function for fetching data by nombre.
 * @param {string} endpoint - The API endpoint.
 * @param {string} nombre - The nombre to search for.
 * @returns {Promise<any>} The response data.
 */
export const fetchByNombre = async (endpoint, nombre) => {
  return await fetchByProperty(endpoint, 'nombre', nombre)
}

/**
 * Alias function for fetching clientes by nombre.
 * @param {string} nombre - The nombre of the cliente to fetch.
 * @returns {Promise<any>} The response data for the cliente.
 */
export const fetchClienteByNombre = async (nombre) => {
  return await fetchByNombre('clientes', nombre)
}

/**
 * Specific function for fetching data by remitente.
 * @param {string} endpoint - The API endpoint.
 * @param {string} remitente - The remitente to search for.
 * @returns {Promise<any>} The response data.
 */
export const fetchByRemitente = async (endpoint, remitente) => {
  return await fetchByProperty(endpoint, 'remitente', remitente)
}

// Export the Axios instance for direct use if needed
export default api
