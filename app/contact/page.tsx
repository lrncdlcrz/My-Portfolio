import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Laurence Andrei C. Dela Cruz for freelance, remote, or internship opportunities.",
};

export default function ContactPage() {
  return (
    <main className="section min-h-[70vh]">
      <h1 className="font-heading text-4xl font-semibold">Contact</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Contact form arrives in Phase 6.
      </p>
    </main>
  );
}
