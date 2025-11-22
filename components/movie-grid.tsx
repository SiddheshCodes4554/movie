"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, PlayCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { MovieDetails } from "@/components/movie-details"
import { Badge } from "@/components/ui/badge"

interface MovieGridProps {
  movies: any[]
}

export function MovieGrid({ movies }: MovieGridProps) {
  const [selectedMovie, setSelectedMovie] = useState<any>(null)

  if (movies.length === 0) {
    return (
      <div className="flex h-60 items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/5">
        <p className="text-muted-foreground">No movies found matching your criteria.</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="group relative cursor-pointer"
            onClick={() => setSelectedMovie(movie)}
          >
            <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-muted transition-all duration-500 group-hover:shadow-[0_0_40px_-10px_rgba(var(--primary),0.3)] group-hover:scale-[1.02]">
              <Image
                src={movie.poster_url || "/placeholder.svg"}
                alt={movie.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

              {/* Hover Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 transition-all duration-300 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
                <div className="flex items-center justify-center mb-auto pt-12">
                  <div className="h-12 w-12 rounded-full bg-primary/90 flex items-center justify-center shadow-lg shadow-primary/50 backdrop-blur-sm scale-0 transition-transform duration-300 group-hover:scale-100 delay-100">
                    <PlayCircle className="h-6 w-6 text-white fill-white/20" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-md">
                    {movie.genre}
                  </Badge>
                  <p className="line-clamp-2 text-xs text-gray-300 font-medium leading-relaxed">
                    {movie.description}
                  </p>
                  <div className="pt-2 flex items-center justify-between border-t border-white/10">
                    <span className="text-xs font-medium text-white">{movie.language}</span>
                    <span className="text-xs font-medium text-white">{movie.duration} min</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Always Visible Content */}
            <div className="mt-3 space-y-1">
              <h3 className="line-clamp-1 text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                {movie.title}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{new Date().getFullYear()}</span>
                <div className="flex items-center gap-1 bg-secondary/50 px-2 py-0.5 rounded-md">
                  <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                  <span className="text-xs font-bold text-foreground">{movie.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedMovie && <MovieDetails movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
    </>
  )
}
