import { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import { Link } from "@heroui/link";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { Gamepad2, ChevronDown, Move } from "lucide-react";
import { useGenres } from "../../hooks/useGenres";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"


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

    return (
        <Navbar
            isBordered
            className="bg-[#020617]/90 backdrop-blur-md border-b border-white/10 h-16 p-3"
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
            <NavbarContent justify="start" className="flex-1 items-center">
                <NavbarBrand className="gap-3 transition-transform cursor-pointer flex items-center">
                    <a href="/" className="flex items-center h-full">
                        <img 
                            src="/src/assets/logo.png" 
                            alt="'Agon', del griego antiguo, significa lucha o competencia, evocando el desafío épico y la contienda en los videojuegos." 
                            className="h-8 w-auto object-contain"
                        />
                    </a>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden md:flex flex-1 justify-center gap-8">
                <NavbarItem>
                    <Link
                        className="text-gray-300 hover:text-white transition-colors font-medium text-sm tracking-wide"
                        href="/"
                    >
                        Tendencias
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link
                        className="text-gray-300 hover:text-white transition-colors font-medium text-sm tracking-wide"
                        aria-current="page"
                        href="/novedades"
                    >
                        Novedades
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link
                        className="text-gray-300 hover:text-white transition-colors font-medium text-sm tracking-wide"
                        href="#"
                    >
                        Próximamente
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link
                        className="text-gray-300 hover:text-white transition-colors font-medium text-sm tracking-wide"
                        href="#"
                    >
                        Eternos
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
                                className={`transition-colors font-medium text-sm tracking-wide cursor-pointer gap-1 items-center ${isGenresOpen ? "text-primary opacity-100" : "text-gray-300 hover:text-white"}`}
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
                                                    href={`/genero/${genre.slug}`}
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
                <div className="hidden lg:flex items-center gap-2 mr-2">
                    <div className="h-8 w-[1px] bg-white/20 mx-2"></div>
                </div>
                <div className="relative">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Badge className="pointer-events-none absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#020617] bg-green-600 p-0" />
                </div>
            </NavbarContent>
        </Navbar>
    );
}

export default NavbarApp;
