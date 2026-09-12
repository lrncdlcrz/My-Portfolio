import { ContactInfo } from "@/components/contact/contact-info";
import { ContactForm } from "@/components/contact/contact-form";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { fadeLeft } from "@/animations/variants";

/** Formerly the /contact page, moved over unchanged. */
export function ContactSection() {
  return (
    <div className="section">
      <div className="grid gap-8 lg:grid-cols-2">
        <ContactInfo />
        <ScrollReveal variants={fadeLeft}>
          <ContactForm />
        </ScrollReveal>
      </div>
    </div>
  );
}
