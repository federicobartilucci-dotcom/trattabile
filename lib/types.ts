export interface Profile {
  id: string
  full_name: string | null
  phone: string | null
  email: string | null
  user_type: 'buyer' | 'seller' | 'both'
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface Property {
  id: string
  user_id: string
  title: string
  description: string | null
  price: number
  property_type: 'appartamento' | 'villa' | 'casa' | 'terreno' | 'commerciale' | 'altro'
  address: string
  city: string
  province: string | null
  cap: string | null
  sqm: number | null
  rooms: number | null
  bathrooms: number | null
  floor: number | null
  year_built: number | null
  energy_class: string | null
  features: string[] | null
  images: string[] | null
  video_url: string | null
  status: 'active' | 'pending' | 'sold' | 'inactive'
  views: number
  created_at: string
  updated_at: string
  profiles?: Profile
}

export interface Offer {
  id: string
  property_id: string
  buyer_id: string
  amount: number
  message: string | null
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn'
  created_at: string
  updated_at: string
  profiles?: Profile
  properties?: Property
}

export const PROPERTY_TYPES = [
  { value: 'appartamento', label: 'Appartamento' },
  { value: 'villa', label: 'Villa' },
  { value: 'casa', label: 'Casa' },
  { value: 'terreno', label: 'Terreno' },
  { value: 'commerciale', label: 'Commerciale' },
  { value: 'altro', label: 'Altro' },
] as const

export const ENERGY_CLASSES = ['A4', 'A3', 'A2', 'A1', 'B', 'C', 'D', 'E', 'F', 'G'] as const

export const FEATURES_OPTIONS = [
  'Balcone',
  'Terrazzo',
  'Giardino',
  'Box auto',
  'Posto auto',
  'Cantina',
  'Ascensore',
  'Portineria',
  'Aria condizionata',
  'Riscaldamento autonomo',
  'Arredato',
  'Piscina',
  'Vista mare',
  'Vista montagna',
] as const
