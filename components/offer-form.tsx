'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { createClient } from '@/lib/supabase/client'
import type { Offer } from '@/lib/types'
import { Shield, Send, CheckCircle, AlertCircle } from 'lucide-react'

interface OfferFormProps {
  propertyId: string
  askingPrice: number
  existingOffer: Offer | null
  isLoggedIn: boolean
}

export function OfferForm({ propertyId, askingPrice, existingOffer, isLoggedIn }: OfferFormProps) {
  const router = useRouter()
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      router.push(`/auth/login?redirect=/immobili/${propertyId}`)
      return
    }

    const offerAmount = parseFloat(amount)
    if (isNaN(offerAmount) || offerAmount <= 0) {
      setError('Inserisci un importo valido')
      setLoading(false)
      return
    }

    const { error: insertError } = await supabase
      .from('offers')
      .insert({
        property_id: propertyId,
        buyer_id: user.id,
        amount: offerAmount,
        message: message || null,
      })

    if (insertError) {
      setError('Errore nell\'invio dell\'offerta. Riprova.')
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  if (!isLoggedIn) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Fai un&apos;offerta
          </CardTitle>
          <CardDescription>
            Accedi per fare un&apos;offerta anonima su questo immobile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href={`/auth/login?redirect=/immobili/${propertyId}`}>
                Accedi per fare un&apos;offerta
              </Link>
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Non hai un account?{' '}
              <Link href="/auth/registrati" className="text-primary hover:underline">
                Registrati
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (existingOffer) {
    const statusMessages: Record<string, { icon: React.ReactNode; title: string; description: string }> = {
      pending: {
        icon: <AlertCircle className="h-5 w-5 text-amber-500" />,
        title: 'Offerta in attesa',
        description: `Hai già fatto un'offerta di ${formatPrice(existingOffer.amount)}. Il venditore sta valutando.`,
      },
      accepted: {
        icon: <CheckCircle className="h-5 w-5 text-primary" />,
        title: 'Offerta accettata!',
        description: 'Congratulazioni! La tua offerta è stata accettata. Vai alla dashboard per vedere i contatti del venditore.',
      },
    }

    const status = statusMessages[existingOffer.status]

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {status.icon}
            {status.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{status.description}</p>
          {existingOffer.status === 'accepted' && (
            <Button asChild className="mt-4 w-full">
              <Link href="/dashboard">Vai alla Dashboard</Link>
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }

  if (success) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <CheckCircle className="h-5 w-5" />
            Offerta inviata!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            La tua offerta è stata inviata al venditore in modo anonimo. 
            Riceverai una notifica quando verrà accettata o rifiutata.
          </p>
          <Button asChild className="mt-4 w-full" variant="outline">
            <Link href="/dashboard">Vai alla Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Fai un&apos;offerta
        </CardTitle>
        <CardDescription>
          La tua offerta sarà anonima fino all&apos;accettazione
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Prezzo richiesto
            </label>
            <p className="text-2xl font-bold text-foreground">{formatPrice(askingPrice)}</p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              La tua offerta (€)
            </label>
            <Input
              type="number"
              placeholder="Es. 250000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Messaggio (opzionale)
            </label>
            <Textarea
              placeholder="Aggiungi un messaggio per il venditore..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            <Send className="mr-2 h-4 w-4" />
            {loading ? 'Invio in corso...' : 'Invia offerta'}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            L&apos;offerta è vincolante. I tuoi dati di contatto verranno condivisi solo dopo l&apos;accettazione.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
