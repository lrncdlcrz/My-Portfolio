"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

type Vec3 = [number, number, number];

const VERTICES: Vec3[] = [
  [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
  [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
];

/** Faces wound counter-clockwise when seen from outside, for back-face culling. */
const FACES: { idx: [number, number, number, number]; normal: Vec3 }[] = [
  { idx: [0, 3, 2, 1], normal: [0, 0, -1] },
  { idx: [4, 5, 6, 7], normal: [0, 0, 1] },
  { idx: [0, 4, 7, 3], normal: [-1, 0, 0] },
  { idx: [1, 2, 6, 5], normal: [1, 0, 0] },
  { idx: [0, 1, 5, 4], normal: [0, -1, 0] },
  { idx: [3, 7, 6, 2], normal: [0, 1, 0] },
];

const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 0],
  [4, 5], [5, 6], [6, 7], [7, 4],
  [0, 4], [1, 5], [2, 6], [3, 7],
];

/** Direction the key light comes from, normalised. */
const LIGHT: Vec3 = [-0.45, 0.72, 0.53];

const AUTO_YAW = 0.0045;
const AUTO_PITCH = 0.0016;
const DRAG_SENSITIVITY = 0.009;
const FRICTION = 0.93;

export function InteractiveCube({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isDark = resolvedTheme !== "light";
    // Face shading runs between these two, so the cube reads as a lit solid
    // in both themes instead of a flat silhouette.
    const litL = isDark ? 236 : 40;
    const shadowL = isDark ? 26 : 205;
    const lineRGB = isDark ? "250,250,250" : "23,23,23";

    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    let yaw = 0.72;
    let pitch = -0.5;
    let velYaw = 0;
    let velPitch = 0;
    let dragging = false;
    let pointerId: number | null = null;
    let lastX = 0;
    let lastY = 0;

    const rotate = ([x, y, z]: Vec3): Vec3 => {
      const cy = Math.cos(yaw);
      const sy = Math.sin(yaw);
      const cp = Math.cos(pitch);
      const sp = Math.sin(pitch);
      const rx = x * cy - z * sy;
      const rz = x * sy + z * cy;
      const ry = y * cp - rz * sp;
      const rz2 = y * sp + rz * cp;
      return [rx, ry, rz2];
    };

    const render = () => {
      const size = Math.min(width, height) * 0.29;
      const cx = width / 2;
      const cy = height / 2;
      // Camera distance in cube half-widths. At 4.2 the near face was 1.6x the
      // far one, which read as a truncated pyramid rather than a cube; 9 keeps
      // a believable amount of perspective without the distortion.
      const camera = 9;

      const projected = VERTICES.map((v) => {
        const [x, y, z] = rotate(v);
        const scale = camera / (camera - z);
        return { x: cx + x * size * scale, y: cy - y * size * scale, z };
      });

      ctx.clearRect(0, 0, width, height);

      // Contact shadow, so the cube sits in the card rather than floating.
      const shadow = ctx.createRadialGradient(cx, cy + size * 1.5, 0, cx, cy + size * 1.5, size * 1.8);
      shadow.addColorStop(0, `rgba(${lineRGB},${isDark ? 0.14 : 0.1})`);
      shadow.addColorStop(1, `rgba(${lineRGB},0)`);
      ctx.fillStyle = shadow;
      ctx.fillRect(0, 0, width, height);

      // Painter's algorithm: draw faces back to front, culling the ones
      // pointing away from the camera.
      const visible = FACES.map((face) => {
        const n = rotate(face.normal);
        const depth =
          face.idx.reduce((sum, i) => sum + projected[i].z, 0) / face.idx.length;
        return { face, n, depth };
      })
        .filter(({ n }) => n[2] > 0)
        .sort((a, b) => a.depth - b.depth);

      for (const { face, n } of visible) {
        // Lambertian term against the key light, clamped to keep faces legible.
        const lambert = Math.max(
          0,
          n[0] * LIGHT[0] + n[1] * LIGHT[1] + n[2] * LIGHT[2],
        );
        const shade = 0.22 + lambert * 0.78;
        const level = Math.round(shadowL + (litL - shadowL) * shade);

        ctx.beginPath();
        face.idx.forEach((i, k) => {
          const p = projected[i];
          if (k === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.closePath();
        ctx.fillStyle = `rgb(${level},${level},${level})`;
        ctx.fill();
      }

      // Edge wireframe over the solid, for definition.
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${lineRGB},${isDark ? 0.32 : 0.24})`;
      for (const [a, b] of EDGES) {
        const p1 = projected[a];
        const p2 = projected[b];
        if (p1.z < -0.4 && p2.z < -0.4) continue; // hidden back edges
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    };

    const step = () => {
      if (!dragging) {
        yaw += velYaw;
        pitch += velPitch;
        velYaw *= FRICTION;
        velPitch *= FRICTION;
        if (Math.abs(velYaw) < 0.00003) velYaw = 0;
        if (Math.abs(velPitch) < 0.00003) velPitch = 0;
        if (!reducedMotion) {
          yaw += AUTO_YAW;
          pitch = -0.5 + Math.sin(Date.now() * 0.00035) * AUTO_PITCH * 60;
        }
      }
      pitch = Math.max(-1.2, Math.min(1.2, pitch));
      render();
    };

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      pointerId = e.pointerId;
      lastX = e.clientX;
      lastY = e.clientY;
      velYaw = 0;
      velPitch = 0;
      canvas.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== pointerId) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      yaw += dx * DRAG_SENSITIVITY;
      pitch = Math.max(-1.2, Math.min(1.2, pitch + dy * DRAG_SENSITIVITY));
      velYaw = dx * DRAG_SENSITIVITY;
      velPitch = dy * DRAG_SENSITIVITY;
      render();
    };

    const endDrag = (e: PointerEvent) => {
      if (e.pointerId !== pointerId) return;
      dragging = false;
      pointerId = null;
      if (reducedMotion) {
        velYaw = 0;
        velPitch = 0;
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const nudge = 0.16;
      if (e.key === "ArrowLeft") yaw -= nudge;
      else if (e.key === "ArrowRight") yaw += nudge;
      else if (e.key === "ArrowUp") pitch = Math.max(-1.2, pitch - nudge);
      else if (e.key === "ArrowDown") pitch = Math.min(1.2, pitch + nudge);
      else return;
      e.preventDefault();
      render();
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", endDrag);
    canvas.addEventListener("pointercancel", endDrag);
    canvas.addEventListener("keydown", onKeyDown);
    const onResize = () => {
      resize();
      render();
    };
    window.addEventListener("resize", onResize);

    let frame = 0;
    let running = false;
    const loop = () => {
      if (!running) return;
      step();
      frame = requestAnimationFrame(loop);
    };

    const cleanup = () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", endDrag);
      canvas.removeEventListener("pointercancel", endDrag);
      canvas.removeEventListener("keydown", onKeyDown);
    };

    if (reducedMotion) {
      render();
      return cleanup;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          frame = requestAnimationFrame(loop);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(frame);
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    return () => {
      io.disconnect();
      cleanup();
    };
  }, [reducedMotion, resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      tabIndex={0}
      role="img"
      aria-label="Interactive 3D cube. Drag, or use the arrow keys, to rotate it."
      data-cursor-hover
      className={cn("h-full w-full touch-pan-y", className)}
    />
  );
}
