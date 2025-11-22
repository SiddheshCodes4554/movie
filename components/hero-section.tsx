"use client"

import { useState, useEffect } from "react"
import { Play, Info, Star, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MovieDetails } from "@/components/movie-details"
import { motion, AnimatePresence } from "framer-motion"

interface HeroSectionProps {
    movies: any[]
}

export function HeroSection({ movies }: HeroSectionProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [selectedMovie, setSelectedMovie] = useState<any>(null)
    const [isScrolled, setIsScrolled] = useState(false)

    // Use top 5 movies
    const featuredMovies = movies.slice(0, 5)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        if (featuredMovies.length === 0) return
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % featuredMovies.length)
        }, 8000) // Slower rotation for immersive feel
        return () => clearInterval(interval)
    }, [featuredMovies.length])

    if (featuredMovies.length === 0) return null

    const movie = featuredMovies[currentIndex]

    return (
        <>
            <div className="relative h-screen w-full overflow-hidden bg-black">
                {/* Background Image with Parallax-like feel */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={movie.id}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute inset-0"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `url(${movie.backdrop_url || movie.poster_url})`,
                            }}
                        >
                            {/* Cinematic Gradient Overlays */}
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/20 to-transparent" />
                            <div className="absolute inset-0 bg-black/20" /> {/* General dimming */}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full z-20 pb-24 pt-24 px-4 md:px-12 lg:px-24 bg-gradient-to-t from-background to-transparent">
                    <div className="max-w-4xl space-y-6">
                        <motion.div
                            key={`text-${movie.id}`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            {/* Metadata Pills */}
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <Badge variant="outline" className="border-primary/50 text-primary bg-primary/10 backdrop-blur-md px-3 py-1">
                                    Trending #1
                                </Badge>
                                <div className="flex items-center gap-2 text-sm font-medium text-gray-300 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                                    <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                                    <span>{movie.rating}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm font-medium text-gray-300 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                                    <Clock className="h-3.5 w-3.5" />
                                    <span>{movie.duration}m</span>
                                </div>
                                <div className="text-sm font-medium text-gray-300 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                                    {movie.genre}
                                </div>
                            </div>

                            {/* Title */}
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6 drop-shadow-2xl">
                                {movie.title}
                            </h1>

                            {/* Description */}
                            <p className="text-lg md:text-xl text-gray-200 max-w-2xl line-clamp-3 mb-8 leading-relaxed drop-shadow-md">
                                {movie.description}
                            </p>

                            {/* Actions */}
                            <div className="flex flex-wrap gap-4">
                                <Button
                                    size="lg"
                                    className="h-14 px-8 rounded-full bg-white text-black hover:bg-white/90 font-bold text-lg transition-transform hover:scale-105"
                                    onClick={() => setSelectedMovie(movie)}
                                >
                                    <Play className="h-5 w-5 mr-2 fill-current" />
                                    Book Ticket
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="h-14 px-8 rounded-full border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 font-semibold text-lg transition-transform hover:scale-105"
                                >
                                    <Info className="h-5 w-5 mr-2" />
                                    More Info
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Progress Indicators */}
                <div className="absolute bottom-8 right-8 md:right-12 flex gap-2 z-30">
                    {featuredMovies.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex ? "w-8 bg-white" : "w-2 bg-white/30 hover:bg-white/50"
                                }`}
                        />
                    ))}
                </div>
            </div>

            {selectedMovie && <MovieDetails movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
        </>
    )
}
