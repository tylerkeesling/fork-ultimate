import type { Metadata } from "next"

import "./globals.css"

import { Poppins } from "next/font/google"

import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] })

export const metadata: Metadata = {
  title: "Wallet | by Uphold",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={poppins.className} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>

        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}
