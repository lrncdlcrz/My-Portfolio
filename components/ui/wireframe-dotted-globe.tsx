"use client";

import { useEffect, useRef } from "react";
import { geoOrthographic, geoPath, geoGraticule } from "d3-geo";
import { useTheme } from "next-themes";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * Land dots are precomputed at build time (scripts produced
 * public/geo/land-dots.json from Natural Earth 110m) as a flat
 * [lng, lat, lng, lat, ...] array. Doing the point-in-polygon work here at
 * runtime cost ~110ms of blocked main thread and shipped a 237KB GeoJSON;
 * the precomputed file is 24KB and needs no computation at all.
 *
 * Module-level cache so several globes on one page share a single fetch.
 */
let dotsPromise: Promise<Float32Array> | null = null;

/**
 * Loads the dots and converts them straight to unit vectors on the sphere.
 *
 * Doing this once matters: rotating a precomputed vector is a handful of
 * multiplies, whereas calling `geoDistance` plus d3's projection per dot per
 * frame meant thousands of trig-heavy calls every frame on every globe, which
 * is what made the spin stutter.
 */
function loadDots(): Promise<Float32Array> {
  if (!dotsPromise) {
    dotsPromise = fetch("/geo/land-dots.json")
      .then((r) => r.json())
      .then((flat: number[]) => {
        const out = new Float32Array((flat.length / 2) * 3);
        for (let i = 0, o = 0; i < flat.length; i += 2, o += 3) {
          const lng = (flat[i] * Math.PI) / 180;
          const lat = (flat[i + 1] * Math.PI) / 180;
          const cosLat = Math.cos(lat);
          out[o] = cosLat * Math.sin(lng);
          out[o + 1] = Math.sin(lat);
          out[o + 2] = cosLat * Math.cos(lng);
        }
        return out;
      })
      .catch(() => new Float32Array(0));
  }
  return dotsPromise;
}

/** Unit vector for a lng/lat pair, matching the layout used for the dots. */
function toVector(lng: number, lat: number): [number, number, number] {
  const a = (lng * Math.PI) / 180;
  const b = (lat * Math.PI) / 180;
  const cosLat = Math.cos(b);
  return [cosLat * Math.sin(a), Math.sin(b), cosLat * Math.cos(a)];
}

export interface WireframeDottedGlobeProps {
  className?: string;
  /** Longitude/latitude the globe starts facing. */
  center?: [number, number];
  /** Optional pin, e.g. a home city. */
  marker?: { lng: number; lat: number; label?: string };
  /** Degrees of rotation per second. 0 disables auto-spin. */
  spinSpeed?: number;
  /** Fraction of the canvas the sphere fills. */
  fill?: number;
  showGraticule?: boolean;
  label?: string;
}

export function WireframeDottedGlobe({
  className,
  center = [0, 0],
  marker,
  spinSpeed = 6,
  fill = 0.86,
  showGraticule = true,
  label = "Interactive dotted globe. Drag, or use the arrow keys, to rotate it.",
}: WireframeDottedGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();

  // Primitives, not the `center`/`marker` objects themselves. Callers pass
  // those as inline literals, so their identity changes on every parent
  // render; depending on them re-ran this whole effect (and reset the spin)
  // many times a second, because the hero re-renders on each typing tick.
  const centerLng = center[0];
  const centerLat = center[1];
  const markerLng = marker?.lng;
  const markerLat = marker?.lat;

  // Orientation lives in a ref so it survives any effect re-run rather than
  // snapping back to the starting longitude.
  const rotationRef = useRef<{ lambda: number; phi: number } | null>(null);
  if (rotationRef.current === null) {
    rotationRef.current = { lambda: -centerLng, phi: centerLat };
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isDark = resolvedTheme !== "light";
    const ink = isDark ? "250,250,250" : "23,23,23";

    let width = 0;
    let height = 0;
    let radius = 0;
    let dots: Float32Array = new Float32Array(0);
    let disposed = false;

    const projection = geoOrthographic().clipAngle(90);
    const graticule = geoGraticule().step([20, 20]);
    const path = geoPath(projection, ctx);

    // Yaw is negated (centring longitude L needs yaw -L); pitch is not.
    // Seeded from the ref so a re-run resumes where the globe already was.
    const rotation = rotationRef.current!;
    let lambda = rotation.lambda;
    let phi = rotation.phi;
    let velLambda = 0;
    let velPhi = 0;
    let dragging = false;
    let pointerId: number | null = null;
    let lastX = 0;
    let lastY = 0;
    let lastFrame = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      if (!width || !height) return;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      radius = (Math.min(width, height) / 2) * fill;
      projection.scale(radius).translate([width / 2, height / 2]);
    };
    resize();

    const render = () => {
      if (!width || !height) return;
      // Persist orientation so it is not lost if the effect is torn down.
      rotation.lambda = lambda;
      rotation.phi = phi;
      // d3 centres the point (-λ, -φ); our own yaw/pitch use the opposite sign
      // for pitch, so the graticule is handed the converted pair.
      projection.rotate([lambda, -phi]);
      ctx.clearRect(0, 0, width, height);

      // Sphere: a soft interior wash plus a hairline limb.
      const cx = width / 2;
      const cy = height / 2;
      const wash = ctx.createRadialGradient(
        cx - radius * 0.25,
        cy - radius * 0.3,
        0,
        cx,
        cy,
        radius,
      );
      wash.addColorStop(0, `rgba(${ink},${isDark ? 0.07 : 0.05})`);
      wash.addColorStop(1, `rgba(${ink},0.012)`);
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = wash;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${ink},0.16)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      if (showGraticule) {
        ctx.beginPath();
        path(graticule());
        ctx.strokeStyle = `rgba(${ink},0.09)`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }

      // Rotation applied to the precomputed unit vectors: yaw about Y, then
      // pitch about X. A dot is on the near hemisphere when its rotated z is
      // positive, which is both cheaper and more correct than the reference's
      // on-canvas check that let far-side dots bleed through the front.
      const yaw = (lambda * Math.PI) / 180;
      const pitch = (phi * Math.PI) / 180;
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const cosP = Math.cos(pitch);
      const sinP = Math.sin(pitch);

      const projectVec = (vx: number, vy: number, vz: number) => {
        const x = vx * cosY + vz * sinY;
        const z1 = -vx * sinY + vz * cosY;
        const y = vy * cosP - z1 * sinP;
        const z = vy * sinP + z1 * cosP;
        return { sx: cx + x * radius, sy: cy - y * radius, z };
      };

      ctx.fillStyle = `rgb(${ink})`;
      for (let i = 0; i < dots.length; i += 3) {
        const p = projectVec(dots[i], dots[i + 1], dots[i + 2]);
        if (p.z <= 0) continue;
        // Fade and shrink toward the limb so the sphere reads as curved.
        ctx.globalAlpha = 0.25 + p.z * 0.6;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, 0.55 + p.z * 0.85, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (markerLng !== undefined && markerLat !== undefined) {
        const [mx, my, mz] = toVector(markerLng, markerLat);
        const p = projectVec(mx, my, mz);
        if (p.z > 0) {
          ctx.globalAlpha = Math.min(1, 0.35 + p.z);
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, radius * 0.055, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${ink},0.14)`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(p.sx, p.sy, radius * 0.055, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${ink},0.55)`;
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(p.sx, p.sy, Math.max(2.2, radius * 0.022), 0, Math.PI * 2);
          ctx.fillStyle = `rgb(${ink})`;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }
    };

    const tick = (now: number) => {
      const dt = lastFrame ? Math.min(64, now - lastFrame) : 16;
      lastFrame = now;

      if (!dragging) {
        lambda += velLambda;
        phi += velPhi;
        velLambda *= 0.92;
        velPhi *= 0.92;
        if (Math.abs(velLambda) < 0.002) velLambda = 0;
        if (Math.abs(velPhi) < 0.002) velPhi = 0;
        if (!reducedMotion && spinSpeed) lambda += (spinSpeed * dt) / 1000;
      }
      phi = Math.max(-90, Math.min(90, phi));
      render();
    };

    /* ---------------- interaction ---------------- */

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      pointerId = e.pointerId;
      lastX = e.clientX;
      lastY = e.clientY;
      velLambda = 0;
      velPhi = 0;
      canvas.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== pointerId) return;
      // Sensitivity scales with radius so a drag feels the same at any size.
      const k = 90 / radius;
      const dx = (e.clientX - lastX) * k;
      const dy = (e.clientY - lastY) * k;
      lastX = e.clientX;
      lastY = e.clientY;
      // Dragging down tips the globe so the northern hemisphere comes forward.
      lambda += dx;
      phi = Math.max(-90, Math.min(90, phi + dy));
      velLambda = dx;
      velPhi = dy;
      render();
    };

    const endDrag = (e: PointerEvent) => {
      if (e.pointerId !== pointerId) return;
      dragging = false;
      pointerId = null;
      if (reducedMotion) {
        velLambda = 0;
        velPhi = 0;
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const nudge = 8;
      if (e.key === "ArrowLeft") lambda -= nudge;
      else if (e.key === "ArrowRight") lambda += nudge;
      else if (e.key === "ArrowUp") phi = Math.max(-90, phi - nudge);
      else if (e.key === "ArrowDown") phi = Math.min(90, phi + nudge);
      else return;
      e.preventDefault();
      render();
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", endDrag);
    canvas.addEventListener("pointercancel", endDrag);
    canvas.addEventListener("keydown", onKeyDown);

    const ro = new ResizeObserver(() => {
      resize();
      render();
    });
    ro.observe(canvas);

    /* ---------------- loop ---------------- */

    let frame = 0;
    let running = false;
    const loop = (now: number) => {
      if (!running) return;
      tick(now);
      frame = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (reducedMotion) return;
        if (entry.isIntersecting && !running) {
          running = true;
          lastFrame = 0;
          frame = requestAnimationFrame(loop);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(frame);
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    loadDots().then((loaded) => {
      if (disposed) return;
      dots = loaded;
      render();
    });
    render();

    return () => {
      disposed = true;
      running = false;
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", endDrag);
      canvas.removeEventListener("pointercancel", endDrag);
      canvas.removeEventListener("keydown", onKeyDown);
    };
  }, [
    reducedMotion,
    resolvedTheme,
    centerLng,
    centerLat,
    markerLng,
    markerLat,
    spinSpeed,
    fill,
    showGraticule,
  ]);

  return (
    <canvas
      ref={canvasRef}
      tabIndex={0}
      role="img"
      aria-label={label}
      data-cursor-hover
      className={cn("h-full w-full touch-pan-y", className)}
    />
  );
}

export default WireframeDottedGlobe;
