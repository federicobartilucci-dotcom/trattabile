'use client'

import { useState } from 'react'
import { Button, ButtonProps } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface CheckoutButtonProps extends Omit<ButtonProps, 'onClick'> {
  productId: string
  returnUrl?: string
  children: React.ReactNode
}

export function CheckoutButton({ 
  productId, 
  returnUrl,
  children, 
  ...props 
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          returnUrl: returnUrl || window.location.href,
        }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        console.error('Checkout error:', data.error)
        setLoading(false)
      }
    } catch (error) {
      console.error('Checkout error:', error)
      setLoading(false)
    }
  }

  return (
    <Button onClick={handleCheckout} disabled={loading} {...props}>
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Caricamento...
        </>
      ) : (
        children
      )}
    </Button>
  )
}
