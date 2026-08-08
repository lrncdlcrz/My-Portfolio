"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Reads the current wall-clock time in Asia/Manila regardless of where the
 * visitor is. Intl does the timezone maths so this stays correct without a
 * hardcoded UTC+8 offset.
 */
const manilaFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Manila",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: false,
});

function getManilaTime() {
  const parts = manilaFormatter.formatToParts(new Date());
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  // Intl emits hour "24" at midnight under hour12:false in some engines.
  return { h: get("hour") % 24, m: get("minute"), s: get("second") };
}

const round = (n: number) => Math.round(n * 1000) / 1000;

/** Point on a circle of radius `r`, measured clockwise from 12 o'clock. */
function polar(angleDeg: number, r: number, cx = 100, cy = 100) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: round(cx + Math.cos(rad) * r), y: round(cy + Math.sin(rad) * r) };
}

export function AnalogClock({ className }: { className?: string }) {
  // Null until mounted so the server and client markup match; the clock is a
  // flourish, so it simply is not painted until the browser knows the time.
  const [time, setTime] = useState<{ h: number; m: number; s: number } | null>(null);

  useEffect(() => {
    setTime(getManilaTime());
    const id = window.setInterval(() => setTime(getManilaTime()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const secondAngle = time ? time.s * 6 : 0;
  const minuteAngle = time ? time.m * 6 + time.s * 0.1 : 0;
  const hourAngle = time ? (time.h % 12) * 30 + time.m * 0.5 : 0;

  return (
    <svg
      viewBox="0 0 200 200"
      className={cn("text-foreground", className)}
      role="img"
      aria-label={
        time
          ? `Analog clock showing ${String(time.h).padStart(2, "0")}:${String(time.m).padStart(2, "0")} in Batangas City, Philippines`
          : "Analog clock"
      }
    >
      {/* Bezel: a raised outer ring with a recessed dial sunk inside it. */}
      <circle cx="100" cy="100" r="97" fill="hsl(var(--muted))" />
      <circle
        cx="100"
        cy="100"
        r="97"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.14"
        strokeWidth="1"
      />
      <circle cx="100" cy="100" r="84" fill="hsl(var(--card))" />
      <circle
        cx="100"
        cy="100"
        r="84"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.1"
        strokeWidth="1"
      />

      {/* Standard 12-hour numerals on the bezel: 1 through 12. */}
      {Array.from({ length: 12 }, (_, i) => {
        const hour = i + 1; // 1 .. 12
        const p = polar(hour * 30, 90.5); // 360 / 12 degrees per hour
        return (
          <text
            key={hour}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="central"
            fill="currentColor"
            fillOpacity={hour % 3 === 0 ? 0.75 : 0.45}
            fontSize="9"
            fontWeight={hour % 3 === 0 ? 600 : 400}
            fontFamily="var(--font-space-grotesk), sans-serif"
          >
            {hour}
          </text>
        );
      })}

      {/* Minute ticks: fine hairlines around the dial edge. */}
      {Array.from({ length: 60 }, (_, i) => {
        if (i % 5 === 0) return null;
        const outer = polar(i * 6, 79);
        const inner = polar(i * 6, 75.5);
        return (
          <line
            key={`m${i}`}
            x1={inner.x}
            y1={inner.y}
            x2={outer.x}
            y2={outer.y}
            stroke="currentColor"
            strokeOpacity="0.22"
            strokeWidth="0.6"
          />
        );
      })}

      {/* Hour markers: long batons, heavier at 12/3/6/9. */}
      {Array.from({ length: 12 }, (_, i) => {
        const outer = polar(i * 30, 79);
        const inner = polar(i * 30, 62);
        const major = i % 3 === 0;
        return (
          <line
            key={`h${i}`}
            x1={inner.x}
            y1={inner.y}
            x2={outer.x}
            y2={outer.y}
            stroke="currentColor"
            strokeOpacity={major ? 0.95 : 0.6}
            strokeWidth={major ? 4.5 : 3}
            strokeLinecap="round"
          />
        );
      })}

      {time && (
        <>
          {/*
            Each hand runs from a short counterweight past the hub and stops
            well short of the markers, so the dial keeps breathing room rather
            than the hands running edge to edge.
          */}
          <g transform={`rotate(${hourAngle} 100 100)`}>
            <line
              x1="100"
              y1="110"
              x2="100"
              y2="48"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>
          <g transform={`rotate(${minuteAngle} 100 100)`}>
            <line
              x1="100"
              y1="114"
              x2="100"
              y2="32"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
          </g>
          <g transform={`rotate(${secondAngle} 100 100)`}>
            <line
              x1="100"
              y1="120"
              x2="100"
              y2="28"
              stroke="currentColor"
              strokeOpacity="0.45"
              strokeWidth="0.9"
              strokeLinecap="round"
            />
          </g>
        </>
      )}

      {/* Hub */}
      <circle cx="100" cy="100" r="5" fill="hsl(var(--card))" />
      <circle
        cx="100"
        cy="100"
        r="5"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.85"
        strokeWidth="1.6"
      />
      <circle cx="100" cy="100" r="1.4" fill="currentColor" />
    </svg>
  );
}

/** Live "3:42 PM" string for Asia/Manila, used in the identity card. */
export function ManilaTimeLabel() {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Manila",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(new Date());

    setLabel(format());
    const id = window.setInterval(() => setLabel(format()), 1000);
    return () => window.clearInterval(id);
  }, []);

  // suppressHydrationWarning: the server cannot know the client's render time.
  return <span suppressHydrationWarning>{label ?? "—"}</span>;
}
