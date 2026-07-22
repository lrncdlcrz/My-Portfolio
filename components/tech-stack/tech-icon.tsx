import { iconRegistry } from "@/lib/tech-icons";
import { cn } from "@/lib/utils";

export function TechIcon({ iconKey, className }: { iconKey: string; className?: string }) {
  const entry = iconRegistry[iconKey];
  if (!entry) return null;

  if (entry.kind === "badge") {
    return (
      <span
        className={cn(
          "flex items-center justify-center rounded-lg text-[10px] font-bold tracking-tight text-white",
          className,
        )}
        style={{ backgroundColor: entry.color }}
      >
        {entry.badgeLabel}
      </span>
    );
  }

  const Icon = entry.Icon;
  if (!Icon) return null;

  const isMonochrome = entry.color === "currentColor";

  return (
    <Icon
      className={cn(className, isMonochrome && "text-foreground")}
      style={isMonochrome ? undefined : { color: entry.color }}
    />
  );
}
