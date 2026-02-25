import { useAuth } from '../contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button';
import { Shield, Users, Gamepad2, BarChart3, LogOut, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import StatsApiService from '../services/statsApi.service.js';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import logo from "@/assets/logo.png"

function AdminPage() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const result = await StatsApiService.getStats();
    if (result.success) {
      setStats(result.stats);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#020617] py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header con logo y divider */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <img
            src={logo}
            alt="AGON"
            className="h-8 sm:h-10 md:h-12 w-auto object-contain mx-auto mb-4 sm:mb-6 md:mb-8"
          />
          <div className="border-t border-white/60"></div>
        </div>

        {/* Información del Admin */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-8">
            {/* Icono Admin */}
            <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-white/10 flex items-center justify-center border border-white/20">
              <Shield className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-white" />
            </div>

            {/* Información del Admin */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-xl sm:text-2xl md:text-2xl font-normal text-white mb-1">
                Panel de Administración
              </h1>
              <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3">{user?.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Administrador
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de Estadísticas */}
        <div>
          <div className="flex items-center justify-between mb-4 sm:mb-6 md:mb-8 border-b border-white/60 pb-4">
            <h2 className="text-base sm:text-lg font-normal text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Estadísticas
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12">
            <Card className="bg-transparent border border-white/60 rounded-none transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Usuarios</p>
                    <p className="text-3xl font-normal text-white mt-1">
                      {loading ? '-' : (stats?.totalUsers || 0)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-white/10 flex items-center justify-center border border-white/20">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-transparent border border-white/60 rounded-none transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Favoritos</p>
                    <p className="text-3xl font-normal text-white mt-1">
                      {loading ? '-' : (stats?.totalFavorites || 0)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-white/10 flex items-center justify-center border border-white/20">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-transparent border border-white/60 rounded-none transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Usuarios Activos</p>
                    <p className="text-3xl font-normal text-white mt-1">
                      {loading ? '-' : (stats?.activeUsers || 0)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-white/10 flex items-center justify-center border border-white/20">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-transparent border border-white/60 rounded-none transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Favs por Usuario</p>
                    <p className="text-3xl font-normal text-white mt-1">
                      {loading ? '-' : (stats?.totalUsers > 0 ? (stats?.totalFavorites / stats?.totalUsers).toFixed(1) : 0)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-white/10 flex items-center justify-center border border-white/20">
                    <Gamepad2 className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sección de Gestión */}
        <div>
          <div className="flex items-center justify-between mb-4 sm:mb-6 md:mb-8 border-b border-white/60 pb-4">
            <h2 className="text-base sm:text-lg font-normal text-white flex items-center gap-2">
              <Users className="w-5 h-5" />
              Gestión
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            <Card className="bg-transparent border border-white/60 rounded-none transition-colors cursor-pointer group">
              <CardHeader className="p-6">
                <CardTitle className="text-lg font-normal text-white flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Gestión de Usuarios
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-gray-400 text-sm mb-4">
                  Administra los usuarios registrados, asigna roles y gestiona permisos.
                </p>
                <Button className="w-full bg-white hover:bg-gray-200 text-[#020617] font-normal rounded-none">
                  Ver Usuarios
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-transparent border border-white/60 rounded-none transition-colors cursor-pointer group">
              <CardHeader className="p-6">
                <CardTitle className="text-lg font-normal text-white flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5" />
                  Gestión de Juegos
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-gray-400 text-sm mb-4">
                  Administra el catálogo de juegos, añade nuevos títulos o edita existentes.
                </p>
                <Button className="w-full bg-white hover:bg-gray-200 text-[#020617] font-normal rounded-none">
                  Gestionar Juegos
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
