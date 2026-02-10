import { useGames } from '../hooks/useGames';
import { Card, CardBody } from '@heroui/card';
import { Skeleton } from '@heroui/skeleton';
import { Chip } from '@heroui/chip';
import { Button } from '@heroui/button';
import { TrendingUp, Calendar, Star } from 'lucide-react';
import { GameCard } from '../components/GameCard';

const NewNTrendingPage = () => {
  // Juegos en tendencia (ordenados por agregados recientemente)
  const { data: trendingGames, isLoading: loadingTrending, isError: errorTrending } = useGames({
    page: 1,
    page_size: 20,
    ordering: '-added', // Más agregados = en tendencia
  });

  // Juegos nuevos (ordenados por fecha de lanzamiento)
  const { data: newGames, isLoading: loadingNew, isError: errorNew } = useGames({
    page: 1,
    page_size: 12,
    ordering: '-released', // Más recientes
    dates: '2024-01-01,2026-12-31', // Últimos 2 años
  });

  return (
    <div className="space-y-12">
        {/* Sección de Juegos en Tendencia */}
        <section>
            <div className="flex items-center gap-4 mb-8">
                <TrendingUp size={35} />
                <h2 className="text-3xl font-semibold">Juegos en Tendencia</h2>
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

// Componente de tarjeta de juego
// const GameCard = ({ game }) => {
//   return (
//     <Card 
//       isPressable
//       className="bg-zinc-900 hover:bg-zinc-800 transition-all hover:scale-105"
//     >
//       <CardBody className="p-0">
//         {/* Imagen */}
//         <div className="relative aspect-[16/9] overflow-hidden">
//           <img
//             src={game.background_image || '/placeholder-game.jpg'}
//             alt={game.name}
//             className="w-full h-full object-cover"
//           />
//           {game.metacritic && (
//             <Chip
//               className="absolute top-2 right-2 bg-green-600 text-white font-bold"
//               size="sm"
//             >
//               {game.metacritic}
//             </Chip>
//           )}
//         </div>

//         {/* Contenido */}
//         <div className="p-4 space-y-2">
//           <h3 className="font-semibold text-lg line-clamp-1">{game.name}</h3>
          
//           {/* Rating */}
//           <div className="flex items-center gap-2">
//             <Star className="text-yellow-500" size={16} fill="currentColor" />
//             <span className="text-sm font-medium">{game.rating}/5</span>
//             <span className="text-xs text-gray-400">({game.ratings_count})</span>
//           </div>

//           {/* Fecha de lanzamiento */}
//           {game.released && (
//             <p className="text-xs text-gray-400">
//               Lanzamiento: {new Date(game.released).toLocaleDateString('es-ES')}
//             </p>
//           )}

//           {/* Géneros */}
//           <div className="flex flex-wrap gap-1">
//             {game.genres?.slice(0, 2).map((genre) => (
//               <Chip key={genre.id} size="sm" variant="flat" className="text-xs">
//                 {genre.name}
//               </Chip>
//             ))}
//           </div>
//         </div>
//       </CardBody>
//     </Card>
//   );
// };

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