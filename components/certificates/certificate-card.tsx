"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Certificate } from "@/types";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CertificateModal } from "@/components/certificates/certificate-modal";
import { scaleIn } from "@/animations/variants";

export function CertificateCard({ certificate }: { certificate: Certificate }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.button
          variants={scaleIn}
          whileHover={{ y: -6 }}
          data-cursor-hover
          className="glass-card group flex flex-col overflow-hidden text-left transition-shadow hover:shadow-glow"
        >
          <div className="relative aspect-square w-full overflow-hidden bg-white/5">
            <Image
              src={certificate.image}
              alt={certificate.title}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="p-5">
            <h3 className="font-heading text-sm font-semibold leading-snug">
              {certificate.title}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">{certificate.issuer}</p>
          </div>
        </motion.button>
      </DialogTrigger>
      <CertificateModal certificate={certificate} />
    </Dialog>
  );
}
