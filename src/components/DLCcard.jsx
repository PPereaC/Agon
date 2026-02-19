import * as React from "react"
import { Card } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Calendar } from "lucide-react"

export const DLCcard = ({ dlcs, fallbackImageUrl }) => {
    if (!dlcs?.length) return null

    const formatDate = (value) => {
        if (!value) return "Sin fecha"
        const date = new Date(value)
        if (Number.isNaN(date.getTime())) return "Sin fecha"
        return date.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        })
    }

    return (
        <Carousel className="w-full">
            <CarouselContent className="-ml-3">
                {dlcs.map((dlc) => (
                    <CarouselItem key={dlc.id} className="basis-full pl-3 sm:basis-1/2 xl:basis-1/3">
                        <div className="p-1">
                            <Card className="group overflow-hidden rounded-2xl border border-white/20 bg-zinc-900/75 text-white shadow-xl shadow-black/20">
                                <div className="relative aspect-video w-full overflow-hidden">
                                    <img
                                        src={dlc.background_image || dlc.short_screenshots?.[0]?.image || fallbackImageUrl}
                                        alt={dlc.name || "DLC"}
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    <div className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/40 px-2 py-0.5 text-[10px] font-semibold tracking-[0.08em] text-white/90 backdrop-blur-sm">
                                        DLC
                                    </div>
                                </div>
                                <div className="space-y-2 p-4">
                                    <p className="line-clamp-1 text-base font-semibold leading-tight">{dlc.name}</p>
                                    <p className="flex items-center gap-2 text-xs text-zinc-300">
                                        <Calendar size={13} className="text-zinc-400" />
                                        {formatDate(dlc.released).toUpperCase()}
                                    </p>
                                </div>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 md:-left-10 border-white/80 bg-black/50 text-white hover:bg-black/70" />
            <CarouselNext className="-right-4 md:-right-10 border-white/80 bg-black/50 text-white hover:bg-black/70" />
        </Carousel>
    )
}

export default DLCcard;
