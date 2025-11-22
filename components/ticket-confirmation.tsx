"use client"

import { useEffect, useState } from "react"
import { CheckCircle2, Download, Share2, ArrowLeft, Calendar, Clock, MapPin, Ticket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

type TicketConfirmationProps = {
  booking: any
  movie: any
  onClose: () => void
}

export function TicketConfirmation({ booking, movie, onClose }: TicketConfirmationProps) {
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    // Hide confetti after 3 seconds
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleDownload = () => {
    // Mock download
    const link = document.createElement("a")
    link.href = "#"
    link.download = `ticket-${booking.bookingId}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    alert("Ticket downloaded successfully!")
  }

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: ["#F84464", "#FFD700", "#FF6B9D", "#FFA500"][Math.floor(Math.random() * 4)],
                }}
              />
            </div>
          ))}
        </div>
      )}

      <div className="w-full max-w-md space-y-8">
        {/* Success Message */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4 animate-in zoom-in duration-500">
            <CheckCircle2 className="h-8 w-8 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-white">Booking Confirmed!</h1>
          <p className="text-slate-400">Your tickets have been sent to your email</p>
        </div>

        {/* Ticket Card */}
        <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-10 duration-700">
          {/* Top Section - Movie Info */}
          <div className="relative h-48">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
            <img src={movie.poster_url || "/placeholder.svg"} alt={movie.title} className="w-full h-full object-cover" />
            <div className="absolute bottom-4 left-4 right-4 z-20 text-white">
              <h2 className="text-2xl font-bold leading-tight mb-1">{movie.title}</h2>
              <p className="text-sm text-white/80">{booking.theater}</p>
            </div>
          </div>

          {/* Middle Section - Details */}
          <div className="p-6 space-y-6 bg-white">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center text-slate-400 text-xs uppercase tracking-wider font-medium">
                  <Calendar className="w-3 h-3 mr-1" /> Date
                </div>
                <p className="text-slate-900 font-semibold">
                  {new Date(booking.timestamp).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-slate-400 text-xs uppercase tracking-wider font-medium">
                  <Clock className="w-3 h-3 mr-1" /> Time
                </div>
                <p className="text-slate-900 font-semibold">{booking.showtime}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-slate-400 text-xs uppercase tracking-wider font-medium">
                  <Ticket className="w-3 h-3 mr-1" /> Seats
                </div>
                <p className="text-slate-900 font-semibold">{booking.seats.map((s: any) => s.id).join(", ")}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-slate-400 text-xs uppercase tracking-wider font-medium">
                  <MapPin className="w-3 h-3 mr-1" /> Screen
                </div>
                <p className="text-slate-900 font-semibold">Audi 1</p>
              </div>
            </div>

            <Separator className="bg-slate-100" />

            {/* QR Code Section */}
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="bg-white p-2 rounded-xl border-2 border-slate-100 shadow-sm">
                <img src={booking.qrCode || "/placeholder.svg"} alt="Booking QR Code" className="w-40 h-40 rounded-lg" />
              </div>
              <p className="text-xs text-slate-400 font-mono">{booking.bookingId}</p>
            </div>
          </div>

          {/* Bottom Section - Total */}
          <div className="bg-slate-50 p-6 flex items-center justify-between border-t border-slate-100">
            <span className="text-slate-500 font-medium">Total Amount</span>
            <span className="text-xl font-bold text-slate-900">₹{booking.total}</span>
          </div>

          {/* Ticket Cutouts */}
          <div className="absolute top-[12rem] -left-3 w-6 h-6 bg-slate-950 rounded-full" />
          <div className="absolute top-[12rem] -right-3 w-6 h-6 bg-slate-950 rounded-full" />
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
            onClick={onClose}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
          }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
      `}</style>
    </div>
  )
}
