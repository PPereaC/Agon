import { Input } from "@heroui/react";

export const SearchIcon = (props) => (
    <svg 
        aria-hidden="true" 
        fill="none" 
        focusable="false" 
        height="20" 
        role="presentation"
        viewBox="0 0 24 24" 
        width="20" 
        {...props}
    >
        <path
            d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
        />
        <path
            d="M22 22L20 20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
        />
    </svg>
);

export const SearchInput = () => {
    return (
        <div className="relative w-full max-w-xl sm:w-[520px]">
            <div className="flex items-center gap-3 px-4 py-2 border border-surface rounded-lg shadow-md bg-surface-card backdrop-blur-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-200">
                {/* Icono de búsqueda */}
                <SearchIcon className="text-white flex-shrink-0" />

                {/* Input */}
                <input
                    type="search"
                    placeholder="Buscar..."
                    className="flex-grow bg-transparent text-sm text-text-title placeholder:text-text-title focus:outline-none w-full"
                />

                {/* Atajo de teclado */}
                <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-text-muted bg-surface border border-surface-secondary rounded">
                    <span className="text-xs text-text-muted">⌘</span>K
                </kbd>
            </div>
        </div>
    );
};

export default SearchInput;
