'use client'

import { CheckoutButton } from '@/components/checkout-button'
import { ArrowRight } from 'lucide-react'

interface PricingButtonProps {
  productId: string
}

export function PricingButton({ productId }: PricingButtonProps) {
  const isSellerProduct = productId === 'carica-immobili'

  return (
    <CheckoutButton
      productId={productId}
      className={`mt-8 w-full ${isSellerProduct ? '' : 'bg-foreground text-background hover:bg-foreground/90'}`}
      variant={isSellerProduct ? 'default' : 'outline'}
    >
      {isSellerProduct ? 'Attiva piano Venditore' : 'Attiva piano Acquirente'}
      <ArrowRight className="ml-2 h-4 w-4" />
    </CheckoutButton>
  )
}
