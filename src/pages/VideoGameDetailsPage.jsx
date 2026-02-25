import { useParams } from 'react-router-dom';
import { Chip } from '@heroui/chip';
import { Button } from '@heroui/button';
import { Skeleton } from '@heroui/skeleton';
import { Globe, Star, Heart } from 'lucide-react';
import { useGameDetail } from '../hooks/useGames';
import { useGameScreenshots } from '../hooks/useGames';
import { useGameTrailers } from '../hooks/useGames';
import { useGameDLCs } from '../hooks/useGames';
import { SystemRequirementsTabs } from '../components/SystemRequirementsTabs';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ImageModal from '../components/ImageModal';
import GameTrailersCarousel from '../components/GameTrailersCarousel';
import { DLCcard } from '../components/DLCcard';
import GameScreenshotsGallery from '../components/GameScreenshotsGallery';
import { useAuth } from '../contexts/AuthContext.jsx';
import FavoritesApiService from '../services/favoritesApi.service.js';

const VideoGameDetailsPage = () => {
    const { id } = useParams();
    const { user, isAuthenticated } = useAuth();
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [favoriteLoading, setFavoriteLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const filtroContenidoEspanol = (htmlContent) => {
        if (!htmlContent) return '';
        const spanishIndex = htmlContent.toLowerCase().indexOf('español');
        if (spanishIndex !== -1) {
            return htmlContent.substring(0, spanishIndex).trim();
        }
        return htmlContent;
    };

    const gameId = id || window.location.pathname.split('/').pop();

    const { data: game, isLoading, isError } = useGameDetail(gameId);
    const { data: imagenes, isLoading: loadingImages, isError: errorImages } = useGameScreenshots(gameId);
    const { data: trailers } = useGameTrailers(gameId);
    const { data: dlcs } = useGameDLCs(gameId);
    const screenshots = imagenes?.results || [];

    // Comprobar si el juego está en favoritos
    useEffect(() => {
        const checkFavorite = async () => {
            if (isAuthenticated() && user && gameId) {
                const result = await FavoritesApiService.isFavorite(gameId);
                if (result.success) {
                    setIsFavorite(result.isFavorite);
                }
            }
        };
        checkFavorite();
    }, [isAuthenticated, user, gameId]);

    // Manejar el toggle de favoritos
    const handleFavoriteToggle = async () => {
        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }

        setFavoriteLoading(true);

        if (isFavorite) {
            const result = await FavoritesApiService.removeFavorite(gameId);
            if (result.success) {
                setIsFavorite(false);
            }
        } else {
            const result = await FavoritesApiService.addFavorite({
                id: gameId,
                name: game.name,
                background_image: game.background_image,
                rating: game.rating,
                released: game.released
            });
            if (result.success) {
                setIsFavorite(true);
            }
        }

        setFavoriteLoading(false);
    };

    if (isLoading) return <DetailSkeleton />;
    if (loadingImages) return <DetailSkeleton />;
    if (errorImages) return <div className="text-white text-center mt-20 text-xl font-medium">Error al cargar las imágenes del juego. Intentalo de nuevo.</div>;
    if (isError) return <div className="text-white text-center mt-20 text-xl font-medium">Error al cargar el juego. Intenta nuevamente.</div>;
    if (!game) return <div className="text-white text-center mt-20 text-xl font-medium">No se encontró el juego</div>;

    return (
        <div className="min-h-screen pb-20 bg-[#0f0f0f] relative overflow-hidden">
            {/* --- FONDO --- */}
            <div className="absolute inset-x-0 top-0 h-[100vh] z-0">
                <img
                    src={game.background_image}
                    alt={game.name}
                    className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f] via-transparent to-transparent h-32" />
            </div>

            {/* --- CABECERA HERO --- */}
            <div className="relative z-10 flex flex-col justify-end h-[70vh] pb-8 sm:pb-10 md:pb-12 max-w-8xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32">

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white drop-shadow-2xl leading-tight tracking-tight mb-5"
                >
                    {game.name}
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' }}
                    style={{ originX: 0 }}
                    className="w-16 h-px bg-white/40 mb-6"
                />

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.45, ease: 'easeOut' }}
                    className="flex flex-row flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-400 font-medium"
                >
                    {game.released && (
                        <span>{new Date(game.released).getFullYear()}</span>
                    )}
                    {game.released && <span className="text-zinc-600">·</span>}
                    <span className="flex items-center gap-1">
                        <Star size={13} className="text-yellow-400 fill-yellow-400" />
                        {game.rating} / 5
                    </span>
                    {game.genres?.length > 0 && <span className="text-zinc-600">·</span>}
                    {game.genres?.map((genre, i) => (
                        <React.Fragment key={genre.id}>
                            <span className="text-zinc-400">{genre.name}</span>
                            {i < game.genres.length - 1 && <span className="text-zinc-600">·</span>}
                        </React.Fragment>
                    ))}
                </motion.div>

            </div>

            {/* --- CONTENIDO PRINCIPAL --- */}
            <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32 pt-8">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-10"
                >

                    {/* Columna Izquierda: Descripción y Media */}
                    <div className="lg:col-span-1 xl:col-span-2 space-y-6 md:space-y-8 lg:space-y-10">

                        {/* Acerca del Juego */}
                        <h2 className="text-3xl font-black tracking-tight text-white mb-2">
                            Acerca del Juego
                        </h2>

                        <p className="text-sm text-zinc-400 mb-6">
                            Resumen breve del juego
                        </p>

                        <p className="text-lg text-gray-300 leading-relaxed text-justify">
                            <div dangerouslySetInnerHTML={{ __html: filtroContenidoEspanol(game.description) }} />
                        </p>

                        {/* Galería de imágenes */}
                        <GameScreenshotsGallery
                            screenshots={screenshots}
                            gameName={game.name}
                            onImageSelect={(image) => {
                                setSelectedImage(image);
                                setIsImageModalOpen(true);
                            }}
                        />

                        <ImageModal
                            imageUrl={selectedImage}
                            isOpen={isImageModalOpen}
                            onClose={() => {
                                setIsImageModalOpen(false);
                                setSelectedImage(null);
                            }}
                        />

                    </div>

                    {/* Columna Derecha: Detalles Técnicos */}
                    <div className="space-y-8 lg:space-y-16 lg:sticky lg:top-24 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8 xl:pl-10">
                        <h2 className="text-3xl font-black tracking-tight text-white mb-2">
                            Información
                        </h2>
                        <p className="text-sm text-zinc-400 mb-6">
                            Datos técnicos del juego
                        </p>

                        <div className="space-y-0 divide-y divide-white/10">
                            {/* Metacritic */}
                            {game.metacritic && (
                                <div className="flex items-center justify-between py-4">
                                    <span className="text-zinc-400 text-sm font-medium">Metascore</span>
                                    <span className={`px-3 py-1 rounded-lg font-bold border text-sm ${game.metacritic >= 75 ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                        game.metacritic >= 50 ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                            'bg-red-500/10 text-red-400 border-red-500/20'
                                        }`}>
                                        {game.metacritic}
                                    </span>
                                </div>
                            )}

                            {/* Tiempo de juego */}
                            {game.playtime > 0 && (
                                <div className="flex items-center justify-between py-4">
                                    <span className="text-zinc-400 text-sm font-medium">Tiempo promedio</span>
                                    <span className="text-white font-bold text-sm">{game.playtime} horas</span>
                                </div>
                            )}

                            {/* Plataformas */}
                            <div className="py-4">
                                <span className="text-zinc-400 text-sm font-medium block mb-3">Plataformas</span>
                                <div className="flex flex-wrap gap-2">
                                    {game.parent_platforms?.map(({ platform }) => (
                                        <Chip key={platform.id} size="base" variant="flat" className="bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-colors cursor-default">
                                            <span className="px-4">{platform.name}</span>
                                        </Chip>
                                    ))}
                                </div>
                            </div>

                            {/* Desarrolladores */}
                            <div className="flex items-center justify-between py-4">
                                <span className="text-zinc-400 text-sm font-medium">Desarrollador</span>
                                <span className="text-white font-medium text-sm text-right">
                                    {game.developers?.map(d => d.name).join(", ") || "N/A"}
                                </span>
                            </div>

                            {/* Publishers */}
                            <div className="flex items-center justify-between py-4">
                                <span className="text-zinc-400 text-sm font-medium">Editor</span>
                                <span className="text-white font-medium text-sm text-right">
                                    {game.publishers?.map(p => p.name).join(", ") || "N/A"}
                                </span>
                            </div>

                            {/* Botón de Favoritos */}
                            {isAuthenticated() && (
                                <div className="mt-6">
                                    <Button
                                        onClick={handleFavoriteToggle}
                                        disabled={favoriteLoading}
                                        className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${isFavorite
                                                ? 'bg-red-600 hover:bg-red-700 text-white'
                                                : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                                            }`}
                                    >
                                        <Heart
                                            className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`}
                                        />
                                        {isFavorite ? 'Eliminar de Favoritos' : 'Añadir a Favoritos'}
                                    </Button>
                                </div>
                            )}

                            {/* Botón para navegar a la página web */}
                            {game.website && (
                                <div className="mt-6">
                                    <a
                                        href={game.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center border border-white/20 hover:border-white/50 rounded-xl transition-colors w-full text-center text-white font-semibold py-2"
                                    >
                                        <Globe size={18} className="mr-2" /> Sitio web oficial
                                    </a>
                                </div>
                            )}
                        </div>

                        {game.platforms?.find(p => p.platform.slug === 'pc')?.requirements && (
                            <div>
                                <h2 className="text-3xl font-black tracking-tight text-white mb-2">
                                    Requisitos
                                </h2>
                                <p className="text-sm text-zinc-400 mb-6">
                                    Especificaciones para PC
                                </p>
                                <SystemRequirementsTabs requirements={game.platforms.find(p => p.platform.slug === 'pc').requirements} />
                            </div>
                        )}

                    </div>
                </motion.div>

                { /* --- DLCs --- */}
                {dlcs?.results?.length > 0 && (
                    <div className="mt-10 space-y-4">
                        <div className="flex items-end justify-between ml-2">
                            <div>
                                <h2 className="text-3xl font-black tracking-tight text-white mb-2">
                                    Expansiones
                                </h2>
                                <p className="text-sm text-zinc-400">
                                    Contenido adicional disponible para {game.name}
                                </p>
                            </div>
                            <span className="rounded-full border border-white/15 bg-zinc-900/70 px-3 py-1 text-xs font-semibold text-zinc-200 mr-2">
                                {dlcs.results.length} DLC{dlcs.results.length > 1 ? "s" : ""}
                            </span>
                        </div>
                        <DLCcard dlcs={dlcs.results} fallbackImageUrl={game.background_image} />
                    </div>
                )}

                {/* --- TRAILERS --- */}
                {trailers?.results?.length > 0 && (
                    <div className="mt-10 space-y-4">
                        <div className="flex items-end justify-between ml-2">
                            <div>
                                <h2 className="text-3xl font-black tracking-tight text-white mb-2">
                                    Trailers
                                </h2>
                                <p className="text-sm text-zinc-400">
                                    Videos oficiales y gameplays de {game.name}
                                </p>
                            </div>
                            <span className="rounded-full border border-white/15 bg-zinc-900/70 px-3 py-1 text-xs font-semibold text-zinc-200 mr-2">
                                {trailers.results.length} VIDEO{trailers.results.length > 1 ? "S" : ""}
                            </span>
                        </div>
                        <GameTrailersCarousel
                            trailers={trailers.results}
                            gameName={game.name}
                            fallbackImageUrl={game.background_image}
                        />
                    </div>
                )}

            </div>
        </div>
    );
};

// Skeleton mejorado para la carga
const DetailSkeleton = () => {
    return (
        <div className="min-h-screen pb-20 bg-[#0f0f0f]">
            <Skeleton className="w-full h-[60vh] rounded-b-3xl bg-zinc-800" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
                <div className="lg:col-span-2 space-y-6">
                    <Skeleton className="h-10 w-1/3 rounded-lg bg-zinc-800" />
                    <Skeleton className="h-40 w-full rounded-2xl bg-zinc-800" />
                    <Skeleton className="h-40 w-full rounded-2xl bg-zinc-800" />
                </div>
                <div className="space-y-6">
                    <Skeleton className="h-96 w-full rounded-3xl bg-zinc-800" />
                </div>
            </div>
        </div>
    );
};

export default VideoGameDetailsPage;
