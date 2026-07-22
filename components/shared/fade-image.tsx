"use client";

import { useRef, useState, useLayoutEffect } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

export function FadeImage({ className, onLoad, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Cached/instant images never fire onLoad because the browser considers
  // them already complete before React attaches the listener — check
  // synchronously on mount so those don't get stuck blurred forever.
  useLayoutEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    // eslint-disable-next-line jsx-a11y/alt-text -- `alt` is required by ImageProps and spread via {...props}
    <Image
      ref={imgRef}
      className={cn(
        "transition-all duration-700 ease-out",
        loaded ? "scale-100 opacity-100 blur-0" : "scale-[1.03] opacity-0 blur-md",
        className,
      )}
      onLoad={(event) => {
        setLoaded(true);
        onLoad?.(event);
      }}
      {...props}
    />
  );
}
