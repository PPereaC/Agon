/**
 * Configuración de la API de RAWG y endpoints
*/

export const API_CONFIG = {
    baseURL: import.meta.env.VITE_RAWG_BASE_URL || 'https://api.rawg.io/api',
    apiKey: import.meta.env.VITE_RAWG_API_KEY,
    timeout: 10000, // 10 segundos
};

/**
 * Endpoints de la API
*/
export const API_ENDPOINTS = {
    games: '/games',
    gameDetail: (id) => `/games/${id}`,
    genres: '/genres',
    platforms: '/platforms',
    stores: '/stores',
    creators: '/creators',
    tags: '/tags',
    screenshots: (id) => `/games/${id}/screenshots`,
    trailers: (id) => `/games/${id}/movies`,
};

/**
 * Validar que la API key esté configurada
*/
export const validateApiConfig = () => {
    if (!API_CONFIG.apiKey) {
        console.warn('⚠️ API Key no configurada. Crea un archivo .env con VITE_RAWG_API_KEY');
    }
};
