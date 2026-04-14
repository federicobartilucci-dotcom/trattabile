import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Property } from '@/lib/types'
import { MapPin, Eye, Edit, ExternalLink } from 'lucide-react'

interface MyPropertiesProps {
  properties: Property[]
}

export function MyProperties({ properties }: MyPropertiesProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const statusLabels: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
    active: { label: 'Attivo', variant: 'default' },
    pending: { label: 'In attesa', variant: 'secondary' },
    sold: { label: 'Venduto', variant: 'outline' },
    inactive: { label: 'Non attivo', variant: 'destructive' },
  }

  if (properties.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-lg font-medium text-foreground">Non hai ancora pubblicato annunci</p>
          <p className="mt-2 text-muted-foreground">
            Pubblica il tuo primo annuncio e inizia a ricevere offerte
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
      {properties.map((property) => (
        <Card key={property.id}>
          <CardContent className="flex flex-col gap-4 p-4 sm:flex-row">
            <div className="relative h-32 w-full overflow-hidden rounded-lg sm:w-48">
              {property.images && property.images.length > 0 ? (
                <Image
                  src={property.images[0]}
                  alt={property.title}
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
                    <h3 className="font-semibold text-foreground">{property.title}</h3>
                    <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{property.city}</span>
                    </div>
                  </div>
                  <Badge variant={statusLabels[property.status].variant}>
                    {statusLabels[property.status].label}
                  </Badge>
                </div>
                <p className="mt-2 text-xl font-bold text-primary">{formatPrice(property.price)}</p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Eye className="h-4 w-4" />
                  <span>{property.views} visualizzazioni</span>
                </div>

                <div className="flex gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/immobili/${property.id}`}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Vedi
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/immobili/${property.id}/modifica`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Modifica
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
