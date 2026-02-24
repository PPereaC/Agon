import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    BadgeCheckIcon,
    BellIcon,
    CreditCardIcon,
    Heart,
    LogOutIcon,
    UserRound,
} from "lucide-react"

export const DropdownMenuAvatar = ({ navigate, handleLogout }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
                        <AvatarFallback>LR</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#020617] border-white/10">
                <DropdownMenuGroup>
                    <DropdownMenuItem className="text-white hover:bg-white/10 hover:text-white cursor-pointer" onClick={() => navigate('/perfil')}>
                        <UserRound />
                        Perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-white hover:bg-white/10 hover:text-white cursor-pointer" onClick={() => navigate('/favoritos')} disabled>
                        <Heart />
                        Mis favoritos
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-white hover:bg-white/10 hover:text-white cursor-pointer" onClick={() => navigate('/notificaciones')} disabled>
                        <BellIcon />
                        Notificaciones
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-white hover:bg-white/10 hover:text-red-400 cursor-pointer" onClick={handleLogout}>
                    <LogOutIcon />
                    Cerrar Sesión
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DropdownMenuAvatar;