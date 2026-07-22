"use client";

import { motion } from "framer-motion";
import { pageTransition } from "@/animations/variants";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial="hidden" animate="show" variants={pageTransition}>
      {children}
    </motion.div>
  );
}
