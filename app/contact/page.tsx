import type { Metadata } from "next";
import { ContactInfo } from "@/components/contact/contact-info";
import { ContactForm } from "@/components/contact/contact-form";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { fadeLeft } from "@/animations/variants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Laurence Andrei C. Dela Cruz for freelance, remote, or internship opportunities.",
};

export default function ContactPage() {
  return (
    <main className="section">
      <div className="grid gap-8 lg:grid-cols-2">
        <ContactInfo />
        <ScrollReveal variants={fadeLeft}>
          <ContactForm />
        </ScrollReveal>
      </div>
    </main>
  );
}
