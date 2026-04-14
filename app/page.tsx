import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { PropertyCard } from '@/components/property-card'
import { PricingButton } from '@/components/pricing-button'
import { createClient } from '@/lib/supabase/server'
import { Search, Shield, Handshake, Home, ArrowRight } from 'lucide-react'

export default async function HomePage() {
  const supabase = await createClient()
  
  const { data: properties } = await supabase
    .from('properties')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(6)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-secondary to-background px-4 py-20 sm:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Compra e vendi immobili con{' '}
                <span className="text-primary">offerte anonime</span>
              </h1>
              <p className="mt-6 text-pretty text-lg text-muted-foreground sm:text-xl">
                La piattaforma innovativa dove venditori e acquirenti si incontrano in modo trasparente. 
                Le offerte restano anonime fino all&apos;accettazione.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/immobili">
                    <Search className="mr-2 h-5 w-5" />
                    Cerca immobili
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                  <Link href="/immobili/nuovo">
                    <Home className="mr-2 h-5 w-5" />
                    Vendi il tuo immobile
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Come funziona
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Un processo semplice e trasparente per comprare o vendere il tuo immobile
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              <div className="relative rounded-2xl border border-border bg-card p-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Search className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">1. Cerca o pubblica</h3>
                <p className="mt-3 text-muted-foreground">
                  Esplora gli immobili disponibili o pubblica il tuo annuncio con foto, descrizione e prezzo richiesto.
                </p>
              </div>

              <div className="relative rounded-2xl border border-border bg-card p-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">2. Offerte anonime</h3>
                <p className="mt-3 text-muted-foreground">
                  Gli acquirenti fanno offerte in modo anonimo. Il venditore vede solo l&apos;importo, non chi l&apos;ha fatta.
                </p>
              </div>

              <div className="relative rounded-2xl border border-border bg-card p-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Handshake className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">3. Contatto diretto</h3>
                <p className="mt-3 text-muted-foreground">
                  Solo dopo l&apos;accettazione dell&apos;offerta si sbloccano i contatti per procedere con la trattativa.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Properties */}
        {properties && properties.length > 0 && (
          <section className="bg-muted/30 px-4 py-20">
            <div className="mx-auto max-w-7xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Ultimi immobili
                  </h2>
                  <p className="mt-2 text-lg text-muted-foreground">
                    Scopri le ultime proprietà aggiunte alla piattaforma
                  </p>
                </div>
                <Button asChild variant="outline" className="hidden sm:flex">
                  <Link href="/immobili">
                    Vedi tutti
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>

              <div className="mt-8 text-center sm:hidden">
                <Button asChild>
                  <Link href="/immobili">
                    Vedi tutti gli immobili
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Pricing Section */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Scegli il tuo piano
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Sblocca tutte le funzionalita per comprare o vendere immobili
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:max-w-4xl lg:mx-auto">
              {/* Acquirente */}
              <div className="relative rounded-2xl border border-border bg-card p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Acquirente</h3>
                    <p className="text-sm text-muted-foreground">Per chi cerca casa</p>
                  </div>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4 text-primary" />
                    Offerte anonime illimitate
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4 text-primary" />
                    Contatti sbloccati dopo accettazione
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4 text-primary" />
                    Notifiche in tempo reale
                  </li>
                </ul>
                <PricingButton productId="accesso-offerte" />
              </div>

              {/* Venditore */}
              <div className="relative rounded-2xl border-2 border-primary bg-card p-8">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Piu popolare
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Home className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Venditore</h3>
                    <p className="text-sm text-muted-foreground">Per chi vende immobili</p>
                  </div>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Handshake className="h-4 w-4 text-primary" />
                    Pubblica immobili illimitati
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Handshake className="h-4 w-4 text-primary" />
                    Ricevi offerte anonime
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Handshake className="h-4 w-4 text-primary" />
                    Dashboard di gestione completa
                  </li>
                </ul>
                <PricingButton productId="carica-immobili" />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-3xl bg-primary px-8 py-16 text-center sm:px-16">
              <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                Pronto a vendere il tuo immobile?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
                Pubblica il tuo annuncio e ricevi offerte da acquirenti interessati. 
                Il processo e semplice, veloce e trasparente.
              </p>
              <Button asChild size="lg" variant="secondary" className="mt-8">
                <Link href="/immobili/nuovo">
                  Inizia ora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
