'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { createClient } from '@/lib/supabase/client'
import { PROPERTY_TYPES, ENERGY_CLASSES, FEATURES_OPTIONS } from '@/lib/types'
import { Upload, X, Loader2 } from 'lucide-react'

export function PropertyForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [uploadingImages, setUploadingImages] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    property_type: '',
    address: '',
    city: '',
    province: '',
    cap: '',
    sqm: '',
    rooms: '',
    bathrooms: '',
    floor: '',
    year_built: '',
    energy_class: '',
    video_url: '',
    features: [] as string[],
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFeatureToggle = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    setUploadingImages(true)
    const supabase = createClient()

    try {
      const uploadedUrls: string[] = []

      for (const file of Array.from(files)) {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
        const filePath = `properties/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, file)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('images')
          .getPublicUrl(filePath)

        uploadedUrls.push(publicUrl)
      }

      setImages((prev) => [...prev, ...uploadedUrls])
    } catch {
      setError('Errore nel caricamento delle immagini')
    } finally {
      setUploadingImages(false)
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      router.push('/auth/login?redirect=/immobili/nuovo')
      return
    }

    if (!formData.title || !formData.price || !formData.property_type || !formData.address || !formData.city) {
      setError('Compila tutti i campi obbligatori')
      setLoading(false)
      return
    }

    const { data, error: insertError } = await supabase
      .from('properties')
      .insert({
        user_id: user.id,
        title: formData.title,
        description: formData.description || null,
        price: parseFloat(formData.price),
        property_type: formData.property_type,
        address: formData.address,
        city: formData.city,
        province: formData.province || null,
        cap: formData.cap || null,
        sqm: formData.sqm ? parseInt(formData.sqm) : null,
        rooms: formData.rooms ? parseInt(formData.rooms) : null,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
        floor: formData.floor ? parseInt(formData.floor) : null,
        year_built: formData.year_built ? parseInt(formData.year_built) : null,
        energy_class: formData.energy_class || null,
        video_url: formData.video_url || null,
        features: formData.features.length > 0 ? formData.features : null,
        images: images.length > 0 ? images : null,
        status: 'active',
      })
      .select()
      .single()

    if (insertError) {
      setError('Errore nella pubblicazione dell\'annuncio. Riprova.')
      setLoading(false)
      return
    }

    router.push(`/immobili/${data.id}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>Informazioni base</CardTitle>
          <CardDescription>I dati principali del tuo immobile</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Titolo annuncio *
            </label>
            <Input
              placeholder="Es. Appartamento luminoso con terrazzo"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Tipologia *
              </label>
              <Select value={formData.property_type} onValueChange={(v) => handleChange('property_type', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona tipologia" />
                </SelectTrigger>
                <SelectContent>
                  {PROPERTY_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Prezzo richiesto (€) *
              </label>
              <Input
                type="number"
                placeholder="Es. 250000"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Descrizione
            </label>
            <Textarea
              placeholder="Descrivi il tuo immobile..."
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={5}
            />
          </div>
        </CardContent>
      </Card>

      {/* Location */}
      <Card>
        <CardHeader>
          <CardTitle>Posizione</CardTitle>
          <CardDescription>Dove si trova l&apos;immobile</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Indirizzo *
            </label>
            <Input
              placeholder="Es. Via Roma 123"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Città *
              </label>
              <Input
                placeholder="Es. Milano"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Provincia
              </label>
              <Input
                placeholder="Es. MI"
                value={formData.province}
                onChange={(e) => handleChange('province', e.target.value)}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                CAP
              </label>
              <Input
                placeholder="Es. 20121"
                value={formData.cap}
                onChange={(e) => handleChange('cap', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Details */}
      <Card>
        <CardHeader>
          <CardTitle>Caratteristiche</CardTitle>
          <CardDescription>I dettagli tecnici dell&apos;immobile</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Superficie (m²)
              </label>
              <Input
                type="number"
                placeholder="Es. 100"
                value={formData.sqm}
                onChange={(e) => handleChange('sqm', e.target.value)}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Locali
              </label>
              <Input
                type="number"
                placeholder="Es. 3"
                value={formData.rooms}
                onChange={(e) => handleChange('rooms', e.target.value)}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Bagni
              </label>
              <Input
                type="number"
                placeholder="Es. 2"
                value={formData.bathrooms}
                onChange={(e) => handleChange('bathrooms', e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Piano
              </label>
              <Input
                type="number"
                placeholder="Es. 2"
                value={formData.floor}
                onChange={(e) => handleChange('floor', e.target.value)}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Anno costruzione
              </label>
              <Input
                type="number"
                placeholder="Es. 2010"
                value={formData.year_built}
                onChange={(e) => handleChange('year_built', e.target.value)}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Classe energetica
              </label>
              <Select value={formData.energy_class} onValueChange={(v) => handleChange('energy_class', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona" />
                </SelectTrigger>
                <SelectContent>
                  {ENERGY_CLASSES.map((cls) => (
                    <SelectItem key={cls} value={cls}>
                      Classe {cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="mb-3 block text-sm font-medium text-foreground">
              Dotazioni
            </label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {FEATURES_OPTIONS.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <Checkbox
                    id={feature}
                    checked={formData.features.includes(feature)}
                    onCheckedChange={() => handleFeatureToggle(feature)}
                  />
                  <label htmlFor={feature} className="text-sm text-foreground cursor-pointer">
                    {feature}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Media */}
      <Card>
        <CardHeader>
          <CardTitle>Foto e Video</CardTitle>
          <CardDescription>Aggiungi contenuti multimediali</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Foto dell&apos;immobile
            </label>
            <div className="flex flex-wrap gap-4">
              {images.map((url, index) => (
                <div key={index} className="relative h-24 w-24">
                  <img
                    src={url}
                    alt={`Immagine ${index + 1}`}
                    className="h-full w-full rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <label className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-border hover:border-primary">
                {uploadingImages ? (
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                ) : (
                  <Upload className="h-6 w-6 text-muted-foreground" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploadingImages}
                />
              </label>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Carica fino a 10 immagini (max 5MB ciascuna)
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Video (URL YouTube o Vimeo)
            </label>
            <Input
              type="url"
              placeholder="Es. https://www.youtube.com/watch?v=..."
              value={formData.video_url}
              onChange={(e) => handleChange('video_url', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Annulla
        </Button>
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Pubblicazione in corso...
            </>
          ) : (
            'Pubblica annuncio'
          )}
        </Button>
      </div>
    </form>
  )
}
