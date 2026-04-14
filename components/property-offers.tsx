import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MessageSquare, ArrowRight } from 'lucide-react'

interface PropertyOffersProps {
  propertyId: string
  offersCount: number
}

export function PropertyOffers({ propertyId, offersCount }: PropertyOffersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Il tuo annuncio
        </CardTitle>
        <CardDescription>
          Gestisci le offerte ricevute per questo immobile
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between rounded-lg bg-muted p-4">
          <span className="text-sm font-medium text-foreground">Offerte in attesa</span>
          <Badge variant={offersCount > 0 ? 'default' : 'secondary'}>
            {offersCount}
          </Badge>
        </div>

        <Button asChild className="w-full">
          <Link href={`/dashboard?property=${propertyId}`}>
            Gestisci offerte
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>

        <Button asChild variant="outline" className="w-full">
          <Link href={`/immobili/${propertyId}/modifica`}>
            Modifica annuncio
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
