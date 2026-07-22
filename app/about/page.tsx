import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "BS Information Technology student at the University of Batangas, building modern web applications and exploring cloud computing and cybersecurity.",
};

export default function AboutPage() {
  return (
    <main className="section min-h-[70vh]">
      <h1 className="font-heading text-4xl font-semibold">About</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Full story and skills grid arrive in Phase 4.
      </p>
    </main>
  );
}
