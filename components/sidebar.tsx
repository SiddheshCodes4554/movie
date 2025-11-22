"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Compass, Clock, Ticket, User, LogOut, Film } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function Sidebar() {
    const pathname = usePathname()

    const links = [
        { href: "/", icon: Home, label: "Home" },
        { href: "/explore", icon: Compass, label: "Explore" },
        { href: "/coming-soon", icon: Clock, label: "Coming Soon" },
        { href: "/bookings", icon: Ticket, label: "My Tickets" },
        { href: "/profile", icon: User, label: "Profile" },
    ]

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-white/5 flex flex-col p-6 z-50 hidden md:flex">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-10 px-2">
                <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                    <Film className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold tracking-tight text-white">CinePass</span>
            </div>

            {/* Navigation */}
            <nav className="space-y-2 flex-1">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-4">
                    Menu
                </div>
                {links.map((link) => {
                    const Icon = link.icon
                    const isActive = pathname === link.href
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "sidebar-link",
                                isActive && "active"
                            )}
                        >
                            <Icon className={cn("h-5 w-5", isActive ? "text-white" : "text-muted-foreground")} />
                            <span>{link.label}</span>
                        </Link>
                    )
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="mt-auto pt-6 border-t border-white/5">
                <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-white hover:bg-white/5">
                    <LogOut className="h-5 w-5" />
                    <span>Log Out</span>
                </Button>
            </div>
        </aside>
    )
}
