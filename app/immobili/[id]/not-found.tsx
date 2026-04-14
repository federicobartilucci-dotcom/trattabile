import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
            <Home className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Immobile non trovato</h1>
          <p className="mt-4 max-w-md text-muted-foreground">
            L&apos;immobile che stai cercando non esiste o è stato rimosso dalla piattaforma.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild>
              <Link href="/immobili">
                <Search className="mr-2 h-4 w-4" />
                Cerca altri immobili
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Torna alla home</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
