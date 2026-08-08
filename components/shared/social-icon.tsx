import Image from "next/image";
import { socialIconMap } from "@/lib/social-icons";
import { cn } from "@/lib/utils";

export function SocialIcon({ iconKey, className }: { iconKey: string; className?: string }) {
  const entry = socialIconMap[iconKey];
  if (!entry) return null;

  // Brand marks render grayscale by default and regain their color on hover or
  // keyboard focus of the surrounding group. See styles/globals.css.
  if (entry.kind === "image") {
    return (
      <span
        className={cn(
          "logo-desaturate relative block overflow-hidden rounded-full bg-white p-1",
          className,
        )}
      >
        <Image src={entry.src} alt="" fill sizes="40px" className="object-contain p-1" />
      </span>
    );
  }

  const isMonochrome = entry.color === "currentColor";
  return (
    <entry.Icon
      className={cn(className, "logo-desaturate", isMonochrome && "text-foreground")}
      style={isMonochrome ? undefined : { color: entry.color }}
    />
  );
}
