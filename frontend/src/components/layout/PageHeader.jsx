import { cn } from "@/lib/utils";

export function PageHeader({ title, description, actions, className }) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-4 mb-6 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div>
        <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--ink)]">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-[var(--ink-muted)] mt-1">{description}</p>
        )}
      </div>
      {actions && <div className="w-full shrink-0 sm:w-auto">{actions}</div>}
    </div>
  );
}
