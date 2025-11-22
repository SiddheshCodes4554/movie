"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BookingFlow } from "@/components/booking-flow"

interface BookButtonProps {
    movie: any
    showtime: any
}

export function BookButton({ movie, showtime }: BookButtonProps) {
    const [showBooking, setShowBooking] = useState(false)

    if (!showtime) {
        return (
            <Button size="lg" disabled className="rounded-xl bg-muted text-muted-foreground font-bold px-8 h-14 text-lg">
                No Shows Available
            </Button>
        )
    }

    return (
        <>
            <Button
                size="lg"
                className="rounded-xl bg-primary hover:bg-primary/90 text-white font-bold px-8 h-14 text-lg shadow-lg shadow-primary/25"
                onClick={() => setShowBooking(true)}
            >
                Book Ticket
            </Button>

            {showBooking && (
                <BookingFlow
                    movie={movie}
                    showtime={showtime}
                    onClose={() => setShowBooking(false)}
                />
            )}
        </>
    )
}
