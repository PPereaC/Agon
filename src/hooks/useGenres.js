import { useState, useEffect } from 'react';
import { gamesService } from '../services/games.service';

export const useGenres = () => {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const results = await gamesService.getGenres();
                setGenres(results || []);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchGenres();
    }, []);

    return { genres, loading, error };
};
