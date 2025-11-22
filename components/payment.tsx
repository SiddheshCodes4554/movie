"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Icons } from "@/components/icons"
import { useToast } from "@/components/ui/use-toast"

interface PaymentProps {
  amount: number
  onComplete: (details: any) => void
  bookingDetails: any
}

export function Payment({ amount, onComplete, bookingDetails }: PaymentProps) {
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const { toast } = useToast()

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Payment submitted", { amount, bookingDetails, paymentMethod })
    setLoading(true)

    try {
      console.log("Sending API request...")
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          showtimeId: bookingDetails.showtimeId,
          seats: bookingDetails.seats,
          totalAmount: amount,
        }),
      })

      const data = await res.json()
      console.log("API Response:", data)

      if (!res.ok) {
        throw new Error(data.error || "Booking failed")
      }

      // Simulate payment processing delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("Payment complete, calling onComplete")
      onComplete({
        bookingId: data.bookingId,
        reference: data.reference,
      })
    } catch (error: any) {
      console.error("Payment error:", error)
      toast({
        title: "Payment Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="mb-6 text-lg font-semibold">Payment Details</h3>

        <form id="payment-form" onSubmit={handlePayment} className="space-y-6">
          <RadioGroup defaultValue="card" onValueChange={(value) => setPaymentMethod(value)}>
            <div className="flex items-center space-x-2 rounded-lg border p-4">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex-1 cursor-pointer">
                Credit/Debit Card
              </Label>
            </div>
            <div className="flex items-center space-x-2 rounded-lg border p-4">
              <RadioGroupItem value="upi" id="upi" />
              <Label htmlFor="upi" className="flex-1 cursor-pointer">
                UPI
              </Label>
            </div>
          </RadioGroup>

          {paymentMethod === "card" && (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Cardholder Name</Label>
                <Input id="name" placeholder="John Doe" defaultValue="John Doe" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="number">Card Number</Label>
                <Input id="number" placeholder="0000 0000 0000 0000" defaultValue="4242 4242 4242 4242" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" defaultValue="12/25" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" defaultValue="123" />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === "upi" && (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="upi-id">UPI ID</Label>
                <Input id="upi-id" placeholder="username@upi" defaultValue="user@upi" />
              </div>
              <p className="text-xs text-muted-foreground">
                A payment request will be sent to your UPI app.
              </p>
            </div>
          )}
        </form>
      </div>

      <div className="border-t bg-background p-4">
        <Button type="submit" form="payment-form" className="w-full" size="lg" disabled={loading}>
          {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Pay ₹{amount}
        </Button>
      </div>
    </div>
  )
}
