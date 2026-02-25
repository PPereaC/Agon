import { useGames } from '../hooks/useGames';
import { Card, CardBody } from '@heroui/card';
import { Skeleton } from '@heroui/skeleton';
import { Chip } from '@heroui/chip';
import { Button } from '@heroui/button';
import { Flame, Star } from 'lucide-react';
import { GameCard } from '../components/GameCard';
import { Pagination } from '../components/layout/pagination';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const NewNTrendingPage = () => {
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
      setSearchParams({ page: currentPage.toString() });
    }
  }, [currentPage, setSearchParams]);

  // Juegos en tendencia (ordenados por agregados recientemente)
  const { data: trendingGames, isLoading: loadingTrending, isError: errorTrending } = useGames({
    page: currentPage,
    page_size: pageSize,
    ordering: '-added',
  });

  const totalPages = trendingGames?.count ? Math.ceil(trendingGames.count / pageSize) : 1;

  return (
    <div className="space-y-12">
      {/* Sección de Juegos en Tendencia */}
      <section>
        <div className="flex items-center gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#020617]/90 border border-white/80 rounded-xl">
              <Flame className="text-white" size={32} />
            </div>
            <div>
              <h2 className="font-bold bg-clip-text text-white text-3xl tracking-wide">
                Tendencias
              </h2>
              <p className="text-sm text-gray-400 mt-1 font-medium">
                Lo más destacado del momento
              </p>
            </div>
          </div>
        </div>
        {loadingTrending ? (
          <GamesSkeleton />
        ) : errorTrending ? (
          <ErrorMessage message="Error al cargar juegos en tendencia" />
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
            {trendingGames?.results.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}
        {!loadingTrending && !errorTrending && trendingGames?.results.length > 0 && (
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

export default NewNTrendingPage;