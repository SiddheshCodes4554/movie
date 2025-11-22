import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { BookingList } from "@/components/booking-list"

export const dynamic = "force-dynamic"

export default async function BookingsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: bookings } = await supabase
    .from("bookings")
    .select(`
      *,
      showtime:showtimes (
        show_date,
        show_time,
        movie:movies (
          title,
          poster_url,
          duration,
          genre
        ),
        cinema:cinemas (
          name,
          location
        )
      ),
      booking_seats (
        seat:seats (
          row_label,
          seat_number
        )
      )
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-6 pt-24">
        <h1 className="text-3xl font-bold text-white mb-8">My Bookings</h1>
        <BookingList bookings={bookings || []} />
      </div>
    </div>
  )
}
