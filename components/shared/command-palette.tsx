"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Home,
  User,
  FolderKanban,
  Award,
  FileText,
  Mail,
  SunMoon,
  Download,
  ShieldCheck,
  Scale,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { SocialIcon } from "@/components/shared/social-icon";
import { socialLinks } from "@/constants/site";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const handleOpenEvent = () => setOpen(true);
    window.addEventListener("open-command-palette", handleOpenEvent);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleOpenEvent);
    };
  }, []);

  const go = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router],
  );

  const openExternal = useCallback((href: string) => {
    setOpen(false);
    window.open(href, "_blank", "noopener,noreferrer");
  }, []);


  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => go("/")}>
            <Home className="h-4 w-4" /> Home
          </CommandItem>
          <CommandItem onSelect={() => go("/about")}>
            <User className="h-4 w-4" /> About
          </CommandItem>
          <CommandItem onSelect={() => go("/projects")}>
            <FolderKanban className="h-4 w-4" /> Projects
          </CommandItem>
          <CommandItem onSelect={() => go("/certificates")}>
            <Award className="h-4 w-4" /> Certificates
          </CommandItem>
          <CommandItem onSelect={() => go("/resume")}>
            <FileText className="h-4 w-4" /> Resume
          </CommandItem>
          <CommandItem onSelect={() => go("/contact")}>
            <Mail className="h-4 w-4" /> Contact
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={() => openExternal("/resume.pdf")}>
            <Download className="h-4 w-4" /> Download Resume
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setTheme(resolvedTheme === "dark" ? "light" : "dark");
              setOpen(false);
            }}
          >
            <SunMoon className="h-4 w-4" /> Toggle Theme
          </CommandItem>
        </CommandGroup>
        {/* Every profile in the shared config, not just GitHub and LinkedIn,
            so the palette matches what the footer already lists. */}
        <CommandGroup heading="Elsewhere">
          {socialLinks.map((social) => (
            <CommandItem
              key={social.href}
              value={`${social.label} profile link`}
              onSelect={() => openExternal(social.href)}
            >
              <SocialIcon iconKey={social.icon} className="h-4 w-4" />
              {social.label}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Legal">
          <CommandItem onSelect={() => go("/privacy")}>
            <ShieldCheck className="h-4 w-4" /> Privacy Policy
          </CommandItem>
          <CommandItem onSelect={() => go("/terms")}>
            <Scale className="h-4 w-4" /> Terms &amp; Conditions
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
