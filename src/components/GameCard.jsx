import { Card, CardHeader, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { useNavigate } from "react-router-dom";
import notFoundImage from '../assets/notfound.png';
import { Badge } from "@/components/ui/badge"
import { Calendar, CalendarFold } from "lucide-react";

const platformIcon = (key) => {
    const basePath = import.meta.env.PROD ? '/Agon' : '';
    const icons = {
        playstation: (props) => <img src={`${basePath}/svgs/playstation.svg`} alt="PlayStation" {...props} />,
        xbox: (props) => <img src={`${basePath}/svgs/xbox.svg`} alt="Xbox" {...props} />,
        nintendo: (props) => <img src={`${basePath}/svgs/nintendo.svg`} alt="Nintendo" {...props} />,
        pc: (props) => <img src={`${basePath}/svgs/pc.png`} alt="PC" {...props} />,
        ios: (props) => <img src={`${basePath}/svgs/apple_dark.svg`} alt="iOS" {...props} />,
        android: (props) => <img src={`${basePath}/svgs/android-icon.svg`} alt="Android" {...props} />,
        linux: (props) => <img src={`${basePath}/svgs/linux.svg`} alt="Linux" {...props} />,
        macOS: (props) => <img src={`${basePath}/svgs/mac.png`} alt="Mac" {...props} />
    };

    return icons[key] || icons.pc;
};

const platformKey = (platform) => {
    const id = platform?.id;
    const slug = platform?.slug || "";

    if ([186, 14, 1, 80, 186].includes(id) || slug.includes("xbox")) return "xbox"; // Xbox Series X/S (186) + familia
    if ([187, 18, 16, 15].includes(id) || slug.includes("playstation")) return "playstation"; // PS5/PS4/PS3/PS2
    if ([7].includes(id) || slug.includes("nintendo")) return "nintendo";
    if (id === 4 || slug === "pc") return "pc"; // PC
    if (id === 3 || slug.includes("ios")) return "ios"; // iOS
    if (id === 21 || slug.includes("android")) return "android"; // Android
    if (id === 6 || slug.includes("linux")) return "linux"; // Linux
    if (id === 5 || slug.includes("mac")) return "macOS"; // macOS

    return slug || "pc";
};

export const GameCard = ({ game, nextRelease }) => {
    const navigate = useNavigate();

    const cover =
        game.background_image ||
        game.background_image_additional ||
        game?.short_screenshots?.[0]?.image ||
        notFoundImage;

    const formatDate = game.released 
        ? game.released.split('-').reverse().join('-')
        : 'Próximamente';

    return (
        <Card isPressable onPress={() => navigate(`/juego/${game.id}`)} className="group relative h-full overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-b from-white/10 via-white/5 to-white/10 backdrop-blur-xl shadow-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-white/50 hover:shadow-[0_28px_90px_-32px_rgba(0,0,0,0.8)]">
            <CardHeader className="p-0">
                <div className="relative w-full aspect-[16/9] overflow-hidden">
                    <img
                        src={cover}
                        alt={game.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/25 opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-white/30 bg-black/85 px-3 py-1.5 text-white shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur-2xl ring-1 ring-white/25">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-amber-300 drop-shadow">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-semibold leading-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">{game.rating}</span>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="flex flex-1 flex-col gap-3 px-4 pb-5 pt-3 text-white">
                <div className="flex justify-between gap-3 text-sm text-white/80">
                    <div className="flex items-center gap-1.5 text-white/90">
                        {[...(new Set(
                            (game.parent_platforms || [])
                                .map((p) => platformKey(p.platform))
                                .filter(Boolean)
                        ))]
                            .slice(0, 6)
                            .map((key) => {
                                const Icon = platformIcon(key);
                                return (
                                    <span
                                        key={key}
                                        className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/8 backdrop-blur"
                                        title={key}
                                    >
                                        <Icon className="h-4 w-4 text-white" />
                                    </span>
                                );
                            })}
                    </div>
                    {nextRelease ? (
                        <Badge className="bg-gray-800 text-white border border-white/15 hover:bg-gray-800 gap-1.5 py-1">
                            <CalendarFold data-icon="inline-start" className="h-4 w-4" />
                            {formatDate}
                        </Badge>
                    ) : null}
                </div>

                {/* Título del juego */}
                <h3 className="line-clamp-2 text-lg font-semibold leading-tight tracking-tight text-white text-left">
                    {game.name}
                </h3>

                <div className="mt-auto flex flex-wrap gap-2 pt-1">
                    {game.genres?.slice(0, 3).map((genre, index) => (
                        <Chip
                            key={index}
                            size="sm"
                            variant="flat"
                            className="border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/90 shadow-sm backdrop-blur-md"
                            classNames={{
                                content: "text-center px-1"
                            }}
                        >
                            {genre.name}
                        </Chip>
                    ))}
                    {game.genres?.length > 3 && (
                        <Chip
                            size="sm"
                            variant="flat"
                            className="border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/70"
                            classNames={{
                                content: "text-center px-1"
                            }}
                        >
                            +{game.genres.length - 3}
                        </Chip>
                    )}
                </div>
            </CardBody>
        </Card>
    );
};