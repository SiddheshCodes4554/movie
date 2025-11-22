import { createClient } from "@/lib/supabase/server"
import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const supabase = await createClient()

  // Check if user is logged in
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // Create admin client to bypass RLS
    const adminSupabase = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    )

    const body = await request.json()
    const { showtimeId, seats, totalAmount } = body

    // 1. Create Booking
    const bookingRef = `BK-${Date.now()}-${Math.floor(Math.random() * 1000)}`

    const { data: booking, error: bookingError } = await adminSupabase
      .from("bookings")
      .insert({
        user_id: user.id,
        showtime_id: showtimeId,
        booking_reference: bookingRef,
        total_amount: totalAmount,
        payment_status: "paid",
        booking_status: "confirmed",
      })
      .select()
      .single()

    if (bookingError) throw bookingError

    // 2. Create Seats and Link to Booking
    for (const seat of seats) {
      // Insert seat into 'seats' table (marking as booked)
      const { data: newSeat, error: seatError } = await adminSupabase
        .from("seats")
        .insert({
          showtime_id: showtimeId,
          seat_number: seat.id,
          row_label: seat.row,
          seat_type: seat.type,
          price: seat.price,
          is_available: false, // Booked
        })
        .select()
        .single()

      if (seatError) throw seatError

      // Link to booking
      const { error: linkError } = await adminSupabase.from("booking_seats").insert({
        booking_id: booking.id,
        seat_id: newSeat.id,
      })

      if (linkError) throw linkError
    }

    return NextResponse.json({
      success: true,
      bookingId: booking.id,
      reference: bookingRef,
    })
  } catch (error: any) {
    console.error("Booking error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
