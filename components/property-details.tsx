import type { Property } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { Maximize, BedDouble, Bath, Building2, CalendarDays, Zap } from 'lucide-react'

interface PropertyDetailsProps {
  property: Property
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
  const details = [
    { icon: Maximize, label: 'Superficie', value: property.sqm ? `${property.sqm} m²` : null },
    { icon: BedDouble, label: 'Locali', value: property.rooms ? `${property.rooms}` : null },
    { icon: Bath, label: 'Bagni', value: property.bathrooms ? `${property.bathrooms}` : null },
    { icon: Building2, label: 'Piano', value: property.floor !== null ? `${property.floor}°` : null },
    { icon: CalendarDays, label: 'Anno costruzione', value: property.year_built ? `${property.year_built}` : null },
    { icon: Zap, label: 'Classe energetica', value: property.energy_class },
  ].filter((d) => d.value !== null)

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-foreground">Caratteristiche</h2>
      
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {details.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{label}</p>
              <p className="font-semibold text-foreground">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {property.features && property.features.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-foreground">Dotazioni</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {property.features.map((feature) => (
              <Badge key={feature} variant="secondary">
                {feature}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
