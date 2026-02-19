const galleryPattern = [
    "col-span-12 sm:col-span-6 lg:col-span-8 h-56 sm:h-64",
    "col-span-12 sm:col-span-6 lg:col-span-4 h-56 sm:h-64",
    "col-span-12 sm:col-span-6 lg:col-span-4 h-44 sm:h-52",
    "col-span-12 sm:col-span-6 lg:col-span-4 h-44 sm:h-52",
    "col-span-12 sm:col-span-6 lg:col-span-4 h-44 sm:h-52",
];

export default function GameScreenshotsGallery({ screenshots = [], gameName = "", onImageSelect }) {
    return (
        <div className="space-y-10">
            <div className="flex items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-white mb-2">
                        Galeria
                    </h2>
                    <p className="text-sm text-zinc-400">
                        Capturas oficiales del juego en formato mural
                    </p>
                </div>
                <span className="rounded-full border border-white/15 bg-zinc-900/70 px-3 py-1 text-xs font-semibold text-zinc-200">
                    {screenshots.length} CAPTURA{screenshots.length !== 1 ? "S" : ""}
                </span>
            </div>

            <div className="grid grid-cols-12 gap-3 sm:gap-4">
                {screenshots.length === 0 && (
                    <div className="col-span-12 rounded-2xl border border-dashed border-white/20 bg-black/20 p-10 text-center text-zinc-400">
                        No hay capturas disponibles para este juego.
                    </div>
                )}
                {screenshots.map((img, index) => (
                    <button
                        key={img.id || `${img.image}-${index}`}
                        type="button"
                        onClick={() => onImageSelect?.(img.image)}
                        className={`group relative overflow-hidden rounded-2xl border border-white/15 bg-zinc-950 text-left ${galleryPattern[index % galleryPattern.length]}`}
                    >
                        <img
                            src={img.image}
                            alt={`${gameName} screenshot ${index + 1}`}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-90" />
                        <div className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/40 px-2 py-0.5 text-[10px] font-semibold tracking-[0.08em] text-white/90 backdrop-blur-sm">
                            SHOT {String(index + 1).padStart(2, "0")}
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                            <span className="text-xs font-semibold text-zinc-200">
                                {gameName}
                            </span>
                            <span className="rounded-full border border-white/20 bg-black/40 px-2 py-1 text-[10px] font-semibold tracking-wide text-white/90 backdrop-blur-sm">
                                ABRIR
                            </span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
