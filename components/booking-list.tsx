"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Calendar, Clock, MapPin, Ticket, QrCode } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TicketConfirmation } from "@/components/ticket-confirmation"

interface BookingListProps {
    bookings: any[]
}

export function BookingList({ bookings }: BookingListProps) {
    const [selectedBooking, setSelectedBooking] = useState<any>(null)

    // Handle Escape key to close modal
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && selectedBooking) {
                setSelectedBooking(null)
            }
        }

        window.addEventListener('keydown', handleEscape)
        return () => window.removeEventListener('keydown', handleEscape)
    }, [selectedBooking])

    if (!bookings || bookings.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mb-6">
                    <Ticket className="h-10 w-10 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">No bookings yet</h2>
                <p className="text-muted-foreground mb-8">You haven't booked any movie tickets yet.</p>
                <Button asChild size="lg" className="rounded-xl bg-primary hover:bg-primary/90">
                    <a href="/">Browse Movies</a>
                </Button>
            </div>
        )
    }

    return (
        <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {bookings.map((booking) => {
                    const movie = booking.showtime?.movie
                    const showtime = booking.showtime
                    const cinema = booking.showtime?.cinema
                    const seats = booking.booking_seats?.map((bs: any) => `${bs.seat.row_label}${bs.seat.seat_number}`).join(", ")

                    // Construct booking data for TicketConfirmation
                    const bookingData = {
                        bookingId: booking.booking_reference,
                        theater: cinema?.name || "Cinema",
                        timestamp: showtime?.show_date,
                        showtime: showtime?.show_time,
                        seats: booking.booking_seats?.map((bs: any) => ({ id: `${bs.seat.row_label}${bs.seat.seat_number}` })) || [],
                        total: booking.total_amount,
                        qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${booking.booking_reference}&t=${Date.now()}`,
                    }

                    return (
                        <Card key={booking.id} className="bg-card border-white/10 overflow-hidden flex flex-col">
                            <div className="relative h-48 w-full">
                                <Image
                                    src={movie?.poster_url || "/placeholder.png"}
                                    alt={movie?.title || "Movie"}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4">
                                    <h3 className="text-xl font-bold text-white line-clamp-1">{movie?.title}</h3>
                                    <p className="text-sm text-gray-300">{movie?.genre}</p>
                                </div>
                            </div>

                            <CardContent className="flex-1 p-6 space-y-4">
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Calendar className="h-4 w-4" />
                                        <span>{new Date(showtime?.show_date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Clock className="h-4 w-4" />
                                        <span>{showtime?.show_time}</span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-2 text-sm text-gray-400">
                                    <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                                    <span>{cinema?.name}, {cinema?.location}</span>
                                </div>

                                <div className="pt-4 border-t border-white/10">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm text-muted-foreground">Seats</span>
                                        <span className="font-medium text-white">{seats}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">Booking ID</span>
                                        <span className="font-mono text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                                            {booking.booking_reference}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="p-6 pt-0">
                                <Button
                                    className="w-full gap-2"
                                    variant="outline"
                                    onClick={() => setSelectedBooking({ booking: bookingData, movie: movie })}
                                >
                                    <QrCode className="h-4 w-4" />
                                    View Ticket
                                </Button>
                            </CardFooter>
                        </Card>
                    )
                })}
            </div>

            {selectedBooking && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
                    onClick={() => setSelectedBooking(null)}
                >
                    <div className="relative w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                        <TicketConfirmation
                            booking={selectedBooking.booking}
                            movie={selectedBooking.movie}
                            onClose={() => setSelectedBooking(null)}
                        />
                    </div>
                </div>
            )}
        </>
    )
}
