'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { createClient } from '@/lib/supabase/client'
import type { Offer, Profile, Property } from '@/lib/types'
import { Calendar, Check, X, ExternalLink, Phone, Mail, User } from 'lucide-react'

interface ReceivedOffersProps {
  offers: (Offer & { properties?: Property; profiles?: Profile })[]
}

export function ReceivedOffers({ offers }: ReceivedOffersProps) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState('')

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  const statusLabels: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
    pending: { label: 'In attesa', variant: 'secondary' },
    accepted: { label: 'Accettata', variant: 'default' },
    rejected: { label: 'Rifiutata', variant: 'destructive' },
    withdrawn: { label: 'Ritirata', variant: 'outline' },
  }

  const handleOfferAction = async (offerId: string, action: 'accepted' | 'rejected') => {
    setLoading(offerId)
    setError('')

    const supabase = createClient()
    const { error } = await supabase
      .from('offers')
      .update({ status: action })
      .eq('id', offerId)

    if (error) {
      setError('Errore nell\'aggiornamento dell\'offerta')
      setLoading(null)
      return
    }

    router.refresh()
    setLoading(null)
  }

  if (offers.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-lg font-medium text-foreground">Non hai ricevuto offerte</p>
          <p className="mt-2 text-muted-foreground">
            Pubblica un annuncio per iniziare a ricevere offerte dagli acquirenti
          </p>
          <Button asChild className="mt-4">
            <Link href="/immobili/nuovo">Pubblica annuncio</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {offers.map((offer) => (
        <Card key={offer.id}>
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Offerta per: <Link href={`/immobili/${offer.properties?.id}`} className="font-medium text-primary hover:underline">{offer.properties?.title}</Link>
                    </p>
                    <p className="mt-2 text-2xl font-bold text-foreground">{formatPrice(offer.amount)}</p>
                    <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(offer.created_at)}</span>
                    </div>
                  </div>
                  <Badge variant={statusLabels[offer.status].variant}>
                    {statusLabels[offer.status].label}
                  </Badge>
                </div>

                {offer.message && (
                  <p className="mt-3 rounded-lg bg-muted p-3 text-sm text-muted-foreground">
                    &ldquo;{offer.message}&rdquo;
                  </p>
                )}

                {/* Show buyer contact only if offer is accepted */}
                {offer.status === 'accepted' && offer.profiles && (
                  <div className="mt-4 rounded-lg bg-primary/10 p-4">
                    <p className="mb-2 text-sm font-medium text-primary">Contatti dell&apos;acquirente:</p>
                    <div className="space-y-1 text-sm text-foreground">
                      <p className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {offer.profiles.full_name || 'Nome non disponibile'}
                      </p>
                      {offer.profiles.phone && (
                        <p className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          {offer.profiles.phone}
                        </p>
                      )}
                      {offer.profiles.email && (
                        <p className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {offer.profiles.email}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Show anonymous message for pending offers */}
                {offer.status === 'pending' && (
                  <p className="mt-3 text-sm text-muted-foreground">
                    L&apos;identità dell&apos;acquirente sarà rivelata solo dopo l&apos;accettazione dell&apos;offerta.
                  </p>
                )}
              </div>

              {/* Action buttons for pending offers */}
              {offer.status === 'pending' && (
                <div className="flex gap-2 sm:flex-col">
                  <Button
                    onClick={() => handleOfferAction(offer.id, 'accepted')}
                    disabled={loading === offer.id}
                    className="flex-1 sm:flex-none"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Accetta
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleOfferAction(offer.id, 'rejected')}
                    disabled={loading === offer.id}
                    className="flex-1 sm:flex-none"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Rifiuta
                  </Button>
                </div>
              )}

              {/* View property button for non-pending offers */}
              {offer.status !== 'pending' && (
                <Button asChild variant="outline" size="sm">
                  <Link href={`/immobili/${offer.properties?.id}`}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Vedi immobile
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
