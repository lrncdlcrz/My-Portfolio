import type { IconType } from "react-icons";
import { SiGithub, SiUpwork, SiFiverr } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";

export type SocialIconEntry =
  | { kind: "icon"; Icon: IconType; color: string }
  | { kind: "image"; src: string };

// GitHub is a monochrome brand mark (currentColor, inverts with theme).
// LinkedIn, Upwork, and Fiverr use their real, documented brand colors so
// visitors can recognize the platform at a glance. OnlineJobs.ph has no
// official icon in any major icon library, so it uses the real logo image
// the user provided instead of a fabricated or generic substitute.
export const socialIconMap: Record<string, SocialIconEntry> = {
  github: { kind: "icon", Icon: SiGithub, color: "currentColor" },
  linkedin: { kind: "icon", Icon: FaLinkedinIn, color: "#0A66C2" },
  upwork: { kind: "icon", Icon: SiUpwork, color: "#6FDA44" },
  fiverr: { kind: "icon", Icon: SiFiverr, color: "#1DBF73" },
  onlinejobs: { kind: "image", src: "/images/onlinejobs-logo.png" },
};
