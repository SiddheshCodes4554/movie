"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star, PlayCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MovieDetails } from "@/components/movie-details"
import { cn } from "@/lib/utils"
import { useDraggableScroll } from "@/hooks/use-draggable-scroll"

interface MovieSectionProps {
    title: string
    movies: any[]
    variant?: "portrait" | "landscape"
}

export function MovieSection({ title, movies, variant = "portrait" }: MovieSectionProps) {
    const { ref: scrollContainerRef } = useDraggableScroll()
    const [selectedMovie, setSelectedMovie] = useState<any>(null)
    const [showControls, setShowControls] = useState(false)

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef
            const scrollAmount = direction === "left" ? -current.clientWidth * 0.75 : current.clientWidth * 0.75
            current.scrollBy({ left: scrollAmount, behavior: "smooth" })
        }
    }

    if (movies.length === 0) return null

    return (
        <div
            className="py-8 space-y-4 group/section"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
        >
            <div className="container px-4 md:px-12 flex items-center justify-between">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
                    <span className="w-1 h-8 bg-primary rounded-full block"></span>
                    {title}
                </h2>
                <Button variant="link" className="text-primary hover:text-primary/80">
                    View All
                </Button>
            </div>

            <div className="relative group">
                {/* Left Control */}
                <div className={cn(
                    "absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-20 flex items-center justify-start pl-4 transition-opacity duration-300",
                    showControls ? "opacity-100" : "opacity-0 pointer-events-none"
                )}>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-12 w-12 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all"
                        onClick={() => scroll("left")}
                    >
                        <ChevronLeft className="h-8 w-8" />
                    </Button>
                </div>

                {/* Scroll Container */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-4 overflow-x-auto pb-8 pt-4 px-4 md:px-12 scrollbar-hide snap-x snap-mandatory cursor-grab active:cursor-grabbing"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {movies.map((movie) => (
                        <div
                            key={movie.id}
                            className={cn(
                                "flex-none snap-start cursor-pointer group/card relative transition-all duration-300 hover:z-10",
                                variant === "portrait" ? "w-[160px] md:w-[220px]" : "w-[280px] md:w-[400px]"
                            )}
                            onClick={() => setSelectedMovie(movie)}
                        >
                            <div className={cn(
                                "relative overflow-hidden rounded-xl bg-muted shadow-lg transition-all duration-500 group-hover/card:scale-105 group-hover/card:shadow-2xl group-hover/card:shadow-primary/20",
                                variant === "portrait" ? "aspect-[2/3]" : "aspect-video"
                            )}>
                                <Image
                                    src={variant === "portrait" ? (movie.poster_url || "/placeholder.svg") : (movie.backdrop_url || movie.poster_url)}
                                    alt={movie.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover/card:scale-110 pointer-events-none"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />

                                {/* Play Icon */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                                    <div className="h-14 w-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                                        <PlayCircle className="h-8 w-8 text-white fill-white/20" />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3 space-y-1 px-1">
                                <h3 className="font-semibold text-white line-clamp-1 group-hover/card:text-primary transition-colors">
                                    {movie.title}
                                </h3>
                                <div className="flex items-center justify-between text-xs text-gray-400">
                                    <span>{movie.genre}</span>
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        <Star className="h-3 w-3 fill-current" />
                                        <span>{movie.rating}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Control */}
                <div className={cn(
                    "absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-20 flex items-center justify-end pr-4 transition-opacity duration-300",
                    showControls ? "opacity-100" : "opacity-0 pointer-events-none"
                )}>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-12 w-12 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all"
                        onClick={() => scroll("right")}
                    >
                        <ChevronRight className="h-8 w-8" />
                    </Button>
                </div>
            </div>

            {selectedMovie && <MovieDetails movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
        </div>
    )
}
