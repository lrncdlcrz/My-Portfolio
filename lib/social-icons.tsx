import type { IconType } from "react-icons";
import { SiGithub, SiUpwork, SiFiverr } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";
import { Globe, type LucideIcon } from "lucide-react";

export interface SocialIconEntry {
  Icon: IconType | LucideIcon;
  color: string;
}

// GitHub is a monochrome brand mark (currentColor, inverts with theme).
// LinkedIn, Upwork, and Fiverr use their real, documented brand colors so
// visitors can recognize the platform at a glance. OnlineJobs.ph has no
// official brand icon available, so it uses a neutral generic icon instead
// of a fabricated logo.
export const socialIconMap: Record<string, SocialIconEntry> = {
  github: { Icon: SiGithub, color: "currentColor" },
  linkedin: { Icon: FaLinkedinIn, color: "#0A66C2" },
  upwork: { Icon: SiUpwork, color: "#6FDA44" },
  fiverr: { Icon: SiFiverr, color: "#1DBF73" },
  onlinejobs: { Icon: Globe, color: "#94A3B8" },
};
