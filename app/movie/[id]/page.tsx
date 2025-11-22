import { createClient } from "@/lib/supabase/server"
import Image from "next/image"
import Link from "next/link"
import { Star, Clock, Calendar, ChevronLeft, Share2, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { BookButton } from "@/components/book-button"

export const dynamic = "force-dynamic"

export default async function MoviePage({ params }: { params: Promise<{ id: string }> }) {
    const supabase = await createClient()
    const { id } = await params
    const { data: movie } = await supabase
        .from("movies")
        .select("*")
        .eq("id", id)
        .single()

    const { data: showtimes } = await supabase
        .from("showtimes")
        .select(`
            *,
            cinemas (*)
        `)
        .eq("movie_id", id)
        .order("show_time", { ascending: true })

    if (!movie) {
        return <div className="flex h-screen items-center justify-center text-white">Movie not found</div>
    }

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Backdrop Header */}
            <div className="relative h-[50vh] md:h-[60vh] w-full">
                <div className="absolute inset-0">
                    <Image
                        src={movie.backdrop_url || movie.poster_url}
                        alt={movie.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                    <div className="absolute inset-0 bg-black/20" />
                </div>

                <div className="absolute top-6 left-6 z-20">
                    <Button asChild variant="ghost" size="icon" className="rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md">
                        <Link href="/">
                            <ChevronLeft className="h-6 w-6" />
                        </Link>
                    </Button>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-10 flex flex-col md:flex-row gap-8 items-end">
                    {/* Poster (Hidden on mobile, visible on desktop) */}
                    <div className="hidden md:block relative h-64 w-44 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-background/20">
                        <Image
                            src={movie.poster_url}
                            alt={movie.title}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="flex-1 space-y-4">
                        <div className="flex flex-wrap gap-2">
                            <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-primary/20 backdrop-blur-md">
                                {movie.genre}
                            </Badge>
                            <Badge variant="outline" className="border-white/20 text-white bg-white/5 backdrop-blur-md">
                                {movie.language}
                            </Badge>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                            {movie.title}
                        </h1>

                        <div className="flex items-center gap-6 text-gray-300">
                            <div className="flex items-center gap-2">
                                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                                <span className="text-xl font-bold text-white">{movie.rating}</span>
                                <span className="text-sm text-gray-400">/ 10</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-5 w-5" />
                                <span>{movie.duration} min</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                <span>{new Date().getFullYear()}</span>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <BookButton movie={movie} showtime={showtimes?.[0]} />
                            <Button size="icon" variant="outline" className="h-14 w-14 rounded-xl border-white/20 bg-white/5 text-white hover:bg-white/10">
                                <Heart className="h-6 w-6" />
                            </Button>
                            <Button size="icon" variant="outline" className="h-14 w-14 rounded-xl border-white/20 bg-white/5 text-white hover:bg-white/10">
                                <Share2 className="h-6 w-6" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Tabs */}
            <div className="px-6 md:px-12 mt-8 max-w-5xl">
                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="bg-transparent border-b border-white/10 w-full justify-start h-auto p-0 gap-8 rounded-none">
                        <TabsTrigger
                            value="overview"
                            className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none text-lg text-muted-foreground data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-0 py-4 transition-all"
                        >
                            Overview
                        </TabsTrigger>
                        <TabsTrigger
                            value="cast"
                            className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none text-lg text-muted-foreground data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-0 py-4 transition-all"
                        >
                            Cast & Crew
                        </TabsTrigger>
                        <TabsTrigger
                            value="reviews"
                            className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none text-lg text-muted-foreground data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-0 py-4 transition-all"
                        >
                            Reviews
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="pt-8 space-y-8">
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-4">Storyline</h3>
                            <p className="text-gray-400 leading-relaxed text-lg">
                                {movie.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground mb-1">Director</h4>
                                <p className="text-white font-medium">Christopher Nolan</p>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground mb-1">Writers</h4>
                                <p className="text-white font-medium">Jonathan Nolan</p>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground mb-1">Stars</h4>
                                <p className="text-white font-medium">Matthew McConaughey</p>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="cast" className="pt-8">
                        <div className="text-gray-400">Cast information coming soon...</div>
                    </TabsContent>

                    <TabsContent value="reviews" className="pt-8">
                        <div className="text-gray-400">Reviews coming soon...</div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
