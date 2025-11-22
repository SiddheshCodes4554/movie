"use client"

import Link from "next/link"
import Image from "next/image"
import { Info } from "lucide-react"
import { useDraggableScroll } from "@/hooks/use-draggable-scroll"

interface TopRatedSectionProps {
    movies: any[]
}

export function TopRatedSection({ movies }: TopRatedSectionProps) {
    const { ref } = useDraggableScroll()

    return (
        <section>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Top Rated</h2>
                <Link href="#" className="text-sm text-primary hover:underline">See All</Link>
            </div>
            <div
                ref={ref}
                className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x cursor-grab active:cursor-grabbing"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {movies.map((movie, index) => (
                    <Link
                        href={`/movie/${movie.id}`}
                        key={movie.id}
                        className="relative flex-none w-[160px] md:w-[200px] snap-start group select-none"
                        draggable={false}
                    >
                        {/* Big Number */}
                        <span className="absolute -left-4 -bottom-4 text-[100px] font-black text-transparent stroke-text z-10 opacity-50 select-none pointer-events-none"
                            style={{ WebkitTextStroke: "2px rgba(255,255,255,0.2)" }}>
                            {index + 1}
                        </span>

                        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl bg-muted shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-primary/20 z-20">
                            <Image
                                src={movie.poster_url}
                                alt={movie.title}
                                fill
                                className="object-cover pointer-events-none"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <div className="h-12 w-12 rounded-full bg-primary/90 flex items-center justify-center">
                                    <Info className="h-6 w-6 text-white" />
                                </div>
                            </div>
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-white line-clamp-1 pl-2 group-hover:text-primary transition-colors">
                            {movie.title}
                        </h3>
                    </Link>
                ))}
            </div>
        </section>
    )
}
