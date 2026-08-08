import type { Metadata } from "next";
import { ResumeViewer } from "@/components/resume/resume-viewer";
import { ResumeHighlights } from "@/components/resume/resume-highlights";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export const metadata: Metadata = {
  title: "Resume",
  description: "View and download Laurence Andrei C. Dela Cruz's resume.",
  alternates: {
    canonical: "/resume",
  },
};

export default function ResumePage() {
  return (
    <main className="section">
      <ScrollReveal className="text-center">
        <p className="eyebrow">
          Curriculum Vitae
        </p>
        <h1 className="mx-auto mt-3 max-w-2xl font-heading text-4xl font-semibold sm:text-5xl">
          Resume
        </h1>
      </ScrollReveal>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <ResumeHighlights />
        <ResumeViewer />
      </div>
    </main>
  );
}
