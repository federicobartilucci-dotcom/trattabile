import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { createClient } from '@/lib/supabase/server'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MyProperties } from '@/components/dashboard/my-properties'
import { MyOffers } from '@/components/dashboard/my-offers'
import { ReceivedOffers } from '@/components/dashboard/received-offers'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login?redirect=/dashboard')
  }

  // Fetch user's properties
  const { data: properties } = await supabase
    .from('properties')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  // Fetch user's offers (as buyer)
  const { data: myOffers } = await supabase
    .from('offers')
    .select('*, properties(*)')
    .eq('buyer_id', user.id)
    .order('created_at', { ascending: false })

  // Fetch offers received on user's properties (as seller)
  const propertyIds = properties?.map(p => p.id) || []
  let receivedOffers: typeof myOffers = []
  
  if (propertyIds.length > 0) {
    const { data } = await supabase
      .from('offers')
      .select('*, properties(*), profiles!offers_buyer_id_fkey(*)')
      .in('property_id', propertyIds)
      .order('created_at', { ascending: false })
    receivedOffers = data
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="mt-2 text-muted-foreground">
                Gestisci i tuoi annunci e le tue offerte
              </p>
            </div>
            <Button asChild>
              <Link href="/immobili/nuovo">
                <Plus className="mr-2 h-4 w-4" />
                Nuovo annuncio
              </Link>
            </Button>
          </div>

          <Tabs defaultValue="properties">
            <TabsList className="mb-6">
              <TabsTrigger value="properties">
                I miei annunci ({properties?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="my-offers">
                Le mie offerte ({myOffers?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="received-offers">
                Offerte ricevute ({receivedOffers?.length || 0})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="properties">
              <MyProperties properties={properties || []} />
            </TabsContent>

            <TabsContent value="my-offers">
              <MyOffers offers={myOffers || []} />
            </TabsContent>

            <TabsContent value="received-offers">
              <ReceivedOffers offers={receivedOffers || []} />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
