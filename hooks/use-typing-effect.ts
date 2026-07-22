"use client";

import { useEffect, useState } from "react";

interface TypingEffectOptions {
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  disabled?: boolean;
}

export function useTypingEffect(words: readonly string[], options: TypingEffectOptions = {}) {
  const { typingSpeed = 70, deletingSpeed = 40, pauseDuration = 1800, disabled = false } = options;
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState(disabled ? words[0] : "");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

  useEffect(() => {
    if (disabled) {
      setText(words[0] ?? "");
      return;
    }

    const currentWord = words[wordIndex % words.length];
    let timeout: number;

    if (phase === "typing") {
      if (text.length < currentWord.length) {
        timeout = window.setTimeout(() => setText(currentWord.slice(0, text.length + 1)), typingSpeed);
      } else {
        timeout = window.setTimeout(() => setPhase("pausing"), pauseDuration);
      }
    } else if (phase === "pausing") {
      timeout = window.setTimeout(() => setPhase("deleting"), pauseDuration);
    } else {
      if (text.length > 0) {
        timeout = window.setTimeout(() => setText(currentWord.slice(0, text.length - 1)), deletingSpeed);
      } else {
        setWordIndex((prev) => (prev + 1) % words.length);
        setPhase("typing");
      }
    }

    return () => window.clearTimeout(timeout);
  }, [text, phase, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration, disabled]);

  return text;
}
