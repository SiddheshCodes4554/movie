"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Film, Ticket, User, Search, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export function SiteHeader() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)

    const supabase = createClient()
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolled ? "bg-black/80 backdrop-blur-xl border-white/5 py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30 transition-transform group-hover:scale-110">
            <Film className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">CinePass</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/" ? "text-white" : "text-muted-foreground"
            )}
          >
            Movies
          </Link>
          <Link
            href="/bookings"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/bookings" ? "text-white" : "text-muted-foreground"
            )}
          >
            My Bookings
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search movies..."
              className="h-9 w-64 rounded-full bg-secondary/50 border-transparent pl-9 pr-4 text-sm focus:bg-secondary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              defaultValue={typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('q') || '' : ''}
              onChange={(e) => {
                const params = new URLSearchParams(window.location.search)
                if (e.target.value) {
                  params.set('q', e.target.value)
                } else {
                  params.delete('q')
                }
                window.history.replaceState(null, '', `/?${params.toString()}`)
                // Force router refresh to trigger server component update if needed, 
                // but for client-side filtering in Home we might need a different approach.
                // For now, let's just update URL and let page handle it.
                // Actually, to trigger a re-render of a server component based on searchParams, we need router.push or replace.
                // Let's use a simpler approach:
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const target = e.target as HTMLInputElement;
                  window.location.href = `/?q=${encodeURIComponent(target.value)}`
                }
              }}
            />
          </div>
          {/* Mobile Search Icon */}
          <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground hover:text-white">
            <Search className="h-5 w-5" />
          </Button>

          {user ? (
            <div className="relative group">
              <Link href="/profile">
                <div className="h-9 w-9 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center text-primary font-bold cursor-pointer hover:bg-primary/30 transition-colors">
                  {user.email?.[0].toUpperCase()}
                </div>
              </Link>

              {/* Dropdown menu on hover */}
              <div className="absolute right-0 mt-2 w-48 bg-card border border-white/10 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-white/5 transition-colors"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                  <form action="/auth/signout" method="post">
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-white/5 transition-colors w-full text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" className="text-white hover:text-primary hover:bg-white/10">
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button asChild className="rounded-full bg-white text-black hover:bg-gray-200 font-semibold px-6">
                <Link href="/auth/sign-up">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
