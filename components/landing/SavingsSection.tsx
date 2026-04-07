"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import { motion, useInView } from "motion/react";

interface Particle {
  x: number;
  y: number;
  vy: number;
  size: number;
  caught: boolean;
  opacity: number;
}

function SavingsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(canvasRef, { once: false, margin: "-50px" });
  const particlesRef = useRef<Particle[]>([]);
  const savedRef = useRef(0);
  const [saved, setSaved] = useState(0);

  const spawnParticle = useCallback((w: number) => {
    particlesRef.current.push({
      x: 40 + ((particlesRef.current.length * 73.7) % (w - 80)),
      y: -5,
      vy: 0.8 + ((particlesRef.current.length * 3.3) % 1.2),
      size: 2 + ((particlesRef.current.length * 1.7) % 2),
      caught: false,
      opacity: 0.6 + ((particlesRef.current.length * 0.3) % 0.4),
    });
  }, []);

  const draw = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.clearRect(0, 0, w, h);
    const shieldY = h * 0.5;
    const ps = particlesRef.current;

    // Shield line — subtle
    const shieldGrad = ctx.createLinearGradient(0, shieldY, w, shieldY);
    shieldGrad.addColorStop(0, "transparent");
    shieldGrad.addColorStop(0.3, "rgba(16, 185, 129, 0.08)");
    shieldGrad.addColorStop(0.5, "rgba(16, 185, 129, 0.15)");
    shieldGrad.addColorStop(0.7, "rgba(16, 185, 129, 0.08)");
    shieldGrad.addColorStop(1, "transparent");
    ctx.fillStyle = shieldGrad;
    ctx.fillRect(0, shieldY - 1, w, 2);

    // Shield glow
    const glowGrad = ctx.createLinearGradient(0, shieldY - 20, 0, shieldY + 20);
    glowGrad.addColorStop(0, "transparent");
    glowGrad.addColorStop(0.5, "rgba(16, 185, 129, 0.03)");
    glowGrad.addColorStop(1, "transparent");
    ctx.fillStyle = glowGrad;
    ctx.fillRect(w * 0.15, shieldY - 20, w * 0.7, 40);

    // Tiny "PARRY" label at shield
    ctx.fillStyle = "rgba(16, 185, 129, 0.15)";
    ctx.font = "bold 8px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("PARRY", w / 2, shieldY - 6);

    // Update and draw particles
    for (let i = ps.length - 1; i >= 0; i--) {
      const p = ps[i];

      if (!p.caught) {
        // Falling — red
        p.y += p.vy;

        // Hit the shield?
        if (p.y >= shieldY) {
          p.caught = true;
          p.vy = -0.6 - ((i * 0.7) % 0.8); // bounce up
          savedRef.current += 1247; // each particle = ~$1,247
          setSaved(savedRef.current);

          // Shield flash at catch point
          const flash = ctx.createRadialGradient(p.x, shieldY, 0, p.x, shieldY, 15);
          flash.addColorStop(0, "rgba(16, 185, 129, 0.2)");
          flash.addColorStop(1, "rgba(16, 185, 129, 0)");
          ctx.fillStyle = flash;
          ctx.beginPath();
          ctx.arc(p.x, shieldY, 15, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw falling particle (red)
        if (!p.caught) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(239, 68, 68, ${p.opacity * 0.6})`;
          ctx.fill();

          // Small tail
          ctx.beginPath();
          ctx.arc(p.x, p.y - 4, p.size * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(239, 68, 68, ${p.opacity * 0.2})`;
          ctx.fill();
        }
      } else {
        // Caught — rising green
        p.y += p.vy;
        p.opacity -= 0.004;

        if (p.opacity <= 0 || p.y < -10) {
          ps.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${p.opacity * 0.8})`;
        ctx.fill();

        // Glow trail going up
        ctx.beginPath();
        ctx.arc(p.x, p.y + 4, p.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${p.opacity * 0.3})`;
        ctx.fill();
      }
    }

    // Spawn new particles
    if (ps.length < 60) {
      spawnParticle(w);
    }
  }, [spawnParticle]);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c || !isInView) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    savedRef.current = 0;
    setSaved(0);
    particlesRef.current = [];

    const resize = () => {
      c.width = c.offsetWidth * devicePixelRatio;
      c.height = c.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf: number;
    const animate = () => {
      draw(ctx, c.offsetWidth, c.offsetHeight);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [isInView, draw]);

  return (
    <div className="relative">
      <canvas ref={canvasRef} className="w-full h-[400px] md:h-[500px]" />

      {/* Savings counter overlay */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2 }}
        >
          <span className="text-3xl md:text-5xl font-black font-mono text-[var(--landing-emerald)]">
            ${saved.toLocaleString()}
          </span>
          <p className="text-xs text-[var(--landing-emerald)]/60 mt-1">recovered</p>
        </motion.div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs text-[var(--landing-red)]/40 font-mono"
        >
          value leaking ↓
        </motion.span>
      </div>
    </div>
  );
}

export default function SavingsSection() {
  return (
    <section className="relative py-16 md:py-24 px-6 overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black leading-tight text-center mb-2"
        >
          Money falls through the cracks.
          <br />
          <span className="shimmer-text">Parry catches it.</span>
        </motion.h2>

        <SavingsCanvas />
      </div>
    </section>
  );
}
