import { API_BASE_URL, getAuthHeaders, getToken, setToken, removeToken } from '../config/api.config.js';

// Servicio base para API REST
class ApiService {
  // GET request
  static async get(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    return this._handleResponse(response);
  }

  // POST request
  static async post(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return this._handleResponse(response);
  }

  // PUT request
  static async put(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return this._handleResponse(response);
  }

  // PATCH request
  static async patch(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return this._handleResponse(response);
  }

  // DELETE request
  static async delete(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return this._handleResponse(response);
  }

  // Manejar respuesta
  static async _handleResponse(response) {
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }
    
    return data;
  }

  // Guardar sesión
  static saveSession(token, user) {
    setToken(token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Obtener usuario guardado
  static getStoredUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Limpiar sesión
  static clearSession() {
    removeToken();
    localStorage.removeItem('user');
  }

  // Verificar si hay token
  static hasToken() {
    return !!getToken();
  }
}

export default ApiService;
