import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  Star,
  Calendar,
  Zap,
  Gamepad2,
  Palette,
  Monitor,
  Gamepad,
  Box,
  Settings,
  LogOut,
  AlarmClock,
} from 'lucide-react';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('tendencias');
  const navigate = useNavigate();

  const discoverItems = [
    { id: 'tendencias', label: 'Tendencias', icon: TrendingUp },
    { id: 'ultimoslanzamientos', label: 'Últimos 30 días', icon: Calendar },
    { id: 'proximos', label: 'Próximos Lanzamientos', icon: AlarmClock },
  ];

  const genreItems = [
    { id: 'accion', label: 'Acción', icon: Zap },
    { id: 'rpg', label: 'RPG', icon: Gamepad2 },
    { id: 'indie', label: 'Indie', icon: Palette },
  ];

  const platformItems = [
    { id: 'pc', label: 'PC', icon: Monitor },
    { id: 'ps5', label: 'PlayStation 5', icon: Gamepad },
    { id: 'xbox', label: 'Xbox Series X', icon: Box },
  ];

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);

    // Navegar a la ruta correspondiente sin recargar la página
    const routes = {
      tendencias: '/',
      ultimoslanzamientos: '/ultimos-lanzamientos',
    };

    const target = routes[itemId] || '/';
    navigate(target);
  };

  const MenuItem = ({ item }) => {
    const Icon = item.icon;
    const isActive = activeItem === item.id;

    return (
      <button
        onClick={() => handleItemClick(item.id)}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
          isActive
            ? 'bg-primary/20 text-primary'
            : 'text-white hover:bg-gray-800'
        }`}
      >
        <Icon size={20} />
        <span className="text-sm font-medium">{item.label}</span>
      </button>
    );
  };

  return (
    <div className="w-64 h-screen bg-surface-darkest text-white flex flex-col border-r-1 border-primary">
      {/* Header */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center pr-0.5 pb-0.5">
          <Gamepad size={24} className="text-white" />
        </div>
        <span className="text-2xl font-bold">Lexis</span>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {/* Sección Descubrir */}
        <div className="mb-6">
          <h3 className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Descubrir
          </h3>
          <div className="space-y-1">
            {discoverItems.map((item) => (
              <MenuItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Sección Géneros */}
        <div className="mb-6">
          <h3 className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Géneros
          </h3>
          <div className="space-y-1">
            {genreItems.map((item) => (
              <MenuItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Sección Plataformas */}
        <div className="mb-6">
          <h3 className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Plataformas
          </h3>
          <div className="space-y-1">
            {platformItems.map((item) => (
              <MenuItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </nav>

      {/* Acciones del Pie de Página */}
      <div className="p-3 space-y-1 border-t border-gray-800">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-gray-800 transition-colors">
          <Settings size={20} />
          <span className="text-sm font-medium">Configuración</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-gray-800 transition-colors">
          <LogOut size={20} />
          <span className="text-sm font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
