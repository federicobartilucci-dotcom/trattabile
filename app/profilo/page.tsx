import { redirect } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProfileForm } from '@/components/profile-form'
import { createClient } from '@/lib/supabase/server'

export default async function ProfiloPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login?redirect=/profilo')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Il mio profilo</h1>
            <p className="mt-2 text-muted-foreground">
              Gestisci le tue informazioni personali
            </p>
          </div>

          <ProfileForm profile={profile} userEmail={user.email || ''} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
