import Link from "next/link"
import { redirect } from "next/navigation"
import { UserProvider } from "@auth0/nextjs-auth0/client"
import { SettingsIcon } from "lucide-react"

import { appClient, managementClient } from "@/lib/auth0"
import { Button } from "@/components/ui/button"
import { Auth0Logo } from "@/components/auth0-logo"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await appClient.getSession()

  // if the user is not authenticated, redirect to login
  if (!session?.user) {
    redirect("/api/auth/login")
  }

  return (
    <UserProvider>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-2 py-4 sm:px-8">
        <div className="flex items-center space-x-6">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
        </div>

        <div className="flex flex-row gap-x-4">
          <UserNav />
        </div>
      </nav>

      <main className="mx-auto grid min-h-[calc(100svh-164px)] max-w-7xl px-2 sm:px-8 lg:py-6">
        {children}
      </main>

      <footer className="mx-auto max-w-7xl px-2 py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <Auth0Logo className="h-6 w-6" />

            <div className="font-mono font-semibold">
              <Link href="/">SaaStart</Link>
            </div>

            <div>
              <Button variant="link" asChild>
                <Link href="/">Home</Link>
              </Button>

              <Button variant="link" asChild>
                <Link
                  href="https://github.com/auth0-developer-hub/auth0-b2b-saas-starter"
                  target="_blank"
                >
                  Source
                </Link>
              </Button>
            </div>
          </div>

          <div className="items-center gap-x-2">
            <ModeToggle />
          </div>
        </div>
      </footer>
    </UserProvider>
  )
}
