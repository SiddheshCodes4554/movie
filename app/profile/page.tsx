import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { User, Mail, Calendar, LogOut } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export const dynamic = "force-dynamic"

export default async function ProfilePage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect("/login")
    }

    // Get user's bookings count
    const { count: bookingsCount } = await supabase
        .from("bookings")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)

    return (
        <div className="min-h-screen bg-background pb-20">
            <div className="container mx-auto px-6 pt-24">
                <h1 className="text-3xl font-bold text-white mb-8">My Profile</h1>

                <div className="max-w-2xl">
                    <Card className="bg-card border-white/10">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                                    <User className="h-8 w-8 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">
                                        {user.user_metadata?.full_name || user.email?.split("@")[0] || "User"}
                                    </h2>
                                    <p className="text-sm text-muted-foreground">Member</p>
                                </div>
                            </CardTitle>
                        </CardHeader>

                        <Separator className="bg-white/10" />

                        <CardContent className="pt-6 space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-gray-300">
                                    <Mail className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Email</p>
                                        <p className="font-medium">{user.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 text-gray-300">
                                    <Calendar className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Member Since</p>
                                        <p className="font-medium">
                                            {new Date(user.created_at).toLocaleDateString("en-US", {
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 text-gray-300">
                                    <User className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Total Bookings</p>
                                        <p className="font-medium">{bookingsCount || 0}</p>
                                    </div>
                                </div>
                            </div>

                            <Separator className="bg-white/10" />

                            <div className="space-y-3">
                                <h3 className="font-semibold text-white">Quick Actions</h3>
                                <div className="grid gap-3">
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="w-full justify-start border-white/10 hover:bg-white/5"
                                    >
                                        <a href="/bookings">View My Bookings</a>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
