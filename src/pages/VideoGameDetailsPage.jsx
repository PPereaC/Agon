import { useParams } from 'react-router-dom';
import { Button } from '@heroui/button';
import { Chip } from '@heroui/chip';
import { Skeleton } from '@heroui/skeleton';
import { Calendar, Globe, Star, Clock, Gamepad2 } from 'lucide-react';
import { useGameDetail } from '../hooks/useGames';

const VideoGameDetailsPage = () => {
    const { id } = useParams();

    // Fallback: Si useParams no funciona por la configuración de rutas, intentamos sacar el ID de la URL manualmente
    const gameId = id || window.location.pathname.split('/').pop();

    const { data: game, isLoading, isError } = useGameDetail(gameId);

    if (isLoading) return <DetailSkeleton />;
    if (isError) return <div className="text-white text-center mt-20 text-xl font-medium">Error al cargar el juego. Intenta nuevamente.</div>;
    if (!game) return <div className="text-white text-center mt-20 text-xl font-medium">No se encontró el juego</div>;

    return (
        <div className="min-h-screen pb-20 bg-[#0f0f0f] relative overflow-hidden">
            {/* --- FONDO BACKGROUND FIXED --- */}
            <div className="absolute inset-x-0 top-0 h-[100vh] z-0">
                <img
                    src={game.background_image}
                    alt={game.name}
                    className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f] via-transparent to-transparent h-32" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32">
                {/* --- HEADER --- */}
                <div className="flex flex-col justify-end min-h-[40vh] mb-12">
                    <div className="flex flex-row items-center gap-4 mb-4">
                        {game.released && (
                            <Chip startContent={<Calendar size={16} className="text-blue-400" />} variant="flat" className="bg-white/10 text-white backdrop-blur-md border border-white/10 flex items-center gap-1 p-3">{new Date(game.released).getFullYear()}</Chip>
                        )}
                        <Chip startContent={<Star size={16} className="text-yellow-400 fill-yellow-400" />} variant="flat" className="bg-white/10 text-white backdrop-blur-md border border-white/10 flex items-center gap-1 p-3">{game.rating} / 5</Chip>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl leading-tight tracking-tight">
                        {game.name}
                    </h1>

                    <div className="flex flex-wrap gap-3">
                        {game.genres?.map((genre) => (
                            <Chip key={genre.id} color="primary" variant="shadow" className="uppercase font-bold tracking-wider">
                                {genre.name}
                            </Chip>
                        ))}
                    </div>
                </div>

                {/* --- CONTENIDO PRINCIPAL --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Columna Izquierda: Descripción y Media */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Sinopsis */}
                        <div className="bg-zinc-900/50 backdrop-blur-sm p-8 rounded-3xl border border-white/5 shadow-xl">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <Gamepad2 className="text-primary" />
                                Acerca del juego
                            </h2>
                            <div
                                className="text-gray-300 leading-relaxed text-lg prose prose-invert max-w-none"
                                dangerouslySetInnerHTML={{ __html: game.description || game.description_raw }}
                            />
                        </div>

                        {game.website && (
                            <div className="flex justify-start">
                                <Button
                                    as="a"
                                    href={game.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    color="primary"
                                    variant="ghost"
                                    startContent={<Globe size={20} />}
                                    className="w-full md:w-auto font-semibold"
                                >
                                    Visitar sitio oficial
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Columna Derecha: Detalles Técnicos */}
                    <div className="space-y-6">
                        <div className="bg-zinc-900/80 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-lg sticky top-24">
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
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400 flex items-center gap-2 font-medium">
                                            <Clock size={18} /> Tiempo promedio
                                        </span>
                                        <span className="text-white font-bold">{game.playtime} horas</span>
                                    </div>
                                )}

                                {/* Plataformas */}
                                <div>
                                    <span className="text-gray-400 block mb-3 font-medium">Plataformas</span>
                                    <div className="flex flex-wrap gap-2">
                                        {game.parent_platforms?.map(({ platform }) => (
                                            <Chip key={platform.id} size="sm" variant="flat" className="bg-white/5 text-white border border-white/5 hover:bg-white/10 transition-colors cursor-default">
                                                {platform.name}
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
                            </div>
                        </div>
                    </div>
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