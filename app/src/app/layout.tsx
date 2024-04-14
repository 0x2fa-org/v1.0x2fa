import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: '0x2FA',
  description: 'The decentralized authenticator built with Oasis, Bandada and Near.',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="manifest" href="/manifest.json" />
      <body
        className={cn(
          'min-h-screen bg-background antialiased h-1',
          inter.className
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export default RootLayout
