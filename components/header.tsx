'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { Home, Menu, Plus, User as UserIcon, LogOut, Building2 } from 'lucide-react'

export function Header() {
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Home className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">Trattabile</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/immobili"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === '/immobili' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Immobili
          </Link>
          <Link
            href="/prezzi"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === '/prezzi' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Prezzi
          </Link>
          {user && (
            <Link
              href="/dashboard"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Dashboard
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {!loading && (
            <>
              {user ? (
                <>
                  <Button asChild variant="outline" size="sm" className="hidden sm:flex">
                    <Link href="/immobili/nuovo">
                      <Plus className="mr-2 h-4 w-4" />
                      Inserisci annuncio
                    </Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-9 w-9">
                        <UserIcon className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="flex items-center">
                          <Building2 className="mr-2 h-4 w-4" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/profilo" className="flex items-center">
                          <UserIcon className="mr-2 h-4 w-4" />
                          Profilo
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="sm:hidden">
                        <Link href="/immobili/nuovo" className="flex items-center">
                          <Plus className="mr-2 h-4 w-4" />
                          Inserisci annuncio
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                        <LogOut className="mr-2 h-4 w-4" />
                        Esci
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/auth/login">Accedi</Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href="/auth/registrati">Registrati</Link>
                  </Button>
                </>
              )}
            </>
          )}

          {/* Mobile menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/immobili">Immobili</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/prezzi">Prezzi</Link>
              </DropdownMenuItem>
              {user && (
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
