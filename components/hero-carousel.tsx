"use client"

import React, { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import useEmblaCarousel from "embla-carousel-react"

interface HeroCarouselProps {
  movies: any[]
}

export function HeroCarousel({ movies }: HeroCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on("select", () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    })

    // Manual autoplay
    const interval = setInterval(scrollNext, 5000)
    return () => clearInterval(interval)
  }, [emblaApi, scrollNext])

  if (!movies || movies.length === 0) return null

  return (
    <div className="relative h-[70vh] w-full overflow-hidden group" ref={emblaRef}>
      <div className="flex h-full">
        {movies.map((movie, index) => (
          <div className="relative flex-[0_0_100%] h-full min-w-0" key={movie.id}>
            <div className="absolute inset-0">
              <Image
                src={movie.backdrop_url || movie.poster_url}
                alt={movie.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
            </div>

            <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-10">
              <div className="max-w-2xl space-y-4 animate-in slide-in-from-bottom-10 fade-in duration-700">
                <Badge className="bg-primary text-white hover:bg-primary/90 border-none px-3 py-1 text-sm">
                  #{index + 1} Trending
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                  {movie.title}
                </h1>
                <div className="flex items-center gap-4 text-gray-300 text-sm md:text-base">
                  <span className="flex items-center gap-1 text-yellow-500 font-bold">
                    <Star className="h-4 w-4 fill-current" /> {movie.rating}
                  </span>
                  <span>{movie.duration} min</span>
                  <span>{movie.genre}</span>
                </div>
                <p className="line-clamp-3 text-gray-300 md:text-lg max-w-xl">
                  {movie.description}
                </p>
                <div className="flex gap-4 pt-4">
                  <Button asChild size="lg" className="rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold px-8">
                    <Link href={`/movie/${movie.id}`}>
                      Book Ticket
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-xl border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-white/20">
                    <Play className="h-5 w-5 mr-2" /> Watch Trailer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 right-8 flex gap-2 z-20">
        {movies.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${index === selectedIndex ? "bg-primary w-6" : "bg-white/50 hover:bg-white"
              }`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  )
}
