import { Suspense } from 'react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Home, Building, ArrowRight } from 'lucide-react'

function SuccessContent({ product }: { product: string | null }) {
  const isSellerProduct = product === 'carica-immobili'

  return (
    <Card className="mx-auto max-w-lg">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl">Pagamento completato!</CardTitle>
        <CardDescription>
          {isSellerProduct
            ? 'Ora puoi pubblicare i tuoi immobili sulla piattaforma'
            : 'Ora puoi fare offerte su tutti gli immobili'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg bg-muted p-4 text-center">
          <p className="text-sm text-muted-foreground">
            {isSellerProduct ? (
              <>
                Il tuo account venditore e stato attivato. Vai alla sezione{' '}
                <strong>Inserisci Immobile</strong> per iniziare a pubblicare.
              </>
            ) : (
              <>
                Il tuo account acquirente e stato attivato. Ora puoi fare offerte
                anonime su qualsiasi immobile presente sulla piattaforma.
              </>
            )}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {isSellerProduct ? (
            <Button asChild className="w-full">
              <Link href="/immobili/nuovo">
                <Building className="mr-2 h-4 w-4" />
                Inserisci il tuo primo immobile
              </Link>
            </Button>
          ) : (
            <Button asChild className="w-full">
              <Link href="/immobili">
                <ArrowRight className="mr-2 h-4 w-4" />
                Esplora gli immobili
              </Link>
            </Button>
          )}
          
          <Button asChild variant="outline" className="w-full">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Torna alla Home
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

async function SuccessPageContent({ 
  searchParams 
}: { 
  searchParams: Promise<{ product?: string }> 
}) {
  const params = await searchParams
  return <SuccessContent product={params.product || null} />
}

export default function CheckoutSuccessPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ product?: string }> 
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <Suspense fallback={
          <Card className="mx-auto max-w-lg animate-pulse">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-muted" />
              <div className="mx-auto h-8 w-48 rounded bg-muted" />
            </CardHeader>
          </Card>
        }>
          <SuccessPageContent searchParams={searchParams} />
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}
