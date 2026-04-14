'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { createClient } from '@/lib/supabase/client'
import type { Profile } from '@/lib/types'
import { Loader2, Check } from 'lucide-react'

interface ProfileFormProps {
  profile: Profile | null
  userEmail: string
}

export function ProfileForm({ profile, userEmail }: ProfileFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    phone: profile?.phone || '',
    email: profile?.email || userEmail,
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setSuccess(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      router.push('/auth/login')
      return
    }

    const { error: updateError } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        full_name: formData.full_name,
        phone: formData.phone,
        email: formData.email,
      })

    if (updateError) {
      setError('Errore nel salvataggio del profilo')
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
    router.refresh()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informazioni personali</CardTitle>
        <CardDescription>
          Questi dati verranno condivisi con la controparte solo dopo l&apos;accettazione di un&apos;offerta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Nome completo
            </label>
            <Input
              placeholder="Mario Rossi"
              value={formData.full_name}
              onChange={(e) => handleChange('full_name', e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Email di contatto
            </label>
            <Input
              type="email"
              placeholder="nome@esempio.it"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Puoi usare un&apos;email diversa da quella di accesso
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Telefono
            </label>
            <Input
              type="tel"
              placeholder="+39 333 1234567"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-primary bg-primary/10">
              <Check className="h-4 w-4 text-primary" />
              <AlertDescription className="text-primary">
                Profilo aggiornato con successo
              </AlertDescription>
            </Alert>
          )}

          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvataggio...
              </>
            ) : (
              'Salva modifiche'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
