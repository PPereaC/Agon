import React, { useMemo } from "react"
import { Play } from "lucide-react"
import { Card } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

const getTrailerVideoUrl = (trailer) =>
    trailer?.data?.max || trailer?.data?.["480"] || trailer?.data?.preview || ""

const getTrailerThumb = (trailer) =>
    trailer?.preview || trailer?.data?.preview || ""

export default function GameTrailersCarousel({ trailers = [], gameName = "", fallbackImageUrl }) {
    const validTrailers = useMemo(
        () => trailers.filter((item) => getTrailerVideoUrl(item)),
        [trailers]
    )

    if (!validTrailers.length) return null

    return (
        <Carousel className="w-full">
            <CarouselContent className="-ml-3">
                {validTrailers.map((trailer, index) => {
                    const thumb = getTrailerThumb(trailer)
                    const videoUrl = getTrailerVideoUrl(trailer)

                    return (
                        <CarouselItem
                            key={trailer.id || `${trailer.name}-${index}`}
                            className="basis-full pl-3 sm:basis-1/2 xl:basis-1/3"
                        >
                            <div className="p-1">
                                <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="block">
                                    <Card className="group overflow-hidden rounded-2xl border border-white/20 bg-zinc-900/75 text-white shadow-xl shadow-black/20">
                                        <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
                                            {thumb || fallbackImageUrl ? (
                                                <img
                                                    src={thumb || fallbackImageUrl}
                                                    alt={`${gameName} trailer ${index + 1}`}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center text-xs text-zinc-400">
                                                    Sin miniatura
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                            <div className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/40 px-2 py-0.5 text-[10px] font-semibold tracking-[0.08em] text-white/90 backdrop-blur-sm">
                                                TRAILER
                                            </div>
                                            <span className="absolute right-3 bottom-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white">
                                                <Play size={13} className="ml-0.5 fill-white" />
                                            </span>
                                        </div>
                                        <div className="space-y-2 p-4">
                                            <p className="line-clamp-1 text-base font-semibold leading-tight">
                                                {trailer.name || `Trailer ${index + 1}`}
                                            </p>
                                            <p className="text-xs text-zinc-300">{gameName || "Juego"}</p>
                                        </div>
                                    </Card>
                                </a>
                            </div>
                        </CarouselItem>
                    )
                })}
            </CarouselContent>
            <CarouselPrevious className="-left-4 md:-left-10 border-white/80 bg-black/50 text-white hover:bg-black/70" />
            <CarouselNext className="-right-4 md:-right-10 border-white/80 bg-black/50 text-white hover:bg-black/70" />
        </Carousel>
    )
}
