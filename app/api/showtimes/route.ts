import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const movieId = searchParams.get("movieId")
  const date = searchParams.get("date")
  const cinemaId = searchParams.get("cinemaId")

  if (!movieId) {
    return NextResponse.json({ error: "Movie ID is required" }, { status: 400 })
  }

  const supabase = await createClient()

  let query = supabase
    .from("showtimes")
    .select(`
      *,
      cinemas (
        id,
        name,
        location
      )
    `)
    .eq("movie_id", movieId)

  if (date) {
    query = query.eq("show_date", date)
  }

  if (cinemaId) {
    query = query.eq("cinema_id", cinemaId)
  }

  // Order by time
  query = query.order("show_time", { ascending: true })

  const { data: showtimes, error } = await query

  if (error) {
    console.error('Showtimes API Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!showtimes) {
    return NextResponse.json([])
  }

  return NextResponse.json(showtimes)
}
