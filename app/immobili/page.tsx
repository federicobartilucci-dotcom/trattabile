import { Suspense } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { PropertyCard } from '@/components/property-card'
import { PropertiesFilter } from '@/components/properties-filter'
import { createClient } from '@/lib/supabase/server'
import { Spinner } from '@/components/ui/spinner'

interface PageProps {
  searchParams: Promise<{
    tipo?: string
    citta?: string
    prezzo_min?: string
    prezzo_max?: string
    locali_min?: string
  }>
}

async function PropertiesList({ searchParams }: { searchParams: Awaited<PageProps['searchParams']> }) {
  const supabase = await createClient()
  
  let query = supabase
    .from('properties')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  if (searchParams.tipo) {
    query = query.eq('property_type', searchParams.tipo)
  }
  if (searchParams.citta) {
    query = query.ilike('city', `%${searchParams.citta}%`)
  }
  if (searchParams.prezzo_min) {
    query = query.gte('price', parseInt(searchParams.prezzo_min))
  }
  if (searchParams.prezzo_max) {
    query = query.lte('price', parseInt(searchParams.prezzo_max))
  }
  if (searchParams.locali_min) {
    query = query.gte('rooms', parseInt(searchParams.locali_min))
  }

  const { data: properties, error } = await query

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Errore nel caricamento degli immobili</p>
      </div>
    )
  }

  if (!properties || properties.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl font-semibold text-foreground">Nessun immobile trovato</p>
        <p className="mt-2 text-muted-foreground">Prova a modificare i filtri di ricerca</p>
      </div>
    )
  }

  return (
    <>
      <p className="mb-6 text-muted-foreground">{properties.length} immobili trovati</p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </>
  )
}

export default async function ImmobiliPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Immobili in vendita</h1>
            <p className="mt-2 text-muted-foreground">
              Trova la casa dei tuoi sogni tra gli annunci disponibili
            </p>
          </div>

          <PropertiesFilter />

          <Suspense fallback={
            <div className="flex justify-center py-12">
              <Spinner className="h-8 w-8" />
            </div>
          }>
            <PropertiesList searchParams={resolvedParams} />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  )
}
