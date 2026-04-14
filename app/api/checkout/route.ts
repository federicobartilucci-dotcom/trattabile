import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getProductById } from '@/lib/products'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { productId, returnUrl } = await request.json()

    // Validate product
    const product = getProductById(productId)
    if (!product) {
      return NextResponse.json(
        { error: 'Prodotto non trovato' },
        { status: 400 }
      )
    }

    // Get current user (optional, for metadata)
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Create Checkout Session using the pre-created Price ID
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price: product.priceId,
          quantity: 1,
        },
      ],
      success_url: `${request.nextUrl.origin}/checkout/successo?session_id={CHECKOUT_SESSION_ID}&product=${productId}`,
      cancel_url: returnUrl || `${request.nextUrl.origin}/`,
      metadata: {
        productId: product.id,
        userId: user?.id || 'anonymous',
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Errore nella creazione del checkout' },
      { status: 500 }
    )
  }
}
