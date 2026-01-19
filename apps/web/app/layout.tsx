import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import { config } from "@fortawesome/fontawesome-svg-core";
import { DotGridBackground } from "@/components/ui/DotGridBackground";
import { AppHeader } from "@/components/layouts/AppHeader";
import { AppFooter } from "@/components/layouts/AppFooter";
import { ToastProvider } from "@/components/ui/ToastProvider";
import "@fortawesome/fontawesome-svg-core/styles.css";
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

        <AppHeader />

        <main className="relative z-10">
          <ToastProvider>{children}</ToastProvider>
        </main>

        <AppFooter />
      </body>
    </html>
  );
}
