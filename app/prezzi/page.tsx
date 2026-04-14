import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { PricingButton } from '@/components/pricing-button'
import { Search, Home, Shield, Handshake, Check } from 'lucide-react'

export const metadata = {
  title: 'Prezzi - Trattabile',
  description: 'Scegli il piano giusto per te: acquirente o venditore',
}

export default function PrezziPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="flex-1 px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Piani e prezzi
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Scegli il piano che fa per te e inizia a comprare o vendere immobili in modo innovativo
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
                  <h2 className="text-xl font-semibold text-foreground">Acquirente</h2>
                  <p className="text-sm text-muted-foreground">Per chi cerca casa</p>
                </div>
              </div>
              
              <p className="mt-6 text-3xl font-bold text-foreground">
                Vedi prezzo al checkout
              </p>
              
              <ul className="mt-8 space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-muted-foreground">Fai offerte anonime su qualsiasi immobile</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-muted-foreground">Contatti del venditore sbloccati dopo accettazione</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-muted-foreground">Notifiche in tempo reale sulle tue offerte</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-muted-foreground">Dashboard personale per gestire le offerte</span>
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
                  <h2 className="text-xl font-semibold text-foreground">Venditore</h2>
                  <p className="text-sm text-muted-foreground">Per chi vende immobili</p>
                </div>
              </div>
              
              <p className="mt-6 text-3xl font-bold text-foreground">
                Vedi prezzo al checkout
              </p>
              
              <ul className="mt-8 space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-muted-foreground">Pubblica annunci illimitati con foto e video</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-muted-foreground">Ricevi offerte anonime da acquirenti verificati</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-muted-foreground">Accetta o rifiuta offerte in un click</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-muted-foreground">Dashboard completa per gestire i tuoi immobili</span>
                </li>
              </ul>

              <PricingButton productId="carica-immobili" />
            </div>
          </div>

          {/* FAQ or additional info */}
          <div className="mt-20 mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-foreground">Domande frequenti</h2>
            
            <div className="mt-8 space-y-6 text-left">
              <div>
                <h3 className="font-semibold text-foreground">Come funzionano le offerte anonime?</h3>
                <p className="mt-2 text-muted-foreground">
                  Quando fai un&apos;offerta, il venditore vede solo l&apos;importo proposto, non i tuoi dati personali.
                  Solo dopo l&apos;accettazione entrambe le parti vedono i rispettivi contatti.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground">Posso essere sia acquirente che venditore?</h3>
                <p className="mt-2 text-muted-foreground">
                  Certo! Puoi attivare entrambi i piani sul tuo account per avere accesso completo
                  a tutte le funzionalita della piattaforma.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground">Il pagamento e una tantum o in abbonamento?</h3>
                <p className="mt-2 text-muted-foreground">
                  Il pagamento e una tantum. Una volta attivato il piano, hai accesso permanente
                  alle funzionalita incluse.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
