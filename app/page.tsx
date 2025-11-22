import { createClient } from "@/lib/supabase/server"
import { HeroCarousel } from "@/components/hero-carousel"
import Image from "next/image"
import Link from "next/link"
import { Star, Play, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TopRatedSection } from "@/components/top-rated-section"

export const dynamic = "force-dynamic"

export default async function Home({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const supabase = await createClient()
  const { q } = await searchParams

  const { data: movies } = await supabase.from("movies").select("*")
  const allMovies = movies || []

  const filteredMovies = q
    ? allMovies.filter(movie => movie.title.toLowerCase().includes(q.toLowerCase()))
    : allMovies

  // Get top 5 movies for carousel
  const trendingMovies = allMovies
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5)

  const topRatedMovies = filteredMovies.filter(m => m.rating >= 4.5).slice(0, 10)
  const newReleases = filteredMovies.slice(0, 12)

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      {!q && <HeroCarousel movies={trendingMovies} />}

      <div className="px-6 md:px-12 space-y-12 mt-12">
        {/* Top Rated Section with Numbers */}
        <TopRatedSection movies={topRatedMovies} />

        {/* New Releases Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">New Releases</h2>
            <Link href="#" className="text-sm text-primary hover:underline">See All</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {newReleases.map((movie) => (
              <Link
                href={`/movie/${movie.id}`}
                key={movie.id}
                className="group"
              >
                <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-muted mb-3 transition-all duration-300 group-hover:ring-2 ring-primary ring-offset-2 ring-offset-background">
                  <Image
                    src={movie.poster_url}
                    alt={movie.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-yellow-500 flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current" /> {movie.rating}
                  </div>
                </div>
                <h3 className="font-medium text-white line-clamp-1 group-hover:text-primary transition-colors">{movie.title}</h3>
                <p className="text-sm text-muted-foreground">{movie.genre}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
