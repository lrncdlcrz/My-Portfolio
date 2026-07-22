"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/constants/site";

type Status = "idle" | "submitting" | "success" | "error" | "unconfigured";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

const fieldClass =
  "peer placeholder:opacity-0";
const labelClass =
  "pointer-events-none absolute left-4 top-4 text-sm text-muted-foreground transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-muted-foreground peer-focus:-top-2.5 peer-focus:left-3 peer-focus:bg-background peer-focus:px-1 peer-focus:text-xs peer-focus:text-primary -top-2.5 left-3 bg-background px-1 text-xs";

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

    setStatus("submitting");
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
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
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card flex flex-col items-center gap-3 p-10 text-center"
      >
        <CheckCircle2 className="h-12 w-12 text-primary" />
        <h3 className="font-heading text-xl font-semibold">Message sent!</h3>
        <p className="text-muted-foreground">
          Thanks for reaching out — I&apos;ll get back to you as soon as I can.
        </p>
        <Button variant="outline" onClick={() => setStatus("idle")} className="mt-2">
          Send Another Message
        </Button>
      </motion.div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="glass-card space-y-5 p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="relative">
          <Input
            id="from_name"
            name="from_name"
            placeholder=" "
            required
            className={fieldClass}
          />
          <label htmlFor="from_name" className={labelClass}>
            Your Name
          </label>
        </div>
        <div className="relative">
          <Input
            id="reply_to"
            name="reply_to"
            type="email"
            placeholder=" "
            required
            className={fieldClass}
          />
          <label htmlFor="reply_to" className={labelClass}>
            Your Email
          </label>
        </div>
      </div>

      <div className="relative">
        <Input id="subject" name="subject" placeholder=" " required className={fieldClass} />
        <label htmlFor="subject" className={labelClass}>
          Subject
        </label>
      </div>

      <div className="relative">
        <Textarea
          id="message"
          name="message"
          placeholder=" "
          required
          rows={5}
          className={fieldClass}
        />
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
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
            The contact form isn&apos;t configured yet — please email me directly at{" "}
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
