import Link from 'next/link'
import { Home } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Home className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Trattabile</span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              La piattaforma immobiliare innovativa dove le offerte sono anonime fino all&apos;accettazione. 
              Trova la tua casa ideale o vendi il tuo immobile in modo trasparente e sicuro.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Navigazione</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/immobili" className="text-sm text-muted-foreground hover:text-primary">
                  Cerca immobili
                </Link>
              </li>
              <li>
                <Link href="/immobili/nuovo" className="text-sm text-muted-foreground hover:text-primary">
                  Vendi un immobile
                </Link>
              </li>
              <li>
                <Link href="/auth/registrati" className="text-sm text-muted-foreground hover:text-primary">
                  Registrati
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Legale</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Termini di servizio
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            {new Date().getFullYear()} Trattabile. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  )
}
