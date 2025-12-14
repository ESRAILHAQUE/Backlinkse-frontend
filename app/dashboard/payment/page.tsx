"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, Plus, Trash2, Check } from "lucide-react"
import { getAllPaymentMethods, addPaymentMethod, setDefaultPaymentMethod, deletePaymentMethod, PaymentMethod } from "@/lib/payment"

export default function PaymentPage() {
  const [showAddCard, setShowAddCard] = useState(false)
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    type: "",
    last4: "",
    expiryMonth: "",
    expiryYear: "",
    isDefault: false,
  })

  useEffect(() => {
    fetchPaymentMethods()
  }, [])

  const fetchPaymentMethods = async () => {
    try {
      setLoading(true)
      const data = await getAllPaymentMethods()
      setPaymentMethods(data)
    } catch (error) {
      console.error("Failed to fetch payment methods:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addPaymentMethod({
        type: formData.type as any,
        last4: formData.last4,
        expiryMonth: parseInt(formData.expiryMonth),
        expiryYear: parseInt(formData.expiryYear),
        isDefault: formData.isDefault,
      })
      setFormData({ type: "", last4: "", expiryMonth: "", expiryYear: "", isDefault: false })
      setShowAddCard(false)
      await fetchPaymentMethods()
    } catch (error) {
      console.error("Failed to add payment method:", error)
      alert("Failed to add payment method")
    }
  }

  const handleSetDefault = async (id: string) => {
    try {
      await setDefaultPaymentMethod(id)
      await fetchPaymentMethods()
    } catch (error) {
      console.error("Failed to set default payment method:", error)
      alert("Failed to set default payment method")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this payment method?")) return
    try {
      await deletePaymentMethod(id)
      await fetchPaymentMethods()
    } catch (error) {
      console.error("Failed to delete payment method:", error)
      alert("Failed to delete payment method")
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Payment Methods</h1>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

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
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number (Last 4 digits)</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234"
                  maxLength={4}
                  value={formData.last4}
                  onChange={(e) => setFormData({ ...formData, last4: e.target.value.replace(/\D/g, "") })}
                  required
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="type">Card Type</Label>
                  <select
                    id="type"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    required
                  >
                    <option value="">Select type</option>
                    <option value="Visa">Visa</option>
                    <option value="Mastercard">Mastercard</option>
                    <option value="American Express">American Express</option>
                    <option value="Discover">Discover</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Month</Label>
                  <Input
                    id="expiry"
                    placeholder="12"
                    maxLength={2}
                    value={formData.expiryMonth}
                    onChange={(e) => setFormData({ ...formData, expiryMonth: e.target.value.replace(/\D/g, "") })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryYear">Expiry Year</Label>
                  <Input
                    id="expiryYear"
                    placeholder="2026"
                    maxLength={4}
                    value={formData.expiryYear}
                    onChange={(e) => setFormData({ ...formData, expiryYear: e.target.value.replace(/\D/g, "") })}
                    required
                  />
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
            {paymentMethods.length > 0 ? (
              paymentMethods.map((card) => (
                <div key={card._id} className="flex items-center justify-between p-4 rounded-lg border border-border">
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
                      <p className="text-sm text-muted-foreground">
                        Expires {card.expiryMonth}/{card.expiryYear}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!card.isDefault && (
                      <Button variant="outline" size="sm" onClick={() => handleSetDefault(card._id)}>
                        <Check className="h-4 w-4 mr-1" />
                        Set Default
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(card._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground">No payment methods found</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
