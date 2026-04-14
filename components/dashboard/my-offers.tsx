import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Offer } from '@/lib/types'
import { MapPin, Calendar, ExternalLink, Phone, Mail } from 'lucide-react'

interface MyOffersProps {
  offers: (Offer & { properties?: { id: string; title: string; city: string; images: string[] | null; profiles?: { full_name: string; phone: string; email: string } } })[]
}

export function MyOffers({ offers }: MyOffersProps) {
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

  if (offers.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-lg font-medium text-foreground">Non hai ancora fatto offerte</p>
          <p className="mt-2 text-muted-foreground">
            Esplora gli immobili disponibili e fai la tua prima offerta
          </p>
          <Button asChild className="mt-4">
            <Link href="/immobili">Cerca immobili</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {offers.map((offer) => (
        <Card key={offer.id}>
          <CardContent className="flex flex-col gap-4 p-4 sm:flex-row">
            <div className="relative h-32 w-full overflow-hidden rounded-lg sm:w-48">
              {offer.properties?.images && offer.properties.images.length > 0 ? (
                <Image
                  src={offer.properties.images[0]}
                  alt={offer.properties.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-muted">
                  <span className="text-xs text-muted-foreground">Nessuna immagine</span>
                </div>
              )}
            </div>

            <div className="flex flex-1 flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{offer.properties?.title}</h3>
                    <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{offer.properties?.city}</span>
                    </div>
                  </div>
                  <Badge variant={statusLabels[offer.status].variant}>
                    {statusLabels[offer.status].label}
                  </Badge>
                </div>
                <div className="mt-2 flex items-center gap-4">
                  <p className="text-xl font-bold text-primary">{formatPrice(offer.amount)}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(offer.created_at)}</span>
                  </div>
                </div>
              </div>

              {/* Show seller contact if offer accepted */}
              {offer.status === 'accepted' && offer.properties?.profiles && (
                <div className="mt-4 rounded-lg bg-primary/10 p-4">
                  <p className="mb-2 text-sm font-medium text-primary">Contatti del venditore:</p>
                  <div className="space-y-1 text-sm text-foreground">
                    <p className="font-medium">{offer.properties.profiles.full_name}</p>
                    {offer.properties.profiles.phone && (
                      <p className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {offer.properties.profiles.phone}
                      </p>
                    )}
                    {offer.properties.profiles.email && (
                      <p className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {offer.properties.profiles.email}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-4 flex justify-end">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/immobili/${offer.properties?.id}`}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Vedi immobile
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
