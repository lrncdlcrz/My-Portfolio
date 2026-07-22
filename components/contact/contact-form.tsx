"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  CheckCircle2,
  AlertCircle,
  Send,
  User,
  Mail,
  Tag,
  MessageSquare,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/constants/site";

type Status = "idle" | "submitting" | "success" | "error" | "unconfigured";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

function FieldLabel({ htmlFor, icon: Icon, children }: {
  htmlFor: string;
  icon: typeof User;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground"
    >
      <Icon className="h-3.5 w-3.5" />
      {children}
    </label>
  );
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus("unconfigured");
      return;
    }

    if (!formRef.current) return;

    const data = new FormData(formRef.current);

    // Honeypot: a field real visitors never see or fill, but simple bots
    // that auto-fill every input will. If it has a value, silently pretend
    // to succeed instead of actually sending anything.
    if (data.get("company")) {
      setStatus("success");
      formRef.current.reset();
      return;
    }

    setStatus("submitting");
    try {
      const templateParams = {
        name: data.get("name"),
        email: data.get("email"),
        title: data.get("title"),
        message: data.get("message"),
        time: new Date().toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        }),
      };
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, {
        publicKey: PUBLIC_KEY,
      });
      setStatus("success");
      formRef.current.reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="glass-card flex flex-col items-center gap-3 p-10 text-center"
      >
        <motion.span
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 300, damping: 15 }}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary shadow-glow"
        >
          <CheckCircle2 className="h-8 w-8" />
        </motion.span>
        <motion.h3
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="font-heading text-xl font-semibold"
        >
          Message sent!
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.4 }}
          className="text-muted-foreground"
        >
          Thanks for reaching out. I&apos;ll get back to you as soon as I can.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.46, duration: 0.4 }}
        >
          <Button variant="outline" onClick={() => setStatus("idle")} className="mt-2">
            Send Another Message
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="glass-card space-y-6 p-8">
      <div className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="name" icon={User}>
            Your Name
          </FieldLabel>
          <Input id="name" name="name" placeholder="Jane Doe" required />
        </div>
        <div>
          <FieldLabel htmlFor="email" icon={Mail}>
            Your Email
          </FieldLabel>
          <Input id="email" name="email" type="email" placeholder="jane@email.com" required />
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="title" icon={Tag}>
          Subject
        </FieldLabel>
        <Input id="title" name="title" placeholder="Let's work together" required />
      </div>

      <div>
        <FieldLabel htmlFor="message" icon={MessageSquare}>
          Message
        </FieldLabel>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell me a bit about your project..."
          required
          rows={5}
        />
      </div>

      <AnimatePresence mode="wait">
        {status === "unconfigured" && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            The contact form isn&apos;t configured yet. Please email me directly at{" "}
            <a href={`mailto:${siteConfig.email}`} className="underline">
              {siteConfig.email}
            </a>
            .
          </motion.p>
        )}
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            Something went wrong sending your message. Please try again or email me
            directly at{" "}
            <a href={`mailto:${siteConfig.email}`} className="underline">
              {siteConfig.email}
            </a>
            .
          </motion.p>
        )}
      </AnimatePresence>

      <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full">
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          <>
            Send Message <Send className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}
