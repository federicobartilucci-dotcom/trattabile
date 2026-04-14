export interface Product {
  id: string
  name: string
  description: string
  priceId: string // Stripe Price ID
}

export const PRODUCTS: Product[] = [
  {
    id: 'accesso-offerte',
    name: 'Accesso Offerte',
    description: 'Sblocca la possibilita di fare offerte sugli immobili',
    priceId: 'price_1TLi29LJRdC4G3IbIuyuXqVE',
  },
  {
    id: 'carica-immobili',
    name: 'Carica Immobili',
    description: 'Pubblica i tuoi immobili sulla piattaforma',
    priceId: 'price_1TLi0hLJRdC4G3IbjD44CUN7',
  },
]

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}
