"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Calendar, Clock, MapPin, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookingFlow } from "@/components/booking-flow"
import { format, addDays } from "date-fns"

interface MovieDetailsProps {
  movie: any
  onClose: () => void
}

export function MovieDetails({ movie, onClose }: MovieDetailsProps) {
  const [selectedDate, setSelectedDate] = useState(0)
  const [selectedShowtime, setSelectedShowtime] = useState<any>(null)
  const [showtimes, setShowtimes] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  // Generate next 4 days
  const dates = Array.from({ length: 4 }, (_, i) => {
    const date = addDays(new Date(), i)
    return {
      day: format(date, "EEE"),
      date: format(date, "d"),
      fullDate: format(date, "yyyy-MM-dd"),
      label: i === 0 ? "Today" : i === 1 ? "Tomorrow" : format(date, "EEE"),
    }
  })

  useEffect(() => {
    const fetchShowtimes = async () => {
      setLoading(true)
      try {
        const date = dates[selectedDate].fullDate
        const res = await fetch(`/api/showtimes?movieId=${movie.id}&date=${date}`)
        const data = await res.json()
        if (Array.isArray(data)) {
          setShowtimes(data)
        }
      } catch (error) {
        console.error("Failed to fetch showtimes", error)
      } finally {
        setLoading(false)
      }
    }

    fetchShowtimes()
  }, [movie.id, selectedDate])

  if (selectedShowtime) {
    return <BookingFlow movie={movie} showtime={selectedShowtime} onClose={() => setSelectedShowtime(null)} />
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 md:p-8">
      <div className="relative h-full w-full max-w-5xl overflow-hidden rounded-2xl bg-card shadow-2xl border">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-10 rounded-full bg-black/20 hover:bg-black/40 text-white"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>

        <div className="grid h-full md:grid-cols-[350px_1fr]">
          {/* Sidebar / Poster */}
          <div className="relative hidden md:block h-full">
            <Image src={movie.poster_url || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h2 className="text-3xl font-bold leading-tight">{movie.title}</h2>
              <div className="mt-2 flex items-center gap-2 text-sm">
                <Badge variant="secondary" className="bg-primary text-primary-foreground">
                  {movie.rating}
                </Badge>
                <span>{movie.duration} min</span>
                <span>•</span>
                <span>{movie.genre}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex h-full flex-col overflow-hidden">
            {/* Mobile Header */}
            <div className="md:hidden relative h-48 shrink-0">
              <Image
                src={movie.backdrop_url || movie.poster_url || "/placeholder.svg"}
                alt={movie.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h2 className="text-2xl font-bold">{movie.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {movie.genre} • {movie.duration} min
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Date Selection */}
                <div>
                  <h3 className="mb-3 text-sm font-medium text-muted-foreground">Select Date</h3>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {dates.map((date, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedDate(index)}
                        className={`flex min-w-[70px] flex-col items-center justify-center rounded-xl border p-3 transition-all ${
                          selectedDate === index
                            ? "bg-primary border-primary text-primary-foreground"
                            : "bg-card hover:border-primary/50"
                        }`}
                      >
                        <span className="text-xs font-medium uppercase">{date.label}</span>
                        <span className="text-lg font-bold">{date.date}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Showtimes */}
                <div>
                  <h3 className="mb-3 text-sm font-medium text-muted-foreground">Select Cinema & Time</h3>
                  {loading ? (
                    <div className="flex items-center justify-center py-10">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                    </div>
                  ) : showtimes.length > 0 ? (
                    <div className="space-y-4">
                      {/* Group by Cinema */}
                      {Object.values(
                        showtimes.reduce((acc: any, show: any) => {
                          const cinemaName = show.cinemas?.name || "Unknown Cinema"
                          if (!acc[cinemaName]) {
                            acc[cinemaName] = {
                              name: cinemaName,
                              location: show.cinemas?.location,
                              shows: [],
                            }
                          }
                          acc[cinemaName].shows.push(show)
                          return acc
                        }, {}),
                      ).map((cinema: any) => (
                        <div key={cinema.name} className="rounded-xl border bg-card/50 p-4">
                          <div className="mb-3 flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold">{cinema.name}</h4>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <MapPin className="mr-1 h-3 w-3" />
                                {cinema.location}
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-green-500">
                              <Clock className="h-3 w-3" />
                              <span>M-Ticket</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-3">
                            {cinema.shows.map((show: any) => (
                              <Button
                                key={show.id}
                                variant="outline"
                                size="sm"
                                className="h-auto flex-col gap-1 px-4 py-2 hover:border-primary hover:text-primary bg-transparent"
                                onClick={() => setSelectedShowtime(show)}
                              >
                                <span className="text-sm font-bold">{show.show_time.slice(0, 5)}</span>
                                <span className="text-[10px] text-muted-foreground uppercase">{show.format}</span>
                              </Button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center text-muted-foreground">
                      <Calendar className="mb-2 h-8 w-8 opacity-50" />
                      <p>No shows available for this date.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
