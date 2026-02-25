import { useGames } from '../hooks/useGames';
import { Card, CardBody } from '@heroui/card';
import { Skeleton } from '@heroui/skeleton';
import { Button } from '@heroui/button';
import { TrendingUp, Calendar, Star, CalendarClock } from 'lucide-react';
import { GameCard } from '../components/GameCard';
import { Pagination } from '../components/layout/pagination';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TimeNextReleasesFilter } from '../components/TimeNextReleasesFilter';

const NextReleasesPage = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(() => {
        const pageFromUrl = parseInt(searchParams.get('page'));
        return pageFromUrl && pageFromUrl > 0 ? pageFromUrl : 1;
    });
    const pageSize = 20;

    // Sincronizar URL cuando cambia la página
    useEffect(() => {
        const urlPage = parseInt(searchParams.get('page'));
        if (urlPage !== currentPage) {
            setSearchParams(prev => {
                const newParams = new URLSearchParams(prev);
                newParams.set('page', currentPage.toString());
                return newParams;
            });
        }
    }, [currentPage, setSearchParams]);

    const today = new Date().toISOString().split('T')[0];
    const fechaFinPorDefecto = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const tiempoFin = searchParams.get('periodo') || fechaFinPorDefecto;

    // Mapeo de fechas a labels
    const proximaSemana = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const proximoMes = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const esteAnio = new Date(new Date().getFullYear(), 11, 31).toISOString().split('T')[0];

    const timeLabels = {
        [fechaFinPorDefecto]: 'en los siguientes 30 días',
        [proximaSemana]: 'la siguiente semana',
        [proximoMes]: 'el siguiente mes',
        [esteAnio]: 'este año',
    };

    const labelText = timeLabels[tiempoFin] || `Hasta el ${tiempoFin.split('-').reverse().join('-')}`;

    const { data: nextGames, isLoading: loadingNext, isError: errorNext } = useGames({
        page: currentPage,
        page_size: 20,
        dates: `${today},${tiempoFin}`,
        ordering: 'released',
    });

    const totalPages = nextGames?.count ? Math.ceil(nextGames.count / pageSize) : 1;

    const handleTimeChange = (time) => {
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set('periodo', time);
            return newParams;
        });
    };

    return (
        <div className="space-y-12">
            {/* Sección de últimos lanzamientos */}
            <section>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6 mb-10">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-[#020617]/90 border border-white/80 rounded-xl">
                            <CalendarClock className="text-white" size={32} />
                        </div>
                        <div>
                            <h2 className="font-bold bg-clip-text text-white text-3xl tracking-wide">
                                Próximos Lanzamientos
                            </h2>
                            <p className="text-sm text-gray-400 mt-1 font-medium">
                                Próximos lanzamientos {labelText}
                            </p>
                        </div>
                    </div>

                    <div className="w-full md:w-50 md:max-w-50">
                        <TimeNextReleasesFilter onChange={handleTimeChange} value={tiempoFin} />
                    </div>
                </div>
                {loadingNext ? (
                    <GamesSkeleton />
                ) : errorNext ? (
                    <ErrorMessage message="Error al cargar juegos próximos" />
                ) : (
                    <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
                        {nextGames?.results.map((game) => (
                            <GameCard key={game.id} game={game} nextRelease={true} />
                        ))}
                    </div>
                )}
                {!loadingNext && !errorNext && nextGames?.results.length > 0 && (
                    <div className="mt-8 flex justify-center">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                )}
            </section>
        </div>
    );
};

// Skeleton para loading
const GamesSkeleton = () => {
    return (
        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
            {[...Array(8)].map((_, i) => (
                <Card key={i} className="bg-zinc-900">
                    <CardBody className="p-0">
                        <Skeleton className="rounded-none">
                            <div className="aspect-video[16/9]" />
                        </Skeleton>
                        <div className="p-4 space-y-3">
                            <Skeleton className="w-4/5 rounded-lg">
                                <div className="h-6" />
                            </Skeleton>
                            <Skeleton className="w-2/5 rounded-lg">
                                <div className="h-4" />
                            </Skeleton>
                            <Skeleton className="w-3/5 rounded-lg">
                                <div className="h-4" />
                            </Skeleton>
                        </div>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
};

// Mensaje de error
const ErrorMessage = ({ message }) => {
    return (
        <div className="text-center py-12 text-red-400">
            <p className="text-lg">{message}</p>
            <Button variant="light" color="danger" className="mt-4">
                Reintentar
            </Button>
        </div>
    );
};

export default NextReleasesPage;