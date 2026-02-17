import { useGames } from '../hooks/useGames';
import { Card, CardBody } from '@heroui/card';
import { Skeleton } from '@heroui/skeleton';
import { Chip } from '@heroui/chip';
import { Button } from '@heroui/button';
import { Flame, Star } from 'lucide-react';
import { GameCard } from '../components/GameCard';

const NewNTrendingPage = () => {
  // Juegos en tendencia (ordenados por agregados recientemente)
  const { data: trendingGames, isLoading: loadingTrending, isError: errorTrending } = useGames({
    page: 1,
    page_size: 20,
    ordering: '-added',
  });

  return (
    <div className="space-y-12">
      {/* Sección de Juegos en Tendencia */}
      <section>
        <div className="flex items-center gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-[#d4af37] to-[#c9a236] rounded-xl shadow-lg shadow-[#d4af37]/20">
              <Flame className="text-white" size={32} />
            </div>
            <div>
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-[#d4af37]">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {trendingGames?.results.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
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

export default NewNTrendingPage;