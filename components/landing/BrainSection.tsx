"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import { motion, useInView } from "motion/react";

const AGENTS = [
  { color: "#3b82f6", speed: 0.5, dist: 0.34 },
  { color: "#ef4444", speed: 0.4, dist: 0.38 },
  { color: "#10b981", speed: 0.45, dist: 0.32 },
  { color: "#8b5cf6", speed: 0.35, dist: 0.40 },
  { color: "#f59e0b", speed: 0.42, dist: 0.36 },
  { color: "#60a5fa", speed: 0.48, dist: 0.30 },
  { color: "#ec4899", speed: 0.38, dist: 0.42 },
  { color: "#14b8a6", speed: 0.52, dist: 0.35 },
];

function BrainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(canvasRef, { once: false, margin: "0px" });
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const [activated, setActivated] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const timers = AGENTS.map((_, i) =>
      setTimeout(() => setActivated(i + 1), 300 + i * 200)
    );
    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  const draw = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    timeRef.current += 16;
    const t = timeRef.current;
    const cx = w / 2;
    const cy = h / 2;
    const scale = Math.min(w, h);
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const tiltX = (mx - 0.5) * 0.12;
    const tiltY = (my - 0.5) * 0.08;

    ctx.clearRect(0, 0, w, h);

    // Subtle concentric orbit rings
    for (let r = 0; r < 4; r++) {
      const ringR = scale * (0.2 + r * 0.07);
      ctx.beginPath();
      ctx.ellipse(cx, cy, ringR, ringR * 0.8, tiltX * 0.5, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(59, 130, 246, ${0.025 - r * 0.005})`;
      ctx.lineWidth = 0.5;
      ctx.setLineDash([2, 6]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Central brain — clean geometric hexagon cluster
    const brainR = scale * 0.045;
    const brainPulse = 0.7 + Math.sin(t * 0.002) * 0.2;

    // Outer glow
    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, brainR * 5);
    glow.addColorStop(0, `rgba(59, 130, 246, ${0.05 * brainPulse})`);
    glow.addColorStop(0.5, `rgba(99, 102, 241, ${0.02 * brainPulse})`);
    glow.addColorStop(1, "transparent");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, brainR * 5, 0, Math.PI * 2);
    ctx.fill();

    // Hexagonal brain shape
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 - Math.PI / 6;
      const hx = cx + Math.cos(a) * brainR;
      const hy = cy + Math.sin(a) * brainR;
      i === 0 ? ctx.moveTo(hx, hy) : ctx.lineTo(hx, hy);
    }
    ctx.closePath();
    ctx.fillStyle = `rgba(59, 130, 246, ${0.08 * brainPulse})`;
    ctx.fill();
    ctx.strokeStyle = `rgba(99, 140, 255, ${0.25 * brainPulse})`;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Inner hexagon
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const hx = cx + Math.cos(a) * brainR * 0.5;
      const hy = cy + Math.sin(a) * brainR * 0.5;
      i === 0 ? ctx.moveTo(hx, hy) : ctx.lineTo(hx, hy);
    }
    ctx.closePath();
    ctx.strokeStyle = `rgba(99, 140, 255, ${0.15 * brainPulse})`;
    ctx.lineWidth = 0.5;
    ctx.stroke();

    // Neural connections inside brain
    for (let i = 0; i < 6; i++) {
      const a1 = (i / 6) * Math.PI * 2 - Math.PI / 6;
      const a2 = ((i + 2) / 6) * Math.PI * 2 - Math.PI / 6;
      const fire = Math.sin(t * 0.004 + i * 1.1);
      if (fire > 0.2) {
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a1) * brainR * 0.5, cy + Math.sin(a1) * brainR * 0.5);
        ctx.lineTo(cx + Math.cos(a2) * brainR * 0.5, cy + Math.sin(a2) * brainR * 0.5);
        ctx.strokeStyle = `rgba(140, 180, 255, ${(fire - 0.2) * 0.3})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }

    // Pulse ring from center
    const pulsePhase = (t * 0.001) % 2;
    if (pulsePhase < 1) {
      const pulseR = brainR + pulsePhase * scale * 0.15;
      ctx.beginPath();
      ctx.arc(cx, cy, pulseR, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(59, 130, 246, ${(1 - pulsePhase) * 0.06})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    // Agents
    const count = activated;
    AGENTS.forEach((agent, i) => {
      if (i >= count) return;

      const angle = (i / AGENTS.length) * Math.PI * 2 + t * 0.0008 * agent.speed;
      const orbitR = scale * agent.dist;
      const ax = cx + Math.cos(angle) * orbitR + tiltX * orbitR * 0.2;
      const ay = cy + Math.sin(angle) * orbitR * 0.75 + tiltY * orbitR * 0.15;
      const depth = 0.6 + Math.sin(angle) * 0.4;

      // Connection line — clean, thin
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(ax, ay);
      const lineGrad = ctx.createLinearGradient(cx, cy, ax, ay);
      lineGrad.addColorStop(0, `${agent.color}06`);
      lineGrad.addColorStop(0.5, `${agent.color}10`);
      lineGrad.addColorStop(1, `${agent.color}06`);
      ctx.strokeStyle = lineGrad;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Single energy packet
      const prog = ((t * 0.003 * agent.speed + i * 0.12) % 1);
      const epx = cx + (ax - cx) * prog;
      const epy = cy + (ay - cy) * prog;
      ctx.beginPath();
      ctx.arc(epx, epy, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = `${agent.color}60`;
      ctx.fill();

      // Agent — clean circle with subtle glow
      const orbR = (6 + depth * 4);

      // Soft glow
      const agGlow = ctx.createRadialGradient(ax, ay, 0, ax, ay, orbR * 3);
      agGlow.addColorStop(0, `${agent.color}0a`);
      agGlow.addColorStop(1, `${agent.color}00`);
      ctx.fillStyle = agGlow;
      ctx.beginPath();
      ctx.arc(ax, ay, orbR * 3, 0, Math.PI * 2);
      ctx.fill();

      // Body
      ctx.beginPath();
      ctx.arc(ax, ay, orbR, 0, Math.PI * 2);
      ctx.fillStyle = `${agent.color}20`;
      ctx.fill();
      ctx.strokeStyle = `${agent.color}35`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Core dot
      ctx.beginPath();
      ctx.arc(ax, ay, 2, 0, Math.PI * 2);
      ctx.fillStyle = `${agent.color}90`;
      ctx.fill();
    });

  }, [activated]);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c || !isInView) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      c.width = c.offsetWidth * devicePixelRatio;
      c.height = c.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      const r = c.getBoundingClientRect();
      mouseRef.current = { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
    };
    window.addEventListener("mousemove", onMouse);

    let raf: number;
    const animate = () => { draw(ctx, c.offsetWidth, c.offsetHeight); raf = requestAnimationFrame(animate); };
    raf = requestAnimationFrame(animate);

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("mousemove", onMouse); };
  }, [isInView, draw]);

  return <canvas ref={canvasRef} className="w-full h-full absolute inset-0" />;
}

export default function BrainSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <BrainCanvas />
      <div className="relative z-10 text-center pointer-events-none">
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight"
        >
          <span className="text-[var(--landing-text-primary)]">One reasoning engine.</span>
          <br />
          <span className="shimmer-text">Multiple agents.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg md:text-xl text-[var(--landing-text-secondary)] mt-4"
        >
          Managing your vendors while you sleep.
        </motion.p>
      </div>
    </section>
  );
}
