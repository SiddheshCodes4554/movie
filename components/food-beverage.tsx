"use client"

import { useState } from "react"
import { ArrowLeft, ChevronRight, Plus, Minus, Popcorn, Wine, UtensilsCrossed } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type Movie = {
  id: string
  title: string
}

type FoodBeverageProps = {
  movie: Movie
  seats: any[]
  onBack: () => void
  onContinue: (food: { popcorn: number; coke: number; nachos: number }) => void
}

const foodItems = [
  {
    id: "popcorn",
    name: "Caramel Popcorn",
    description: "Large bucket of freshly popped caramel popcorn",
    price: 350,
    icon: Popcorn,
  },
  {
    id: "coke",
    name: "Coca-Cola",
    description: "Large fountain drink with free refills",
    price: 200,
    icon: Wine,
  },
  {
    id: "nachos",
    name: "Loaded Nachos",
    description: "Tortilla chips with cheese, jalapeños, and salsa",
    price: 300,
    icon: UtensilsCrossed,
  },
]

export function FoodBeverage({ movie, seats, onBack, onContinue }: FoodBeverageProps) {
  const [quantities, setQuantities] = useState({ popcorn: 0, coke: 0, nachos: 0 })

  const updateQuantity = (item: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [item]: Math.max(0, prev[item as keyof typeof prev] + delta),
    }))
  }

  const calculateFoodTotal = () => {
    return quantities.popcorn * 350 + quantities.coke * 200 + quantities.nachos * 300
  }

  const seatTotal = seats.length * 300 // Simplified calculation (₹300 per seat average)

  const handleContinue = () => {
    onContinue(quantities)
  }

  return (
    <div className="min-h-screen bg-slate-950 pb-32">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back</span>
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Add Food & Beverages</h2>
        <p className="text-muted-foreground mb-6">Enhance your movie experience</p>

        <div className="grid gap-4 mb-6">
          {foodItems.map((item) => {
            const Icon = item.icon
            return (
              <Card key={item.id} className="p-4 bg-card border-border">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                    <p className="text-lg font-bold text-primary">₹{item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={quantities[item.id as keyof typeof quantities] === 0}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-semibold text-foreground">
                      {quantities[item.id as keyof typeof quantities]}
                    </span>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, 1)}
                      className="border-primary/50 hover:bg-primary/10"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Skip Option */}
        <div className="text-center mb-6">
          <button
            onClick={() => onContinue({ popcorn: 0, coke: 0, nachos: 0 })}
            className="text-muted-foreground hover:text-foreground transition-colors underline"
          >
            Skip and continue without food
          </button>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 z-50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="text-xs text-muted-foreground">
                Tickets: ₹{seatTotal} • Food: ₹{calculateFoodTotal()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">₹{seatTotal + calculateFoodTotal()}</p>
            </div>
          </div>
          <Button
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={handleContinue}
          >
            Continue to Payment
            <ChevronRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
