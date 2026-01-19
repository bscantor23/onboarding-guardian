import { cn } from "@/lib/classnames";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type TextFieldProps = {
  id: string;
  label: string;
  placeholder?: string;
  type?: "text" | "password";
  value: string;
  onChange: (value: string) => void;
  icon: IconDefinition;
  error?: string;
  rightSlot?: React.ReactNode;
  autoComplete?: string;
};

export function TextField({
  id,
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  icon,
  error,
  rightSlot,
  autoComplete,
}: Readonly<TextFieldProps>) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between pb-2 px-1">
        <label htmlFor="{id}" className="text-sm font-semibold">
          {label}
        </label>
        {rightSlot}
      </div>

      <div className="relative">
        <input
          id={id}
          type={type}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "h-14 w-full rounded-lg border bg-[#f8fcfb] p-3.75 pr-12 text-base",
            "border-mintBorder placeholder:text-mintText/60",
            "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
            error && "border-red-400 focus:border-red-500 focus:ring-red-200",
          )}
        />

        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
          <FontAwesomeIcon icon={icon} />
        </span>
      </div>

      {error ? <p className="mt-2 px-1 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
