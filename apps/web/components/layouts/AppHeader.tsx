"use client";

import { cn } from "@/lib/classnames";
import { faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "../auth/LogoutButton";
import { useEffect, useState } from "react";
import { tokenStore } from "@/lib/auth/token";

type NavItem = Readonly<{ label: string; href: string; active?: boolean }>;

export function AppHeader({
  nav,
  rightSlot,
}: Readonly<{
  nav?: NavItem[];
  rightSlot?: React.ReactNode;
}>) {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    setHasToken(!!tokenStore.get());
  }, []);

  const pathname = usePathname();

  const isProducts = pathname.startsWith("/products");
  const isOnboarding = pathname.startsWith("/onboarding");

  const computedNav: NavItem[] = nav ?? [
    { label: "Productos", href: "/products", active: isProducts },
    ...(hasToken
      ? [{ label: "Onboarding", href: "/onboarding", active: isOnboarding }]
      : []),
  ];

  const computedRightSlot =
    rightSlot ??
    (hasToken ? (
      <div className="flex items-center gap-3">
        <LogoutButton />
      </div>
    ) : (
      <Link
        href="/login"
        className="inline-flex h-10 items-center justify-center rounded-lg bg-mint px-4 text-sm font-bold text-ink transition-colors hover:bg-primary/10"
      >
        Iniciar sesión
      </Link>
    ));

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto grid h-16 w-full max-w-7xl grid-cols-3 items-center px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3 justify-self-start">
          <div className="flex items-center justify-center rounded-lg bg-primary p-1.5 text-white">
            <FontAwesomeIcon icon={faShieldHalved} className="text-[20px]" />
          </div>

          <h2 className="text-lg font-extrabold tracking-tight text-ink">
            Onboarding Guardian
          </h2>
        </Link>

        <nav className="hidden justify-self-center items-center gap-8 md:flex">
          {computedNav.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive ? "text-primary" : "text-ink/80",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 justify-self-end">
          {computedRightSlot}
        </div>
      </div>
    </header>
  );
}
