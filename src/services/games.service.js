import { httpClient } from './api/client.js';
import { API_ENDPOINTS } from './api/config.js';

/**
 * Servicio para gestionar operaciones relacionadas con juegos
 * Contiene todos los métodos para interactuar con la API de RAWG sobre juegos
 */
class GamesService {
  /**
   * Obtener lista de juegos con paginación y filtros
   * @param {Object} params - Parámetros de búsqueda
   * @param {number} params.page - Número de página (default: 1)
   * @param {number} params.page_size - Tamaño de página (default: 20)
   * @param {string} params.search - Término de búsqueda
   * @param {string} params.ordering - Ordenamiento (-released, -rating, etc)
   * @param {string} params.genres - IDs de géneros separados por coma
   * @param {string} params.platforms - IDs de plataformas separados por coma
   * @param {string} params.dates - Rango de fechas (01-01-2020, 10-02-2026)
   * @returns {Promise<Object>} Lista de juegos paginada
   */
  async getGames(params = {}) {
    try {
      const response = await httpClient.get(API_ENDPOINTS.games, params);
      return response;
    } catch (error) {
      console.error('Error al obtener juegos:', error);
      throw error;
    }
  }

  /**
   * Obtener detalle completo de un juego específico
   * @param {number|string} id - ID del juego
   * @returns {Promise<Object>} Información detallada del juego
   */
  async getGameDetail(id) {
    try {
      const response = await httpClient.get(API_ENDPOINTS.gameDetail(id));
      return response;
    } catch (error) {
      console.error(`Error al obtener juego ${id}:`, error);
      throw error;
    }
  }

  /**
   * Obtener screenshots de un juego
   * @param {number|string} id - ID del juego
   * @returns {Promise<Object>} Lista de screenshots
   */
  async getGameScreenshots(id) {
    try {
      const response = await httpClient.get(API_ENDPOINTS.screenshots(id));
      return response;
    } catch (error) {
      console.error(`Error al obtener screenshots del juego ${id}:`, error);
      throw error;
    }
  }

  /**
   * Obtener lista de géneros
   * @returns {Promise<Object>} Lista de géneros
   */
  async getGenres() {
    try {
      const response = await httpClient.get(API_ENDPOINTS.genres);
      return response.results;
    } catch (error) {
      console.error('Error al obtener géneros:', error);
      throw error;
    }
  }

  async getTrailers(id) {
    try {
      const response = await httpClient.get(API_ENDPOINTS.trailers(id));
      return response;
    } catch (error) {
      console.error('Error al obtener los trailers:', error);
      throw error;
    }
  }

}

export const gamesService = new GamesService();
