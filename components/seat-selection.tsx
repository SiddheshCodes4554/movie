"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { createBrowserClient } from "@supabase/ssr"

interface SeatSelectionProps {
  showtime: any
  onConfirm: (seats: any[]) => void
  initialSeats?: any[]
}

export function SeatSelection({ showtime, onConfirm, initialSeats = [] }: SeatSelectionProps) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>(initialSeats.map((s) => s.id))
  const [bookedSeats, setBookedSeats] = useState<string[]>([])

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    const fetchBookedSeats = async () => {
      const { data } = await supabase
        .from("seats")
        .select("seat_number")
        .eq("showtime_id", showtime.id)
        .eq("is_available", false)

      if (data && data.length > 0) {
        setBookedSeats(data.map((s) => s.seat_number))
      } else {
        // Mock some booked seats for demonstration
        setBookedSeats(["E5", "E6", "F5", "F6", "G5", "G6"])
      }
    }

    fetchBookedSeats()
  }, [showtime.id])

  const toggleSeat = (seatId: string) => {
    if (bookedSeats.includes(seatId)) return

    setSelectedSeats((prev) => (prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]))
  }

  const handleConfirm = () => {
    const seats = selectedSeats.map((id) => {
      const row = id.charAt(0)
      let price = 200
      let type = "Normal"

      if (row >= "I") {
        price = 600
        type = "Recliner"
      } else if (row >= "F") {
        price = 350
        type = "Premium"
      }

      return {
        id,
        row,
        number: id.substring(1),
        type,
        price,
      }
    })
    onConfirm(seats)
  }

  // Generate seat layout
  const rows = [
    { label: "J", type: "Recliner", price: 600, count: 8 },
    { label: "I", type: "Recliner", price: 600, count: 8 },
    { label: "H", type: "Premium", price: 350, count: 12 },
    { label: "G", type: "Premium", price: 350, count: 12 },
    { label: "F", type: "Premium", price: 350, count: 12 },
    { label: "E", type: "Normal", price: 200, count: 14 },
    { label: "D", type: "Normal", price: 200, count: 14 },
    { label: "C", type: "Normal", price: 200, count: 14 },
    { label: "B", type: "Normal", price: 200, count: 14 },
    { label: "A", type: "Normal", price: 200, count: 14 },
  ]

  const calculateTotal = () => {
    return selectedSeats.reduce((total, id) => {
      const row = id.charAt(0)
      let price = 200
      if (row >= "I") price = 600
      else if (row >= "F") price = 350
      return total + price
    }, 0)
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto p-4 pb-32">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-8 h-1 w-3/4 rounded-full bg-primary/50 shadow-[0_0_30px_rgba(248,68,100,0.5)]" />
          <p className="text-xs text-muted-foreground">SCREEN THIS WAY</p>
        </div>

        <div className="flex flex-col items-center gap-6">
          {/* Recliners */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground text-center mb-2">Recliner (₹600)</p>
            {rows.filter(r => r.type === "Recliner").map((row) => (
              <div key={row.label} className="flex items-center gap-2 justify-center">
                <span className="w-6 text-center text-xs font-medium text-muted-foreground">{row.label}</span>
                <div className="flex gap-4">
                  {Array.from({ length: row.count }).map((_, i) => {
                    const seatId = `${row.label}${i + 1}`
                    const isSelected = selectedSeats.includes(seatId)
                    const isBooked = bookedSeats.includes(seatId)

                    return (
                      <button
                        key={seatId}
                        disabled={isBooked}
                        onClick={() => toggleSeat(seatId)}
                        className={`h-10 w-12 rounded-lg text-xs font-medium transition-all ${isBooked
                          ? "bg-muted cursor-not-allowed text-muted-foreground/50"
                          : isSelected
                            ? "bg-primary text-primary-foreground shadow-[0_0_10px_rgba(248,68,100,0.5)]"
                            : "bg-card border hover:border-primary hover:bg-primary/10"
                          }`}
                      >
                        {i + 1}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Premium */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground text-center mb-2">Premium (₹350)</p>
            {rows.filter(r => r.type === "Premium").map((row) => (
              <div key={row.label} className="flex items-center gap-2 justify-center">
                <span className="w-6 text-center text-xs font-medium text-muted-foreground">{row.label}</span>
                <div className="flex gap-2">
                  {Array.from({ length: row.count }).map((_, i) => {
                    const seatId = `${row.label}${i + 1}`
                    const isSelected = selectedSeats.includes(seatId)
                    const isBooked = bookedSeats.includes(seatId)

                    return (
                      <button
                        key={seatId}
                        disabled={isBooked}
                        onClick={() => toggleSeat(seatId)}
                        className={`h-8 w-8 rounded-t-lg text-[10px] font-medium transition-all ${isBooked
                          ? "bg-muted cursor-not-allowed text-muted-foreground/50"
                          : isSelected
                            ? "bg-primary text-primary-foreground shadow-[0_0_10px_rgba(248,68,100,0.5)]"
                            : "bg-card border hover:border-primary hover:bg-primary/10"
                          }`}
                      >
                        {i + 1}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Normal */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground text-center mb-2">Normal (₹200)</p>
            {rows.filter(r => r.type === "Normal").map((row) => (
              <div key={row.label} className="flex items-center gap-2 justify-center">
                <span className="w-6 text-center text-xs font-medium text-muted-foreground">{row.label}</span>
                <div className="flex gap-1">
                  {Array.from({ length: row.count }).map((_, i) => {
                    const seatId = `${row.label}${i + 1}`
                    const isSelected = selectedSeats.includes(seatId)
                    const isBooked = bookedSeats.includes(seatId)

                    return (
                      <button
                        key={seatId}
                        disabled={isBooked}
                        onClick={() => toggleSeat(seatId)}
                        className={`h-7 w-7 rounded-t-md text-[10px] font-medium transition-all ${isBooked
                          ? "bg-muted cursor-not-allowed text-muted-foreground/50"
                          : isSelected
                            ? "bg-primary text-primary-foreground shadow-[0_0_10px_rgba(248,68,100,0.5)]"
                            : "bg-card border hover:border-primary hover:bg-primary/10"
                          }`}
                      >
                        {i + 1}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t bg-background p-4 shadow-lg">
        <div className="mb-4 flex justify-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded border bg-card" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-primary" />
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-muted" />
            <span>Booked</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Selected Seats</p>
            <p className="font-bold">{selectedSeats.join(", ") || "None"}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total Price</p>
            <p className="text-xl font-bold text-primary">₹{calculateTotal()}</p>
          </div>
        </div>

        <Button className="w-full" size="lg" disabled={selectedSeats.length === 0} onClick={handleConfirm}>
          Confirm {selectedSeats.length} Seats
        </Button>
      </div>
    </div>
  )
}
