import ApiService from './api.service.js';

// Servicio de autenticación con API REST y JWT
class AuthApiService {
  // POST /api/auth/register - Registro de usuario
  static async register(email, password, displayName) {
    try {
      const data = await ApiService.post('/auth/register', {
        email,
        password,
        displayName
      });

      // Guardar sesión
      ApiService.saveSession(data.token, data.user);

      return {
        success: true,
        user: data.user,
        token: data.token
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // POST /api/auth/login - Login de usuario
  static async login(email, password) {
    try {
      const data = await ApiService.post('/auth/login', {
        email,
        password
      });

      // Guardar sesión
      ApiService.saveSession(data.token, data.user);

      return {
        success: true,
        user: data.user,
        token: data.token
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // GET /api/auth/me - Obtener datos del usuario autenticado
  static async getCurrentUser() {
    try {
      if (!ApiService.hasToken()) {
        return { success: false, error: 'No hay sesión' };
      }

      const data = await ApiService.get('/auth/me');
      return {
        success: true,
        user: data
      };
    } catch (error) {
      // Si hay error 401/403, limpiar sesión
      if (error.message.includes('401') || error.message.includes('403')) {
        ApiService.clearSession();
      }
      return {
        success: false,
        error: error.message
      };
    }
  }

  // GET /api/auth/users - Listar usuarios (admin)
  static async getUsers() {
    try {
      const data = await ApiService.get('/auth/users');
      return {
        success: true,
        users: data.users
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Logout - Limpiar sesión local
  static async logout() {
    ApiService.clearSession();
    return { success: true };
  }

  // Verificar estado de autenticación
  static isAuthenticated() {
    return ApiService.hasToken();
  }

  // Obtener usuario guardado
  static getStoredUser() {
    return ApiService.getStoredUser();
  }
}

export default AuthApiService;
