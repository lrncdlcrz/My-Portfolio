import type { Metadata } from "next";
import { CertificateGallery } from "@/components/certificates/certificate-gallery";

export const metadata: Metadata = {
  title: "Certificates",
  description:
    "AWS, IBM, and Cisco certifications earned across cloud computing, cybersecurity, and Linux fundamentals.",
  alternates: {
    canonical: "/certificates",
  },
};

export default function CertificatesPage() {
  return (
    <main>
      <CertificateGallery />
    </main>
  );
}
