import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description: "View and download Laurence Andrei C. Dela Cruz's resume.",
};

export default function ResumePage() {
  return (
    <main className="section min-h-[70vh]">
      <h1 className="font-heading text-4xl font-semibold">Resume</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Resume viewer and download arrive in Phase 6.
      </p>
    </main>
  );
}
