'use client'

import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ReactNode } from 'react'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <Toaster />
      {children}
    </NextThemesProvider>
  )
}

export default Providers
