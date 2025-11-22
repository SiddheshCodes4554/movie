import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const genre = searchParams.get("genre")
  const language = searchParams.get("language")

  const supabase = await createClient()

  let query = supabase.from("movies").select("*")

  if (genre && genre !== "all") {
    query = query.eq("genre", genre)
  }

  if (language && language !== "all") {
    query = query.eq("language", language)
  }

  const { data: movies, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(movies)
}
