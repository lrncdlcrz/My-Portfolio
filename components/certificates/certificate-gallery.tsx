"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { certificates } from "@/data/certificates";
import { CertificateCard } from "@/components/certificates/certificate-card";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { staggerContainer } from "@/animations/variants";

export function CertificateGallery() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return certificates;
    return certificates.filter(
      (cert) =>
        cert.title.toLowerCase().includes(q) || cert.issuer.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <section className="section">
      <ScrollReveal className="text-center">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">
          Verified Credentials
        </p>
        <h1 className="mx-auto mt-3 max-w-2xl font-heading text-4xl font-semibold sm:text-5xl">
          Certificates &amp; Badges
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Cloud, cybersecurity, and Linux credentials earned through AWS, IBM SkillsBuild,
          and Cisco Networking Academy.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.1} className="mx-auto mt-8 max-w-sm">
        <div className="glass flex items-center gap-2 rounded-full px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search certificates..."
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
      </ScrollReveal>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-muted-foreground">
          No certificates match &ldquo;{query}&rdquo;.
        </p>
      ) : (
        <motion.div
          key={query}
          variants={staggerContainer(0.07)}
          initial="hidden"
          animate="show"
          className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4"
        >
          {filtered.map((certificate) => (
            <CertificateCard key={certificate.id} certificate={certificate} />
          ))}
        </motion.div>
      )}
    </section>
  );
}
