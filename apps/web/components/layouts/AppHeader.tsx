"use client";

import { cn } from "@/lib/classnames";
import { faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Button } from "../ui/Button";
import { usePathname } from "next/navigation";

type NavItem = Readonly<{ label: string; href: string; active?: boolean }>;

type AppHeaderProps = Readonly<{
  title?: string;
  nav?: readonly NavItem[];
  rightSlot?: React.ReactNode;
  className?: string;
}>;

export function AppHeader({
  title = "Onboarding Guardian",
  nav = [],
  rightSlot,
  className,
}: AppHeaderProps) {
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-mint bg-surface",
        className,
      )}
    >
      <div className="mx-auto grid h-16 w-full max-w-7xl grid-cols-3 items-center px-4 sm:px-6">
        <div className="flex items-center gap-3 justify-self-start">
          <div className="flex items-center justify-center rounded-lg bg-primary p-1.5 text-white">
            <FontAwesomeIcon icon={faShieldHalved} className="text-[20px]" />
          </div>
          <h2 className="text-lg font-extrabold tracking-tight text-ink">
            {title}
          </h2>
        </div>

        <nav className="hidden justify-self-center items-center gap-8 md:flex">
          {nav.map((item) => {
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
          {rightSlot ?? (
            <Link href="/login">
              <Button variant="secondary" className="w-auto px-4">
                Iniciar sesión
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
