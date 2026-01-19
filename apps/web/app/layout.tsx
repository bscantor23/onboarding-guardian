import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { DotGridBackground } from "@/components/ui/DotGridBackground";
import { AppHeader } from "@/components/layouts/AppHeader";
import { AppFooter } from "@/components/layouts/AppFooter";
import Link from "next/link";
import "./globals.css";

config.autoAddCss = false;

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Onboarding Guardian",
  description: "Test Case",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={manrope.className}>
      <body className="bg-background text-ink transition-colors duration-300">
        <DotGridBackground />

        <AppHeader
          nav={[{ label: "Productos", href: "/products" }]}
          rightSlot={
            <Link href="/login" className="inline-flex">
              <span className="inline-flex h-10 items-center justify-center rounded-lg bg-mint px-4 text-sm font-bold text-ink transition-colors hover:bg-primary/10">
                Iniciar sesión
              </span>
            </Link>
          }
        />

        <main className="relative z-10">{children}</main>

        <AppFooter />
      </body>
    </html>
  );
}
