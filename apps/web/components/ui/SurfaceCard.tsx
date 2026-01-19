import { cn } from "@/lib/classnames";

type SurfaceCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function SurfaceCard({
  children,
  className,
}: Readonly<SurfaceCardProps>) {
  return (
    <section
      className={cn(
        "w-full rounded-xl border border-mint bg-surface p-8 shadow-card",
        className,
      )}
    >
      {children}
    </section>
  );
}
