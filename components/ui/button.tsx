"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-aurora-gradient text-white shadow-glow hover:shadow-glow-lg",
        outline:
          "glass text-foreground hover:border-primary/50 hover:bg-white/[0.08]",
        ghost: "text-foreground hover:bg-white/[0.06]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-7",
        sm: "h-10 px-5 text-sm",
        lg: "h-14 px-9 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  magnetic?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, magnetic = true, onClick, children, ...props }, forwardedRef) => {
    const innerRef = React.useRef<HTMLButtonElement | null>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 220, damping: 16, mass: 0.2 });
    const springY = useSpring(y, { stiffness: 220, damping: 16, mass: 0.2 });
    const [ripples, setRipples] = React.useState<{ id: number; x: number; y: number }[]>([]);

    const setRefs = React.useCallback(
      (node: HTMLButtonElement | null) => {
        innerRef.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      },
      [forwardedRef],
    );

    const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!magnetic || asChild) return;
      const el = innerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      x.set((event.clientX - (rect.left + rect.width / 2)) * 0.3);
      y.set((event.clientY - (rect.top + rect.height / 2)) * 0.3);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      const el = innerRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const id = Date.now();
        setRipples((prev) => [
          ...prev,
          { id, x: event.clientX - rect.left, y: event.clientY - rect.top },
        ]);
        window.setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== id));
        }, 650);
      }
      onClick?.(event);
    };

    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={setRefs}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <motion.button
        ref={setRefs}
        className={cn(buttonVariants({ variant, size, className }))}
        style={magnetic ? { x: springX, y: springY } : undefined}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        whileTap={{ scale: 0.96 }}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {children}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="pointer-events-none absolute h-2 w-2 animate-ping rounded-full bg-white/50"
            style={{ left: ripple.x - 4, top: ripple.y - 4 }}
          />
        ))}
      </motion.button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
