"use client";

import { useEffect, useRef } from "react";
import { BRAIN_POINTS } from "./brainPoints";

/* A quiet background for the stealth homepage: a brain drawn as points and
 * connections, with a few signals travelling along the links. Plain 2D
 * canvas, no WebGL and no network fetch. It renders one still frame under
 * prefers-reduced-motion and stops drawing while the tab is hidden. */

type Pulse = { from: number; to: number; t: number; speed: number };

const NEIGHBOURS = 3;
const LINK_REACH = 0.075; // in brain-width units
const PULSES = 26;

export default function BrainBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const n = BRAIN_POINTS.length / 3;
    const u = new Float32Array(n), v = new Float32Array(n), depth = new Float32Array(n), phase = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      u[i] = BRAIN_POINTS[i * 3];
      v[i] = BRAIN_POINTS[i * 3 + 1];
      depth[i] = BRAIN_POINTS[i * 3 + 2];
      phase[i] = (i * 2.399963) % (Math.PI * 2); // golden-angle spread, deterministic
    }
    // Normalise to the real bounds so the brain centres regardless of how it was baked.
    let u0 = Infinity, u1 = -Infinity, v0 = Infinity, v1 = -Infinity;
    for (let i = 0; i < n; i++) { u0 = Math.min(u0, u[i]); u1 = Math.max(u1, u[i]); v0 = Math.min(v0, v[i]); v1 = Math.max(v1, v[i]); }
    const span = u1 - u0;
    for (let i = 0; i < n; i++) { u[i] = (u[i] - u0) / span; v[i] = (v[i] - v0) / span; }
    const aspect = (v1 - v0) / span;

    // Links: each point to its nearest few neighbours, deduplicated.
    const links: [number, number][] = [];
    const adjacency: number[][] = Array.from({ length: n }, () => []);
    const seen = new Set<number>();
    for (let i = 0; i < n; i++) {
      const near: [number, number][] = [];
      for (let j = 0; j < n; j++) {
        if (i === j) continue;
        const d = Math.hypot(u[i] - u[j], v[i] - v[j]);
        if (d < LINK_REACH) near.push([j, d]);
      }
      near.sort((a, b) => a[1] - b[1]);
      for (const [j] of near.slice(0, NEIGHBOURS)) {
        const key = i < j ? i * n + j : j * n + i;
        if (seen.has(key)) continue;
        seen.add(key);
        links.push([i, j]);
        adjacency[i].push(j);
        adjacency[j].push(i);
      }
    }

    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
    const newPulse = (from = Math.floor(rnd() * n)): Pulse => {
      const nb = adjacency[from];
      const to = nb.length ? nb[Math.floor(rnd() * nb.length)] : from;
      return { from, to, t: 0, speed: 0.6 + rnd() * 0.9 };
    };
    const pulses: Pulse[] = Array.from({ length: PULSES }, () => ({ ...newPulse(), t: rnd() }));

    let width = 0, height = 0, size = 0, ox = 0, oy = 0;
    const x = new Float32Array(n), y = new Float32Array(n);
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      size = Math.min(width * (width < 700 ? 0.94 : 0.62), (height * 0.78) / aspect);
      ox = (width - size) / 2;
      oy = (height - size * aspect) / 2;
    };

    const draw = (time: number) => {
      const s = time / 1000;
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < n; i++) {
        x[i] = ox + (u[i] + Math.sin(s * 0.5 + phase[i]) * 0.0022) * size;
        y[i] = oy + (v[i] + Math.cos(s * 0.4 + phase[i]) * 0.0022) * size;
      }
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(110, 140, 255, 0.10)";
      ctx.beginPath();
      for (const [a, b] of links) {
        ctx.moveTo(x[a], y[a]);
        ctx.lineTo(x[b], y[b]);
      }
      ctx.stroke();
      for (let i = 0; i < n; i++) {
        const near = 0.55 + depth[i] * 1.2; // points on the near side of the cortex read brighter
        ctx.fillStyle = `rgba(150, 175, 255, ${Math.min(0.55, 0.16 + near * 0.28)})`;
        ctx.beginPath();
        ctx.arc(x[i], y[i], 0.8 + near * 0.7, 0, Math.PI * 2);
        ctx.fill();
      }
      for (const p of pulses) {
        const px = x[p.from] + (x[p.to] - x[p.from]) * p.t;
        const py = y[p.from] + (y[p.to] - y[p.from]) * p.t;
        const glow = ctx.createRadialGradient(px, py, 0, px, py, 7);
        glow.addColorStop(0, "rgba(120, 160, 255, 0.95)");
        glow.addColorStop(1, "rgba(60, 116, 255, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(px, py, 7, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, last = 0;
    const loop = (time: number) => {
      const dt = Math.min(0.05, (time - (last || time)) / 1000);
      last = time;
      for (let k = 0; k < pulses.length; k++) {
        const p = pulses[k];
        p.t += dt * p.speed;
        if (p.t >= 1) pulses[k] = newPulse(p.to); // signals hop on to a neighbour
      }
      draw(time);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      cancelAnimationFrame(raf);
      last = 0;
      if (reduced) draw(0);
      else raf = requestAnimationFrame(loop);
    };
    const onVisibility = () => (document.hidden ? cancelAnimationFrame(raf) : start());

    resize();
    start();
    const onResize = () => {
      resize();
      if (reduced) draw(0);
    };
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="brain-bg absolute inset-0 h-full w-full pointer-events-none" />;
}
