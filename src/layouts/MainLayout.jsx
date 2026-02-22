import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavbarApp from '../components/layout/Navbar';
import { Button } from '@heroui/react';
import { Menu, X } from 'lucide-react';

const MainLayout = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();

  // Páginas que ocupan todo el ancho sin padding contenedor
  const isFullWidthPage = location.pathname.startsWith('/juego/');

  const handleToggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="flex min-h-screen">

      {/* Área Principal - Navbar y Contenido */}
      <div className="flex-1 flex flex-col w-full">
        {/* Navbar */}
        <nav className="w-full sticky top-0 z-30">
          <NavbarApp />
        </nav>

        {/* Contenido */}
        <main className="flex-1 bg-surface-darkest text-white overflow-y-auto">
          {/* Encabezado Móvil */}
          <div className="md:hidden sticky top-0 z-30 bg-white border-b p-4 flex items-center gap-3">
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onClick={handleToggleMobileSidebar}
            >
              {isMobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-black font-bold">
                G
              </div>
              <span className="font-semibold text-lg">Agon</span>
            </div>
          </div>

          {/* Contenido de la Página */}
          <div className={isFullWidthPage ? "" : "p-4 md:p-6 lg:p-8"}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );

};

export default MainLayout;
