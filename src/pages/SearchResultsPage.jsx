import { Card, CardBody } from '@heroui/card';
import { Skeleton } from '@heroui/skeleton';
import { Button } from '@heroui/button';
import { Search } from 'lucide-react';
import { GameCard } from '../components/GameCard';
import { Pagination } from '../components/layout/pagination';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSearchGames } from '../hooks/useGames';

const SearchResultsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [currentPage, setCurrentPage] = useState(() => {
        const pageFromUrl = parseInt(searchParams.get('page'));
        return pageFromUrl && pageFromUrl > 0 ? pageFromUrl : 1;
    });
    const pageSize = 20;

    // Sincronizar URL cuando cambia la página
    useEffect(() => {
        const urlPage = parseInt(searchParams.get('page'));
        if (urlPage !== currentPage) {
            const newParams = { page: currentPage.toString() };
            if (query) newParams.q = query;
            setSearchParams(newParams);
        }
    }, [currentPage, setSearchParams, query]);

    // Buscar juegos con el query
    const { data: searchResults, isLoading: loadingSearch, isError: errorSearch } = useSearchGames({
        search: query,
        page: currentPage,
        page_size: pageSize,
    });

    const totalPages = searchResults?.count ? Math.ceil(searchResults.count / pageSize) : 1;

    return (
        <div className="space-y-12">
            {/* Sección de Resultados de Búsqueda */}
            <section>
                <div className="flex items-center gap-6 mb-10">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-[#020617]/90 border border-white/80 rounded-xl">
                            <Search className="text-white" size={32} />
                        </div>
                        <div>
                            <h2 className="font-bold text-transparent bg-clip-text text-white text-3xl tracking-wide">
                                {query ? `Resultados para "${query}"` : 'Buscar juegos'}
                            </h2>
                            <p className="text-sm text-gray-400 mt-1 font-medium">
                                {searchResults?.count || 0} juegos encontrados
                            </p>
                        </div>
                    </div>
                </div>
                {loadingSearch ? (
                    <GamesSkeleton />
                ) : errorSearch ? (
                    <ErrorMessage message="Error al buscar juegos" />
                ) : !query ? (
                    <div className="text-center py-12 text-gray-400">
                        <p className="text-lg">Escribe un término de búsqueda para encontrar juegos</p>
                    </div>
                ) : searchResults?.results?.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                        <p className="text-lg">No se encontraron juegos para "{query}"</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
                        {searchResults?.results.map((game) => (
                            <GameCard key={game.id} game={game} />
                        ))}
                    </div>
                )}
                {!loadingSearch && !errorSearch && searchResults?.results?.length > 0 && (
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

export default SearchResultsPage;