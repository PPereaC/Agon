import { useState, useEffect } from 'react';
import { gamesService } from '../services/games.service.js';
import { LOADING_STATES } from '../utils/constants.js';

/**
 * Custom Hook para obtener la lista de juegos con paginación y filtros
 * @param {Object} params - Parámetros de búsqueda (page, search, genres, etc)
 * @param {boolean} autoFetch - Si debe hacer fetch automáticamente (por defecto: true)
 * @returns {Object} - data, loading, error, refetch
*/
export const useGames = (params = {}, autoFetch = true) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(LOADING_STATES.IDLE);
    const [error, setError] = useState(null);

    const fetchGames = async () => {
        setLoading(LOADING_STATES.LOADING);
        setError(null);

        try {
            const response = await gamesService.getGames(params);
            setData(response);
            setLoading(LOADING_STATES.SUCCESS);
        } catch (err) {
            setError(err);
            setLoading(LOADING_STATES.ERROR);
            console.error('Error en useGames:', err);
        }
    };

    useEffect(() => {
        if (autoFetch) {
            fetchGames();
        }
    }, [JSON.stringify(params), autoFetch]);

    return {
        data,
        loading,
        error,
        refetch: fetchGames,
        isLoading: loading === LOADING_STATES.LOADING,
        isSuccess: loading === LOADING_STATES.SUCCESS,
        isError: loading === LOADING_STATES.ERROR,
    };
};

export const useGameDetail = (id, autoFetch = true) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(LOADING_STATES.IDLE);
    const [error, setError] = useState(null);

    const fetchGameDetail = async () => {
        setLoading(LOADING_STATES.LOADING);
        setError(null);
        try {
            const response = await gamesService.getGameDetail(id);
            setData(response);
            setLoading(LOADING_STATES.SUCCESS);
        } catch (err) {
            setError(err);
            setLoading(LOADING_STATES.ERROR);
            console.error('Error en useGameDetail:', err);
        }
    };

    useEffect(() => {
        if (autoFetch && id) {
            fetchGameDetail();
        }
    }, [id, autoFetch]);

    return {
        data,
        isLoading: loading === LOADING_STATES.LOADING,
        isSuccess: loading === LOADING_STATES.SUCCESS,
        isError: loading === LOADING_STATES.ERROR,
        error
    };
};

export const useGameScreenshots = (id, autoFetch = true) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(LOADING_STATES.IDLE);
    const [error, setError] = useState(null);

    const fetchGameScreenshots = async () => {
        setLoading(LOADING_STATES.LOADING);
        setError(null);
        try {
            const response = await gamesService.getGameScreenshots(id);
            setData(response);
            setLoading(LOADING_STATES.SUCCESS);
        } catch (err) {
            setError(err);
            setLoading(LOADING_STATES.ERROR);
            console.error('Error en useGameScreenshots:', err);
        }
    };

    useEffect(() => {
        if (autoFetch && id) {
            fetchGameScreenshots();
        }
    }, [id, autoFetch]);

    return {
        data,
        isLoading: loading === LOADING_STATES.LOADING,
        isSuccess: loading === LOADING_STATES.SUCCESS,
        isError: loading === LOADING_STATES.ERROR,
        error
    };
};

export const useGameTrailers = (id, autoFetch = true) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(LOADING_STATES.IDLE);
    const [error, setError] = useState(null);

    const fetchGameTrailers = async () => {
        setLoading(LOADING_STATES.LOADING);
        setError(null);
        try {
            const response = await gamesService.getTrailers(id);
            setData(response);
            setLoading(LOADING_STATES.SUCCESS);
        } catch (err) {
            setError(err);
            setLoading(LOADING_STATES.ERROR);
            console.error('Error en useGameTrailers:', err);
        }
    };

    useEffect(() => {
        if (autoFetch && id) {
            fetchGameTrailers();
        }
    }, [id, autoFetch]);

    return {
        data,
        isLoading: loading === LOADING_STATES.LOADING,
        isSuccess: loading === LOADING_STATES.SUCCESS,
        isError: loading === LOADING_STATES.ERROR,
        error
    };
};
