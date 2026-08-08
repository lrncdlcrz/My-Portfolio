import { FadeImage } from "@/components/shared/fade-image";
import { cn } from "@/lib/utils";

/**
 * Desktop browser chrome around a product screenshot. These are all desktop
 * web apps, so a browser frame reads truer than a phone frame.
 *
 * The `project-media` class drives the grayscale-to-color treatment defined in
 * styles/globals.css, which lifts on hover AND on keyboard focus.
 */
export function BrowserFrame({
  src,
  alt,
  label,
  className,
  sizes = "(min-width: 1024px) 560px, 100vw",
  priority = false,
}: {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <figure
      className={cn(
        "project-media overflow-hidden rounded-xl border border-border bg-card shadow-glass",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border bg-muted px-3 py-2">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/25" />
        </span>
        {label && (
          <span className="truncate rounded px-2 py-0.5 font-heading text-[10px] uppercase tracking-[0.18em] text-foreground/45">
            {label}
          </span>
        )}
      </div>
      <FadeImage
        src={src}
        alt={alt}
        width={1440}
        height={900}
        sizes={sizes}
        priority={priority}
        className="w-full"
      />
    </figure>
  );
}
