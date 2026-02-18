import React, { useMemo } from 'react';
import { Play } from 'lucide-react';

const getTrailerVideoUrl = (trailer) =>
    trailer?.data?.max || trailer?.data?.['480'] || trailer?.data?.preview || '';

const getTrailerThumb = (trailer) =>
    trailer?.preview || trailer?.data?.preview || '';

export default function GameTrailersCarousel({ trailers = [], gameName = '' }) {
    const validTrailers = useMemo(
        () => trailers.filter((item) => getTrailerVideoUrl(item)),
        [trailers]
    );

    if (!validTrailers.length) return null;

    return (
        <section className="relative rounded-3xl border border-white/15 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 p-5 sm:p-7 shadow-2xl overflow-hidden">
            <div className="pointer-events-none absolute inset-0" />

            <div className="relative z-10 space-y-6">
                <div className="space-y-3">
                    <p className="text-2xl font-bold text-white flex items-center gap-2 mb-4 border-b border-white/20 pb-3">
                        Trailers
                    </p>

                    <div className="flex gap-3 overflow-x-auto pb-1 pr-1">
                        {validTrailers.map((trailer, index) => {
                            const thumb = getTrailerThumb(trailer);
                            const videoUrl = getTrailerVideoUrl(trailer);

                            return (
                                <a
                                    key={trailer.id || `${trailer.name}-${index}`}
                                    href={videoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative shrink-0 w-[250px] sm:w-[280px] text-left rounded-xl border border-white/15 transition-all hover:border-white/35"
                                >
                                    <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-950">
                                        {thumb ? (
                                            <img
                                                src={thumb}
                                                alt={`${gameName} trailer ${index + 1}`}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                                                Sin miniatura
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                                        <span className="absolute right-2 bottom-2 h-7 w-7 rounded-full bg-black/80 text-white flex items-center justify-center">
                                            <Play size={12} className="fill-white ml-0.5" />
                                        </span>
                                    </div>
                                    <div className="px-3 py-2">
                                        <p className="text-sm font-semibold text-white truncate">
                                            {trailer.name || `Trailer ${index + 1}`}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {gameName || 'Juego'}
                                        </p>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
