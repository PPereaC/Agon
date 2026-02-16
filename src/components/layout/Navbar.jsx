import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@heroui/navbar";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@heroui/dropdown";
import { Avatar, AvatarGroup, AvatarIcon } from "@heroui/avatar";
import { Gamepad2 } from "lucide-react";

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
    return (
        <Navbar isBordered className="w-full bg-surface-darkest border-b border-primary h-13">
            <NavbarContent justify="start" className="flex-1 items-center">
                <NavbarBrand className="ml-8 mr-6">
                    <Gamepad2 size={31} className="mr-2 text-primary mt-1" />
                    <p className="font-primary font-bold text-primary text-2xl">LEXIS</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden md:flex flex-1 justify-center gap-6 text-text-title">
                <NavbarItem>
                    <Link className="text-text-title hover:text-primary" href="#">
                        Trending
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className="text-text-title hover:text-primary" aria-current="page" href="#">
                        Novedades
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className="text-text-title hover:text-primary" href="#">
                        Proximamente
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className="text-text-title hover:text-primary" href="#">
                        Eternos
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className="text-text-title hover:text-primary" href="#">
                        Generos
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent as="div" justify="end" className="items-center justify-end flex-1 gap-3 pr-4">
                <Dropdown placement="bottom-end" className="bg-surface-darkest">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            color="secondary"
                            name="Jason Hughes"
                            size="sm"
                            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="settings" className="text-white">Mi biblioteca</DropdownItem>
                        <DropdownItem key="settings" className="text-white">Ajustes</DropdownItem>
                        <DropdownItem key="logout" className="text-red-500">
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </Navbar>
    );
}

export default NavbarApp;