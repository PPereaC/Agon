import { useGames } from '../hooks/useGames';
import { Card, CardBody } from '@heroui/card';
import { Skeleton } from '@heroui/skeleton';
import { Button } from '@heroui/button';
import { TrendingUp, Calendar, Star, Swords, Trophy } from 'lucide-react';
import { GameCard } from '../components/GameCard';
import { Pagination } from '../components/layout/pagination';
import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

const TopGamesPage = () => {

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
            setSearchParams((prev) => {
                const next = new URLSearchParams(prev);
                next.set('page', currentPage.toString());
                return next;
            });
        }
    }, [currentPage, searchParams, setSearchParams]);

    // Los mejores juegos de siempre
    const { data: resultados, isLoading: loadingResultados, isError: errorResultados } = useGames({
        page: currentPage,
        page_size: pageSize,
        ordering: '-metacritic',
    });

    const totalPages = Math.min(
        resultados?.count ? Math.ceil(resultados.count / pageSize) : 1,
        Math.ceil(250 / pageSize)  // Máximo 250 juegos (13 páginas)
    );

    return (
        <div className="space-y-12">
            {/* Los mejores juegos de siempre */}
            <section>
                <div className="flex items-center gap-6 mb-10">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-[#020617]/90 border border-white/80 rounded-xl">
                            <Trophy className="text-white" size={32} />
                        </div>
                        <div>
                            <h2 className="font-bold bg-clip-text text-white text-3xl tracking-wide">
                                Los juegos TOP
                            </h2>
                            <p className="text-sm text-gray-400 mt-1 font-medium">
                                Los mejores juegos de siempre
                            </p>
                        </div>
                    </div>
                </div>
                {loadingResultados ? (
                    <GamesSkeleton />
                ) : errorResultados ? (
                    <ErrorMessage message="Error al cargar juegos del género" />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {resultados?.results.map((game) => (
                            <GameCard key={game.id} game={game} />
                        ))}
                    </div>
                )}
                {!loadingResultados && !errorResultados && resultados?.results.length > 0 && totalPages > 1 && (
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

export default TopGamesPage;