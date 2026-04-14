import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Home, Mail } from 'lucide-react'

export default function ConfermaPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 px-4">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
          <Home className="h-6 w-6 text-primary-foreground" />
        </div>
        <span className="text-2xl font-bold text-foreground">Trattabile</span>
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Controlla la tua email</CardTitle>
          <CardDescription>
            Ti abbiamo inviato un link per confermare il tuo account
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-6 text-muted-foreground">
            Clicca sul link che trovi nell&apos;email per completare la registrazione e iniziare a usare Trattabile.
          </p>
          <Button asChild variant="outline">
            <Link href="/auth/login">Torna al login</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
