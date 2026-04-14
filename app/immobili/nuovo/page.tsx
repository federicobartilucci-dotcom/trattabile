import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { PropertyForm } from '@/components/property-form'

export default function NuovoImmobilePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Inserisci un nuovo annuncio</h1>
            <p className="mt-2 text-muted-foreground">
              Compila il form per pubblicare il tuo immobile sulla piattaforma
            </p>
          </div>

          <PropertyForm />
        </div>
      </main>

      <Footer />
    </div>
  )
}
