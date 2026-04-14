'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PROPERTY_TYPES } from '@/lib/types'
import { Search, X } from 'lucide-react'
import { useState } from 'react'

export function PropertiesFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [tipo, setTipo] = useState(searchParams.get('tipo') || '')
  const [citta, setCitta] = useState(searchParams.get('citta') || '')
  const [prezzoMin, setPrezzoMin] = useState(searchParams.get('prezzo_min') || '')
  const [prezzoMax, setPrezzoMax] = useState(searchParams.get('prezzo_max') || '')
  const [localiMin, setLocaliMin] = useState(searchParams.get('locali_min') || '')

  const applyFilters = () => {
    const params = new URLSearchParams()
    if (tipo) params.set('tipo', tipo)
    if (citta) params.set('citta', citta)
    if (prezzoMin) params.set('prezzo_min', prezzoMin)
    if (prezzoMax) params.set('prezzo_max', prezzoMax)
    if (localiMin) params.set('locali_min', localiMin)
    
    router.push(`/immobili?${params.toString()}`)
  }

  const clearFilters = () => {
    setTipo('')
    setCitta('')
    setPrezzoMin('')
    setPrezzoMax('')
    setLocaliMin('')
    router.push('/immobili')
  }

  const hasFilters = tipo || citta || prezzoMin || prezzoMax || localiMin

  return (
    <div className="mb-8 rounded-xl border border-border bg-card p-4 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Tipologia</label>
          <Select value={tipo} onValueChange={setTipo}>
            <SelectTrigger>
              <SelectValue placeholder="Tutte le tipologie" />
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
          <label className="mb-2 block text-sm font-medium text-foreground">Città</label>
          <Input
            placeholder="Es. Milano"
            value={citta}
            onChange={(e) => setCitta(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Prezzo min</label>
          <Input
            type="number"
            placeholder="Da"
            value={prezzoMin}
            onChange={(e) => setPrezzoMin(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Prezzo max</label>
          <Input
            type="number"
            placeholder="A"
            value={prezzoMax}
            onChange={(e) => setPrezzoMax(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Locali min</label>
          <Select value={localiMin} onValueChange={setLocaliMin}>
            <SelectTrigger>
              <SelectValue placeholder="Qualsiasi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
              <SelectItem value="5">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
        {hasFilters && (
          <Button variant="ghost" onClick={clearFilters}>
            <X className="mr-2 h-4 w-4" />
            Cancella filtri
          </Button>
        )}
        <Button onClick={applyFilters}>
          <Search className="mr-2 h-4 w-4" />
          Cerca
        </Button>
      </div>
    </div>
  )
}
