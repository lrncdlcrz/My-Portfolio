"use client";

import { Github, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ComingSoonButton({ label }: { label: "GitHub" | "Live Demo" }) {
  const Icon = label === "GitHub" ? Github : Rocket;

  return (
    <Button variant="outline" disabled aria-disabled title="Not available yet" magnetic={false}>
      <Icon className="h-4 w-4" />
      {label} · Coming Soon
    </Button>
  );
}
