"use client";

import Image from "next/image";
import { Certificate } from "@/types";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function CertificateModal({ certificate }: { certificate: Certificate }) {
  return (
    <DialogContent className="max-w-lg">
      <div className="relative mx-auto aspect-square w-48 overflow-hidden rounded-2xl bg-white/5">
        <Image
          src={certificate.image}
          alt={certificate.title}
          fill
          sizes="192px"
          className="object-contain p-4"
        />
      </div>
      <DialogHeader className="text-center">
        <DialogTitle>{certificate.title}</DialogTitle>
        <DialogDescription>{certificate.issuer}</DialogDescription>
      </DialogHeader>
      <p className="text-center text-sm text-muted-foreground">{certificate.description}</p>
    </DialogContent>
  );
}
