import { useGames } from '../hooks/useGames';
import { Card, CardBody } from '@heroui/card';
import { Skeleton } from '@heroui/skeleton';
import { Button } from '@heroui/button';
import { TrendingUp, Calendar, Star } from 'lucide-react';
import { GameCard } from '../components/GameCard';

const LastReleasesPage = () => {

  // Fecha actual menos 30 días
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);
  const formattedThirtyDaysAgo = thirtyDaysAgo.toISOString().split('T')[0];

  // Juegos nuevos (ordenados por fecha de lanzamiento)
  const { data: newGames, isLoading: loadingNew, isError: errorNew } = useGames({
    page: 1,
    page_size: 20,
    ordering: '-released', // Más recientes
    dates: `${formattedThirtyDaysAgo},${today.toISOString().split('T')[0]}`, // Últimos 30 días
  });

  return (
    <div className="space-y-12">
        {/* Sección de últimos lanzamientos */}
        <section>
            <div className="flex items-center gap-6 mb-10">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#020617]/90 border border-white/80 rounded-xl">
                        <Calendar className="text-white" size={32} />
                    </div>
                    <div>
                        <h2 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 text-3xl tracking-wide">
                            Últimos Lanzamientos
                        </h2>
                        <p className="text-sm text-gray-400 mt-1 font-medium">
                            Novedades de los últimos 30 días
                        </p>
                    </div>
                </div>
            </div>
            {loadingNew ? (
                <GamesSkeleton />
            ) : errorNew ? (
                <ErrorMessage message="Error al cargar juegos nuevos" />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {newGames?.results.map((game) => (
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

export default LastReleasesPage;