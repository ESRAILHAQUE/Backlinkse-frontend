"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, Plus, Trash2, Check } from "lucide-react"

const savedCards = [
  { id: 1, type: "Visa", last4: "4242", expiry: "12/26", isDefault: true },
  { id: 2, type: "Mastercard", last4: "8888", expiry: "09/25", isDefault: false },
]

export default function PaymentPage() {
  const [showAddCard, setShowAddCard] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Payment Methods</h1>
          <p className="text-muted-foreground">Manage your payment methods and billing.</p>
        </div>
        <Button onClick={() => setShowAddCard(!showAddCard)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Card
        </Button>
      </div>

      {showAddCard && (
        <Card>
          <CardHeader>
            <CardTitle>Add Payment Method</CardTitle>
            <CardDescription>Add a new credit or debit card.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" placeholder="12345" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit">Save Card</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddCard(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Saved Cards</CardTitle>
          <CardDescription>Your saved payment methods</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {savedCards.map((card) => (
              <div key={card.id} className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {card.type} •••• {card.last4}
                      {card.isDefault && (
                        <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          Default
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">Expires {card.expiry}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!card.isDefault && (
                    <Button variant="outline" size="sm">
                      <Check className="h-4 w-4 mr-1" />
                      Set Default
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing Address</CardTitle>
          <CardDescription>Your billing information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Company Name</Label>
              <Input defaultValue="Acme Inc." />
            </div>
            <div className="space-y-2">
              <Label>Country</Label>
              <Input defaultValue="United States" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Address</Label>
              <Input defaultValue="123 Business Ave, Suite 100" />
            </div>
            <div className="space-y-2">
              <Label>City</Label>
              <Input defaultValue="San Francisco" />
            </div>
            <div className="space-y-2">
              <Label>ZIP Code</Label>
              <Input defaultValue="94102" />
            </div>
          </div>
          <Button className="mt-4">Update Billing Info</Button>
        </CardContent>
      </Card>
    </div>
  )
}
