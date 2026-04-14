import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Property } from '@/lib/types'
import { MapPin, Maximize, BedDouble, Bath } from 'lucide-react'

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const propertyTypeLabels: Record<string, string> = {
    appartamento: 'Appartamento',
    villa: 'Villa',
    casa: 'Casa',
    terreno: 'Terreno',
    commerciale: 'Commerciale',
    altro: 'Altro',
  }

  return (
    <Link href={`/immobili/${property.id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <div className="relative aspect-[4/3] overflow-hidden">
          {property.images && property.images.length > 0 ? (
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-muted">
              <span className="text-muted-foreground">Nessuna immagine</span>
            </div>
          )}
          <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">
            {propertyTypeLabels[property.property_type]}
          </Badge>
        </div>
        <CardContent className="p-4">
          <div className="mb-2">
            <p className="text-xl font-bold text-primary">{formatPrice(property.price)}</p>
          </div>
          <h3 className="mb-2 line-clamp-1 text-lg font-semibold text-foreground group-hover:text-primary">
            {property.title}
          </h3>
          <div className="mb-3 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">{property.city}{property.province ? `, ${property.province}` : ''}</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {property.sqm && (
              <div className="flex items-center gap-1">
                <Maximize className="h-4 w-4" />
                <span>{property.sqm} m²</span>
              </div>
            )}
            {property.rooms && (
              <div className="flex items-center gap-1">
                <BedDouble className="h-4 w-4" />
                <span>{property.rooms} locali</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span>{property.bathrooms}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
