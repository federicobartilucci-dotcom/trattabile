import { notFound } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { PropertyGallery } from '@/components/property-gallery'
import { PropertyDetails } from '@/components/property-details'
import { OfferForm } from '@/components/offer-form'
import { PropertyOffers } from '@/components/property-offers'
import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/badge'
import { MapPin, Calendar, Eye } from 'lucide-react'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function PropertyPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: property, error } = await supabase
    .from('properties')
    .select('*, profiles(*)')
    .eq('id', id)
    .single()

  if (error || !property) {
    notFound()
  }

  const { data: { user } } = await supabase.auth.getUser()
  const isOwner = user?.id === property.user_id

  // Get offers count for the property owner
  let offersCount = 0
  if (isOwner) {
    const { count } = await supabase
      .from('offers')
      .select('*', { count: 'exact', head: true })
      .eq('property_id', id)
      .eq('status', 'pending')
    offersCount = count || 0
  }

  // Check if user already made an offer
  let existingOffer = null
  if (user && !isOwner) {
    const { data } = await supabase
      .from('offers')
      .select('*')
      .eq('property_id', id)
      .eq('buyer_id', user.id)
      .in('status', ['pending', 'accepted'])
      .single()
    existingOffer = data
  }

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
      month: 'long',
      year: 'numeric',
    })
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
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2">
              <PropertyGallery images={property.images} videoUrl={property.video_url} />
              
              <div className="mt-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{propertyTypeLabels[property.property_type]}</Badge>
                  {property.energy_class && (
                    <Badge variant="outline">Classe {property.energy_class}</Badge>
                  )}
                </div>
                
                <h1 className="mt-4 text-3xl font-bold text-foreground">{property.title}</h1>
                
                <div className="mt-3 flex flex-wrap items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{property.address}, {property.city}{property.province ? ` (${property.province})` : ''}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Pubblicato il {formatDate(property.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{property.views} visualizzazioni</span>
                  </div>
                </div>

                <p className="mt-2 text-3xl font-bold text-primary">{formatPrice(property.price)}</p>
              </div>

              <PropertyDetails property={property} />

              {property.description && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold text-foreground">Descrizione</h2>
                  <p className="mt-4 whitespace-pre-wrap text-muted-foreground">{property.description}</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {isOwner ? (
                  <PropertyOffers propertyId={property.id} offersCount={offersCount} />
                ) : (
                  <OfferForm 
                    propertyId={property.id} 
                    askingPrice={property.price}
                    existingOffer={existingOffer}
                    isLoggedIn={!!user}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
