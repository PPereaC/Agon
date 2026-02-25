import { useState, useEffect, useRef, useCallback } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { Gamepad2, ChevronDown, Search, User, LogOut, Heart, Shield, Menu, Flame, Calendar, CalendarClock, Trophy, Swords } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGenres } from "../../hooks/useGenres";
import { useSearchGames } from "../../hooks/useGames";
import { debounce } from "../../utils/helpers.js";
import { useAuth } from "../../contexts/AuthContext.jsx";
import DropdownMenuAvatar from "./AvatarDropdownMenu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import SearchField from "./SearchField";
import logo from "@/assets/logo.png";


export const SearchIcon = ({ size = 24, strokeWidth = 1.5, width, height, ...props }) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height={height || size}
            role="presentation"
            viewBox="0 0 24 24"
            width={width || size}
            {...props}
        >
            <path
                d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={strokeWidth}
            />
            <path
                d="M22 22L20 20"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={strokeWidth}
            />
        </svg>
    );
};

export const NavbarApp = () => {
    const { genres, loading } = useGenres();
    const [isGenresOpen, setIsGenresOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [inputValue, setInputValue] = useState("");
    const searchRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { user, isAuthenticated, isAdmin, logout } = useAuth();

    // Debounce para la búsqueda
    const debouncedSetSearch = useCallback(
        debounce((val) => {
            setSearchQuery(val);
            setIsSearchOpen(val.length > 0);
        }, 300),
        []
    );

    // Cerrar dropdown al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const { data: searchResults, isLoading: searchLoading } = useSearchGames({
        search: searchQuery,
        page_size: 6,
    }, searchQuery.length > 2);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <Navbar
            isBordered
            className="bg-[#020617]/90 backdrop-blur-md border-b border-white/10 h-14 sm:h-16 p-2 sm:p-3"
            maxWidth="xl"
            classNames={{
                item: [
                    "flex",
                    "relative",
                    "h-full",
                    "items-center",
                    "data-[active=true]:after:content-['']",
                    "data-[active=true]:after:absolute",
                    "data-[active=true]:after:bottom-0",
                    "data-[active=true]:after:left-0",
                    "data-[active=true]:after:right-0",
                    "data-[active=true]:after:h-[2px]",
                    "data-[active=true]:after:rounded-[2px]",
                    "data-[active=true]:after:bg-primary",
                ],
            }}
        >
            <NavbarContent justify="start" className="flex-1 items-center gap-2 sm:gap-3 p-0 m-0">
                {/* Botón de menú móvil */}
                <div className="lg:hidden -ml-6">
                    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                        <SheetTrigger asChild>
                            <Button
                                isIconOnly
                                variant="light"
                                className="text-white hover:text-gray-300"
                            >
                                <Menu className="w-6 h-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[280px] sm:w-[320px] bg-[#0a0a0a] border-r border-white/10 p-0">
                            <div className="flex flex-col h-full">
                                {/* Header del menú */}
                                <div className="p-4 border-b border-white/10">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={logo}
                                            alt="AGON"
                                            className="h-8 w-auto object-contain"
                                        />
                                    </div>
                                </div>

                                {/* Opciones de navegación */}
                                <nav className="flex-1 py-4 overflow-y-auto min-h-0">
                                    <div className="flex flex-col h-full px-3">
                                        <SheetClose asChild>
                                            <button
                                                onClick={() => navigate('/')}
                                                className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-white hover:bg-white/10 transition-colors text-left"
                                            >
                                                <Flame className="w-5 h-5 text-primary text-white" />
                                                <span className="font-medium">Tendencias</span>
                                            </button>
                                        </SheetClose>

                                        <SheetClose asChild>
                                            <button
                                                onClick={() => navigate('/novedades')}
                                                className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-white hover:bg-white/10 transition-colors text-left"
                                            >
                                                <Calendar className="w-5 h-5 text-primary text-white" />
                                                <span className="font-medium">Novedades</span>
                                            </button>
                                        </SheetClose>

                                        <SheetClose asChild>
                                            <button
                                                onClick={() => navigate('/proximamente')}
                                                className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-white hover:bg-white/10 transition-colors text-left"
                                            >
                                                <CalendarClock className="w-5 h-5 text-primary text-white" />
                                                <span className="font-medium">Próximamente</span>
                                            </button>
                                        </SheetClose>

                                        <SheetClose asChild>
                                            <button
                                                onClick={() => navigate('/top')}
                                                className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-white hover:bg-white/10 transition-colors text-left"
                                            >
                                                <Trophy className="w-5 h-5 text-primary text-white" />
                                                <span className="font-medium">Excelentes</span>
                                            </button>
                                        </SheetClose>

                                        {/* Sección de Géneros */}
                                        <div className="pt-4 mt-4 border-t border-white/10 flex-1 flex flex-col min-h-0">
                                            <h4 className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                                                Géneros
                                            </h4>
                                            {loading ? (
                                                <div className="px-3 py-2 text-gray-500 text-sm">Cargando...</div>
                                            ) : (
                                                <div className="space-y-1 flex-1 overflow-y-auto min-h-0">
                                                    {genres?.map((genre) => (
                                                        <SheetClose key={genre.id} asChild>
                                                            <button
                                                                onClick={() => navigate(`/genero/${genre.slug}`)}
                                                                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors text-left text-sm"
                                                            >
                                                                <div className="w-8 h-8 rounded overflow-hidden bg-zinc-800 flex-shrink-0">
                                                                    <img
                                                                        src={genre.image_background}
                                                                        alt={genre.name}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                </div>
                                                                <span>{genre.name}</span>
                                                            </button>
                                                        </SheetClose>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </nav>

                                {/* Footer del menú */}
                                <div className="p-2 border-t border-white/10">
                                    {isAuthenticated() ? (
                                        <div className="space-y-1">
                                            <SheetClose asChild>
                                                <button
                                                    onClick={() => navigate('/perfil')}
                                                    className="w-full flex items-center gap-2 px-2 py-2 rounded text-sm text-white hover:bg-white/10 transition-colors text-left"
                                                >
                                                    <User className="w-4 h-4 text-white" />
                                                    <span>Perfil</span>
                                                </button>
                                            </SheetClose>
                                            {isAdmin() && (
                                                <SheetClose asChild>
                                                    <button
                                                        onClick={() => navigate('/admin')}
                                                        className="w-full flex items-center gap-2 px-2 py-2 rounded text-sm text-white hover:bg-white/10 transition-colors text-left"
                                                    >
                                                        <Shield className="w-4 h-4 text-white" />
                                                        <span>Admin</span>
                                                    </button>
                                                </SheetClose>
                                            )}
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-2 px-2 py-2 rounded text-sm text-red-400 hover:bg-white/10 transition-colors text-left"
                                            >
                                                <LogOut className="w-4 h-4 text-white" />
                                                <span>Cerrar Sesión</span>
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-1">
                                            <SheetClose asChild>
                                                <button
                                                    onClick={() => navigate('/login')}
                                                    className="w-full flex items-center gap-2 px-2 py-2 rounded text-sm text-white hover:bg-white/10 transition-colors text-left"
                                                >
                                                    <User className="w-4 h-4 text-white" />
                                                    <span>Entrar</span>
                                                </button>
                                            </SheetClose>
                                            <SheetClose asChild>
                                                <button
                                                    onClick={() => navigate('/registro')}
                                                    className="w-full flex items-center gap-2 px-2 py-2 rounded text-sm text-white hover:bg-white/10 transition-colors text-left"
                                                >
                                                    <Heart className="w-4 h-4 text-white" />
                                                    <span>Registro</span>
                                                </button>
                                            </SheetClose>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                <NavbarBrand className="gap-2 sm:gap-3 transition-transform cursor-pointer flex items-center" onClick={() => navigate('/')}>
                    <div className="flex items-center h-full">
                        <img
                            src={logo}
                            alt="'Agon', del griego antiguo, significa lucha o competencia, evocando el desafío épico y la contienda en los videojuegos."
                            className="h-6 sm:h-7 md:h-8 w-auto object-contain"
                        />
                    </div>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden lg:flex flex-1 justify-center gap-4 sm:gap-6 md:gap-8">
                <NavbarItem>
                    <Link
                        className="text-white hover:text-gray-300 transition-colors font-medium text-xs sm:text-sm tracking-wide cursor-pointer"
                        onPress={() => navigate('/')}
                    >
                        Tendencias
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link
                        className="text-white hover:text-gray-300 transition-colors font-medium text-xs sm:text-sm tracking-wide cursor-pointer"
                        aria-current="page"
                        onPress={() => navigate('/novedades')}
                    >
                        Novedades
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link
                        className="text-white hover:text-gray-300 transition-colors font-medium text-xs sm:text-sm tracking-wide cursor-pointer"
                        onPress={() => navigate('/proximamente')}
                    >
                        Próximamente
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link
                        className="text-white hover:text-gray-300 transition-colors font-medium text-xs sm:text-sm tracking-wide cursor-pointer"
                        onPress={() => navigate('/top')}
                    >
                        Excelentes
                    </Link>
                </NavbarItem>

                {/* Mega Menú de Géneros */}
                <NavbarItem
                    onMouseEnter={() => setIsGenresOpen(true)}
                    onMouseLeave={() => setIsGenresOpen(false)}
                >
                    <Popover
                        isOpen={isGenresOpen}
                        onOpenChange={setIsGenresOpen}
                        placement="bottom"
                        offset={24}
                        triggerScaleOnOpen={false}
                        classNames={{
                            content: "w-[800px] p-0 bg-[#121212] border border-[#333] shadow-2xl rounded-2xl overflow-hidden"
                        }}
                    >
                        <PopoverTrigger>
                            <Link
                                className={`transition-colors font-medium text-sm md:text-base tracking-wide cursor-pointer gap-1 items-center ${isGenresOpen ? "text-primary opacity-100" : "text-white hover:text-gray-300"}`}
                                onPress={(e) => e.preventDefault()}
                            >
                                Géneros
                            </Link>
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className="flex w-full h-[380px]">
                                {/* Sidebar destacado */}
                                <div className="w-1/4 bg-[#18181b] p-6 flex flex-col gap-2 border-r border-white/10">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Destacados</h4>
                                    {['RPG', 'Acción', 'Aventura', 'Shooter'].map((cat) => (
                                        <Link key={cat} href="#" className="flex items-center justify-between group p-2 rounded-lg hover:bg-white/10 transition-all">
                                            <span className="text-gray-300 group-hover:text-white text-sm font-medium">{cat}</span>
                                            <ChevronDown size={12} className="-rotate-90 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                                        </Link>
                                    ))}
                                    <div className="mt-auto">
                                        <Link href="#" className="flex items-center gap-2 text-primary hover:text-primary-hover text-xs font-bold uppercase tracking-wide transition-colors">
                                            Ver todos <ChevronDown size={12} className="-rotate-90" />
                                        </Link>
                                    </div>
                                </div>

                                {/* Grid de géneros */}
                                <div className="w-3/4 p-6 bg-[#0a0a0a]">
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Explorar categorías</h4>
                                    </div>
                                    {loading ? (
                                        <div className="flex items-center justify-center h-48 text-gray-500 text-sm animate-pulse">Cargando catálogo...</div>
                                    ) : (
                                        <div className="grid grid-cols-3 gap-3">
                                            {genres?.slice(0, 12).map((genre) => (
                                                <Link
                                                    key={genre.id}
                                                    onPress={() => navigate(`/genero/${genre.slug}`)}
                                                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#202020] border border-transparent hover:border-white/10 transition-all group"
                                                >
                                                    <div className="w-11 h-12 rounded-lg overflow-hidden relative shadow-md bg-zinc-800">
                                                        <img
                                                            src={genre.image_background}
                                                            alt={genre.name}
                                                            className="w-full h-full object-cover transition-all duration-300"
                                                        />
                                                    </div>
                                                    <span className="text-gray-400 group-hover:text-white text-sm font-medium transition-colors line-clamp-1">
                                                        {genre.name}
                                                    </span>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent as="div" justify="end" className="items-center justify-end flex-1 gap-2 relative">
                <NavbarItem className="relative hidden md:block" ref={searchRef}>
                    <div className="w-48 sm:w-64 md:w-72 lg:w-80 xl:w-96">
                        <SearchField
                            value={inputValue}
                            onChange={(val) => {
                                setInputValue(val);
                                debouncedSetSearch(val);
                            }}
                            onSubmit={() => {
                                if (searchQuery.trim()) {
                                    setIsSearchOpen(false);
                                    navigate(`/buscar?q=${encodeURIComponent(searchQuery)}`);
                                }
                            }}
                        />
                    </div>

                    {/* Dropdown de resultados */}
                    {isSearchOpen && searchQuery.length > 0 && (
                        <div className="absolute top-full right-0 left-0 mt-2 w-[300px] sm:w-[360px] md:w-[400px] lg:w-[480px] bg-[#121212] border border-[#333] shadow-2xl rounded-2xl overflow-hidden z-50">
                            <div className="flex w-full min-h-[200px] p-4 bg-[#020617]/90">
                                {searchQuery.length <= 2 ? (
                                    <div className="w-full flex flex-col items-center justify-center text-gray-500 py-8">
                                        <Search size={32} className="mb-3 opacity-50" />
                                        <p className="text-sm">Escribe al menos 3 caracteres para buscar</p>
                                    </div>
                                ) : searchLoading ? (
                                    <div className="w-full flex items-center justify-center py-8">
                                        <div className="text-gray-500 text-sm animate-pulse">Buscando...</div>
                                    </div>
                                ) : searchResults?.results?.length === 0 ? (
                                    <div className="w-full flex flex-col items-center justify-center text-gray-500 py-8">
                                        <p className="text-sm">No se encontraron juegos para "{searchQuery}"</p>
                                    </div>
                                ) : (
                                    <div className="w-full grid grid-cols-1 gap-2">
                                        {searchResults?.results?.slice(0, 6).map((game) => (
                                            <Link
                                                key={game.id}
                                                onPress={() => {
                                                    setIsSearchOpen(false);
                                                    setSearchQuery('');
                                                    navigate(`/juego/${game.id}`);
                                                }}
                                                className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#202020] border border-transparent hover:border-white/10 transition-all group"
                                            >
                                                <div className="w-16 h-12 rounded-lg overflow-hidden relative shadow-md bg-zinc-800 flex-shrink-0">
                                                    <img
                                                        src={game.background_image}
                                                        alt={game.name}
                                                        className="w-full h-full object-cover transition-all duration-300"
                                                    />
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-gray-300 group-hover:text-white text-sm font-medium transition-colors line-clamp-1">
                                                        {game.name}
                                                    </span>
                                                    <span className="text-gray-500 text-xs">
                                                        {game.released?.slice(0, 4) || 'N/A'} • ⭐ {game.rating?.toFixed(1) || '0.0'}
                                                    </span>
                                                </div>
                                            </Link>
                                        ))}
                                        {searchResults?.results?.length > 6 && (
                                            <Link
                                                onPress={() => {
                                                    setIsSearchOpen(false);
                                                    setSearchQuery('');
                                                    navigate(`/buscar?q=${encodeURIComponent(searchQuery)}`);
                                                }}
                                                className="flex items-center justify-center p-3 rounded-xl hover:bg-[#202020] border border-transparent hover:border-white/10 transition-all text-gray-400 hover:text-white text-sm font-medium mt-2"
                                            >
                                                Ver todos los resultados →
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </NavbarItem>
                <div className="hidden lg:flex items-center gap-2 mr-2">
                    <div className="h-8 w-[1px] bg-white/20 mx-2"></div>
                </div>

                {/* User Section - Solo visible en desktop */}
                <div className="hidden lg:flex items-center gap-2">
                    {isAuthenticated() ? (
                        <DropdownMenuAvatar navigate={navigate} handleLogout={handleLogout} />
                    ) : (
                        <div className="flex items-center gap-2">
                            <Button
                                variant="light"
                                className="text-white hover:text-gray-300"
                                onClick={() => navigate('/login')}
                            >
                                Iniciar Sesión
                            </Button>
                            <Button
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                                onClick={() => navigate('/registro')}
                            >
                                Registrarse
                            </Button>
                        </div>
                    )}
                </div>
            </NavbarContent>
        </Navbar>
    );
}

export default NavbarApp;
