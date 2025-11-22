"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const genres = ["All", "Action", "Comedy", "Drama", "Sci-Fi", "Horror", "Romance", "Thriller"]
const languages = ["All", "English", "Hindi", "Tamil", "Telugu", "Malayalam"]

export function MovieFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentGenre = searchParams.get("genre") || "All"
  const currentLanguage = searchParams.get("language") || "All"

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === "All") {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    router.push(`/?${params.toString()}`)
  }

  return (
    <div className="mb-8 space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Genres</h3>
        <ScrollArea className="w-full whitespace-nowrap rounded-md border bg-background/50 p-1">
          <div className="flex w-max space-x-2 p-1">
            {genres.map((genre) => (
              <Button
                key={genre}
                variant={currentGenre === genre ? "default" : "ghost"}
                size="sm"
                className="rounded-full"
                onClick={() => updateFilter("genre", genre)}
              >
                {genre}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Languages</h3>
        <ScrollArea className="w-full whitespace-nowrap rounded-md border bg-background/50 p-1">
          <div className="flex w-max space-x-2 p-1">
            {languages.map((language) => (
              <Button
                key={language}
                variant={currentLanguage === language ? "default" : "ghost"}
                size="sm"
                className="rounded-full"
                onClick={() => updateFilter("language", language)}
              >
                {language}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  )
}
