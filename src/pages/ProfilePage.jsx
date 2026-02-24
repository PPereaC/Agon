import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Heart, LogOut, Trash2, Gamepad2, Calendar, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import FavoritesApiService from '../services/favoritesApi.service.js';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from '../contexts/AuthContext'
import logo from "@/assets/logo.png"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function ProfilePage() {
  const { user, logout } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadFavorites();
  }, [user]);

  const loadFavorites = async () => {
    if (!user) return;

    const result = await FavoritesApiService.getFavorites();
    if (result.success) {
      setFavorites(result.favorites);
    }
    setLoading(false);
  };

  const handleRemoveFavorite = async (gameId) => {
    const result = await FavoritesApiService.removeFavorite(gameId);
    if (result.success) {
      setFavorites(favorites.filter(f => f.gameId !== gameId));
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getUserInitials = () => {
    if (user?.displayName) {
      return user.displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return user?.email?.[0]?.toUpperCase() || 'U';
  };

  return (
    <div className="min-h-screen bg-[#020617] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <img
            src={logo}
            alt="AGON"
            className="h-12 w-auto object-contain mx-auto mb-8"
          />
          <div className="border-t border-white/60"></div>
        </div>

        {/* Información del usuario */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Avatar */}
            <Avatar className="w-20 h-20">
              <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>

            {/* Información */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-normal text-white mb-1">
                {user?.displayName || 'Usuario'}
              </h1>
              <p className="text-gray-300 text-sm mb-3">{user?.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-gray-300">
                <span className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  {favorites.length} favoritos
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(user?.createdAt).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de favoritos */}
        <div>
          <div className="flex items-center justify-between mb-8 border-b border-white/60 pb-4">
            <h2 className="text-lg font-normal text-white flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Mis Favoritos
            </h2>
            <span className="text-white text-sm">
              {favorites.length} {favorites.length === 1 ? 'juego' : 'juegos'}
            </span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-gray-500">Cargando...</div>
            </div>
          ) : favorites.length === 0 ? (
            <div className="text-center py-16">
              <Gamepad2 className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-normal text-gray-300 mb-2">No tienes favoritos</h3>
              <p className="text-gray-500 text-sm mb-6">Explora juegos y añádelos a tu lista</p>
              <Button
                onClick={() => navigate('/tendencias')}
                className="bg-white hover:bg-gray-200 text-[#020617] font-normal rounded-none"
              >
                Explorar Juegos
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((game) => (
                <Card
                  key={game.gameId}
                  className="bg-transparent border border-white/60 rounded-none hover:border-white/40 transition-colors cursor-pointer group"
                  onClick={() => navigate(`/juego/${game.gameId}`)}
                >
                  <CardContent className="p-0">
                    {/* Imagen del juego */}
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={game.background_image}
                        alt={game.name}
                        className="w-full h-full object-cover"
                      />
                      <button
                        className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-500 text-white p-1.5 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFavorite(game.gameId);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Información del juego */}
                    <div className="p-4">
                      <h3 className="font-normal text-white mb-2 line-clamp-1">{game.name}</h3>
                      <p className="text-xs text-gray-300 mt-2">
                        Añadido como favorito el {new Date(game.addedAt).toLocaleDateString('es-ES')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
