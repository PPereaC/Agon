import { useParams } from 'react-router-dom';
import { Chip } from '@heroui/chip';
import { Skeleton } from '@heroui/skeleton';
import { Calendar, Globe, Star } from 'lucide-react';
import { useGameDetail } from '../hooks/useGames';
import { useGameScreenshots } from '../hooks/useGames';
import { useGameTrailers } from '../hooks/useGames';
import { SystemRequirementsTabs } from '../components/SystemRequirementsTabs';
import React, { useState } from 'react';
import ImageModal from '../components/ImageModal';
import GameTrailersCarousel from '../components/GameTrailersCarousel';

const VideoGameDetailsPage = () => {
    const { id } = useParams();
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // Fallback: Si useParams no funciona por la configuración de rutas, intentamos sacar el ID de la URL manualmente
    const gameId = id || window.location.pathname.split('/').pop();

    const { data: game, isLoading, isError } = useGameDetail(gameId);
    const { data: imagenes, isLoading: loadingImages, isError: errorImages } = useGameScreenshots(gameId);
    const { data: trailers } = useGameTrailers(gameId);

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
                        {/* Sinopsis */}
                        <div className="bg-zinc-900/50 backdrop-blur-sm p-8 rounded-3xl border border-white/20 shadow-xl">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-4">
                                Acerca del juego
                            </h2>
                            <div
                                className="text-gray-300 leading-relaxed text-lg prose prose-invert max-w-none"
                                dangerouslySetInnerHTML={{
                                    __html: (() => {
                                        const fullText = game.description || game.description_raw || '';
                                        const spanishIndex = fullText.indexOf('Español');
                                        const textToShow = spanishIndex !== -1 ? fullText.substring(spanishIndex + 'Español'.length).trim() : fullText;
                                        return textToShow.split('\n').join('<br/>');
                                    })()
                                }}
                            />
                            <div className="flex flex-wrap mt-4 gap-2">
                                {game.genres?.map((genre) => (
                                    <Chip key={genre.id} color="primary" variant="shadow" className="uppercase font-bold tracking-wider bg-white/10 text-white backdrop-blur-md border border-white/10 flex items-center gap-1 p-3">
                                        {genre.name}
                                    </Chip>
                                ))}
                            </div>
                        </div>

                        {/* Galería de imágenes */}
                        <div className="bg-zinc-900/50 backdrop-blur-sm p-8 rounded-3xl border border-white/20 shadow-xl space-y-10">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-4">
                                Imágenes
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                {imagenes?.results.slice(0, 6).map((img) => (
                                    <div key={img.id} className="relative">
                                        <img
                                            src={img.image}
                                            alt={`${game.name} screenshot`}
                                            onClick={() => {
                                                setSelectedImage(img.image);
                                                setIsImageModalOpen(true);
                                            }}
                                            className="w-full h-auto rounded-lg object-cover border border-white/20 hover:scale-105 transition-transform duration-300 cursor-pointer"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

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

                {/* --- TRAILERS --- */}
                <div className="mt-8">
                    <GameTrailersCarousel trailers={trailers?.results || []} gameName={game.name} />
                </div>

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
