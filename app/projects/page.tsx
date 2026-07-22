import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Featured work including Elder-Care Link, a QR-integrated emergency SMS and medical history system, and UB Universal Knowledge.",
};

export default function ProjectsPage() {
  return (
    <main className="section min-h-[70vh]">
      <h1 className="font-heading text-4xl font-semibold">Projects</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Elder-Care Link case study and full project gallery arrive in Phase 5.
      </p>
    </main>
  );
}
