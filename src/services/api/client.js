import { API_CONFIG } from './config.js';
import { buildQueryString } from '../../utils/helpers.js';

/**
 * Cliente HTTP
 * Maneja todas las peticiones HTTP con configuración centralizada
*/
class HttpClient {
    constructor(config) {
        this.baseURL = config.baseURL;
        this.apiKey = config.apiKey;
        this.timeout = config.timeout;
    }

    /**
     * Construir URL completa con query params
     * @private
    */
    _buildUrl(endpoint, params = {}) {
        // Agregar API key a los params
        const allParams = {
            key: this.apiKey,
            ...params,
        };

        const queryString = buildQueryString(allParams);
        return `${this.baseURL}${endpoint}${queryString}`;
    }

    /**
     * Manejar respuesta de la API
     * @private
    */
    async _handleResponse(response) {
        if (!response.ok) {
            const error = new Error(`Error HTTP: ${response.status}`);
            error.status = response.status;
            error.statusText = response.statusText;

            try {
                error.data = await response.json();
            } catch {
                error.data = null;
            }

            throw error;
        }

        return response.json();
    }

    /**
     * Manejar errores de red
     * @private
    */
    _handleError(error) {
        if (error.name === 'AbortError') {
            throw new Error('La solicitud ha sido cancelada por timeout');
        }

        throw error;
    }

    /**
     * GET
     * @param {string} endpoint - Endpoint de la API
     * @param {Object} params - Parámetros de consulta
     * @param {Object} options - Opciones de fetch
     * @returns {Promise} Respuesta de la API
    */
    async get(endpoint, params = {}, options = {}) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        try {
            const url = this._buildUrl(endpoint, params);

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
                signal: controller.signal,
                ...options,
            });

            clearTimeout(timeoutId);
            return this._handleResponse(response);
        } catch (error) {
            clearTimeout(timeoutId);
            return this._handleError(error);
        }
    }
}

// Exportar instancia única del cliente
export const httpClient = new HttpClient(API_CONFIG);
