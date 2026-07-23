import Image from "next/image";
import { socialIconMap } from "@/lib/social-icons";
import { cn } from "@/lib/utils";

export function SocialIcon({ iconKey, className }: { iconKey: string; className?: string }) {
  const entry = socialIconMap[iconKey];
  if (!entry) return null;

  if (entry.kind === "image") {
    return (
      <span className={cn("relative block overflow-hidden rounded-full bg-white p-1", className)}>
        <Image src={entry.src} alt="" fill className="object-contain p-1" />
      </span>
    );
  }

  const isMonochrome = entry.color === "currentColor";
  return (
    <entry.Icon
      className={cn(className, isMonochrome && "text-foreground")}
      style={isMonochrome ? undefined : { color: entry.color }}
    />
  );
}
