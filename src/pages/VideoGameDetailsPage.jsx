import { useParams } from 'react-router-dom';
import { Chip } from '@heroui/chip';
import { Skeleton } from '@heroui/skeleton';
import { Calendar, Globe, Star } from 'lucide-react';
import { useGameDetail } from '../hooks/useGames';
import { useGameScreenshots } from '../hooks/useGames';
import { useGameTrailers } from '../hooks/useGames';
import { useGameDLCs } from '../hooks/useGames';
import { SystemRequirementsTabs } from '../components/SystemRequirementsTabs';
import React, { useState } from 'react';
import ImageModal from '../components/ImageModal';
import GameTrailersCarousel from '../components/GameTrailersCarousel';
import { DLCcard } from '../components/DLCcard';
import GameScreenshotsGallery from '../components/GameScreenshotsGallery';

const VideoGameDetailsPage = () => {
    const { id } = useParams();
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const filtroContenidoEspanol = (htmlContent) => {
        if (!htmlContent) return '';
        const spanishIndex = htmlContent.toLowerCase().indexOf('español');
        if (spanishIndex !== -1) {
            return htmlContent.substring(0, spanishIndex).trim();
        }
        return htmlContent;
    };

    // Fallback: Si useParams no funciona por la configuración de rutas, intentamos sacar el ID de la URL manualmente
    const gameId = id || window.location.pathname.split('/').pop();

    const { data: game, isLoading, isError } = useGameDetail(gameId);
    const { data: imagenes, isLoading: loadingImages, isError: errorImages } = useGameScreenshots(gameId);
    const { data: trailers } = useGameTrailers(gameId);
    const { data: dlcs } = useGameDLCs(gameId);
    const screenshots = imagenes?.results || [];

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

            <div className="relative z-10 max-w-8xl mx-auto px-32 pt-32">
                {/* --- HEADER --- */}
                <div className="flex flex-col justify-end min-h-[40vh] mb-12">

                    <div className="flex flex-row items-center gap-4 mb-4">
                        {game.released && (
                            <Chip startContent={<Calendar size={16} className="text-blue-400" />} variant="flat" className="bg-white/10 text-white backdrop-blur-md border border-white/10 flex items-center gap-1 p-3">{new Date(game.released).getFullYear()}</Chip>
                        )}
                        <Chip startContent={<Star size={16} className="text-yellow-400 fill-yellow-400" />} variant="flat" className="bg-white/10 text-white backdrop-blur-md border border-white/10 flex items-center gap-1 p-3">{game.rating} / 5</Chip>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-2xl leading-tight tracking-tight">
                        {game.name}
                    </h1>

                </div>

                {/* --- CONTENIDO PRINCIPAL --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Columna Izquierda: Descripción y Media */}
                    <div className="lg:col-span-2 space-y-10">

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
                    <div className="space-y-6">
                        <div className="bg-zinc-900/80 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-lg sticky top-24">
                            <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">
                                Información
                            </h3>

                            <div className="space-y-6">
                                {/* Metacritic */}
                                {game.metacritic && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400 font-medium">Metascore</span>
                                        <span className={`px-3 py-1 rounded-lg font-bold border ${game.metacritic >= 75 ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                            game.metacritic >= 50 ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                                'bg-red-500/10 text-red-400 border-red-500/20'
                                            }`}>
                                            {game.metacritic}
                                        </span>
                                    </div>
                                )}

                                {/* Tiempo de juego */}
                                {game.playtime > 0 && (
                                    <div className="flex flex-col items-start justify-between">
                                        <span className="text-gray-400 flex items-center gap-2 font-medium mb-2">
                                            Tiempo promedio
                                        </span>
                                        <span className="text-white font-bold">{game.playtime} horas</span>
                                    </div>
                                )}

                                {/* Plataformas */}
                                <div>
                                    <span className="text-gray-400 block mb-3 font-medium">Plataformas</span>
                                    <div className="flex flex-wrap gap-2">
                                        {game.parent_platforms?.map(({ platform }) => (
                                            <Chip key={platform.id} size="base" variant="flat" className="bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-colors cursor-default">
                                                <span className="px-4">{platform.name}</span>
                                            </Chip>
                                        ))}
                                    </div>
                                </div>

                                {/* Desarrolladores */}
                                <div>
                                    <span className="text-gray-400 block mb-2 font-medium">Desarrollador</span>
                                    <div className="text-white font-medium">
                                        {game.developers?.map(d => d.name).join(", ") || "N/A"}
                                    </div>
                                </div>

                                {/* Publishers */}
                                <div>
                                    <span className="text-gray-400 block mb-2 font-medium">Editor</span>
                                    <div className="text-white font-medium">
                                        {game.publishers?.map(p => p.name).join(", ") || "N/A"}
                                    </div>
                                </div>

                                {/* Botón para navegar a la página web */}
                                {game.website && (
                                    <div>
                                        <a
                                            href={game.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center border border-white/20 hover:border-gray-400 rounded-lg transition-colors w-full text-center text-white font-semibold py-2"
                                        >
                                            <Globe size={18} className="mr-2" /> Sitio web oficial
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                        {game.platforms?.find(p => p.platform.slug === 'pc')?.requirements && (
                            <div className="bg-zinc-900/80 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-lg sticky top-24">
                                <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">
                                    Requisitos del sistema
                                </h3>

                                <div className="space-y-6">
                                    <SystemRequirementsTabs requirements={game.platforms.find(p => p.platform.slug === 'pc').requirements} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

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
            <div className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
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
