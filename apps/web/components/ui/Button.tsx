import { cn } from "@/lib/classnames";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg font-bold transition-all disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "h-14 w-full bg-primary text-white shadow-primaryGlow hover:bg-[#00695c] focus:outline-none focus:ring-2 focus:ring-primary/20",
    secondary:
      "h-10 w-10 bg-mint text-ink hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20",
  };

  return (
    <button className={cn(base, variants[variant], className)} {...props} />
  );
}
