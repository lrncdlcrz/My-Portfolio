import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certificates",
  description:
    "AWS, IBM, and Cisco certifications earned across cloud computing, cybersecurity, and Linux fundamentals.",
};

export default function CertificatesPage() {
  return (
    <main className="section min-h-[70vh]">
      <h1 className="font-heading text-4xl font-semibold">Certificates</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Certificate gallery arrives in Phase 5.
      </p>
    </main>
  );
}
