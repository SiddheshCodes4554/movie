"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SeatSelection } from "@/components/seat-selection"
import { FoodBeverage } from "@/components/food-beverage"
import { Payment } from "@/components/payment"
import { TicketConfirmation } from "@/components/ticket-confirmation"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

interface BookingFlowProps {
  movie: any
  showtime: any
  onClose: () => void
}

export function BookingFlow({ movie, showtime, onClose }: BookingFlowProps) {
  const [step, setStep] = useState(1)
  const [selectedSeats, setSelectedSeats] = useState<any[]>([])
  const [selectedFood, setSelectedFood] = useState<any[]>([])
  const [bookingData, setBookingData] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const { toast } = useToast()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  const totalAmount =
    selectedSeats.reduce((acc, seat) => acc + seat.price, 0) +
    selectedFood.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const handleSeatConfirm = (seats: any[]) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to book tickets.",
        variant: "destructive",
      })
      router.push("/auth/login")
      return
    }
    setSelectedSeats(seats)
    setStep(2)
  }

  const handleFoodConfirm = (food: any) => {
    // Convert object to array for consistency if needed, or just store as is
    // The previous code expected an array, but FoodBeverage returns { popcorn: 2, ... }
    // Let's transform it to an array of items for the booking summary
    const foodArray = Object.entries(food)
      .filter(([_, quantity]) => (quantity as number) > 0)
      .map(([id, quantity]) => {
        const item = {
          id,
          name: id.charAt(0).toUpperCase() + id.slice(1), // Simple name generation
          price: id === 'popcorn' ? 350 : id === 'coke' ? 200 : 300,
          quantity: quantity as number
        }
        return item
      })

    setSelectedFood(foodArray)
    setStep(3)
  }

  const handlePaymentComplete = (details: any) => {
    setBookingData({
      bookingId: details.reference, // Use reference for display as it's more user-friendly than UUID
      theater: showtime.cinemas?.name || "Cinema",
      timestamp: showtime.show_date,
      showtime: showtime.show_time,
      seats: selectedSeats,
      total: totalAmount,
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${details.reference}&t=${Date.now()}`,
    })
    setStep(4)
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      {/* Header */}
      {step < 4 && (
        <header className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={step === 1 ? onClose : () => setStep(step - 1)}>
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <div>
              <h2 className="text-lg font-semibold">{movie.title}</h2>
              <p className="text-sm text-muted-foreground">
                {showtime.cinemas?.name} • {showtime.show_time}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Total Amount</p>
            <p className="text-lg font-bold text-primary">₹{totalAmount}</p>
          </div>
        </header>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-muted/10">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="seats"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full"
            >
              <SeatSelection showtime={showtime} onConfirm={handleSeatConfirm} initialSeats={selectedSeats} />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="food"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full"
            >
              <FoodBeverage
                movie={movie}
                seats={selectedSeats}
                onBack={() => setStep(1)}
                onContinue={handleFoodConfirm}
              />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full"
            >
              <Payment
                amount={totalAmount}
                onComplete={handlePaymentComplete}
                bookingDetails={{
                  showtimeId: showtime.id,
                  seats: selectedSeats,
                  food: selectedFood,
                }}
              />
            </motion.div>
          )}

          {step === 4 && bookingData && (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full"
            >
              <TicketConfirmation booking={bookingData} movie={movie} onClose={onClose} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
