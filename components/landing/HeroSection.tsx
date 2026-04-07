"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Array<{
    x: number; y: number; vx: number; vy: number; size: number; opacity: number; color: string;
  }>>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const init = useCallback((w: number, h: number) => {
    const count = Math.min(50, Math.floor((w * h) / 25000));
    const colors = ["59,130,246", "139,92,246", "16,185,129"];
    particlesRef.current = Array.from({ length: count }, (_, i) => ({
      x: ((i * 137.5) % w), y: ((i * 89.3) % h),
      vx: (((i * 7.3) % 1) - 0.5) * 0.2, vy: (((i * 3.7) % 1) - 0.5) * 0.2,
      size: 0.5 + ((i * 1.3) % 1.5), opacity: 0.1 + ((i * 0.7) % 0.4),
      color: colors[i % colors.length],
    }));
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const resize = () => {
      c.width = c.offsetWidth * devicePixelRatio;
      c.height = c.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
      init(c.offsetWidth, c.offsetHeight);
    };
    resize();
    window.addEventListener("resize", resize);
    const onMouse = (e: MouseEvent) => {
      const r = c.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    c.addEventListener("mousemove", onMouse);
    let raf: number;
    const draw = () => {
      const w = c.offsetWidth, h = c.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      const ps = particlesRef.current, m = mouseRef.current;
      for (const p of ps) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        const dx = m.x - p.x, dy = m.y - p.y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 150) { p.x -= dx * (150 - d) / 150 * 0.015; p.y -= dy * (150 - d) / 150 * 0.015; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.opacity})`; ctx.fill();
      }
      for (let i = 0; i < ps.length; i++)
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x, dy = ps[i].y - ps[j].y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath(); ctx.moveTo(ps[i].x, ps[i].y); ctx.lineTo(ps[j].x, ps[j].y);
            ctx.strokeStyle = `rgba(59,130,246,${(1 - d / 120) * 0.08})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); c.removeEventListener("mousemove", onMouse); };
  }, [mounted, init]);

  if (!mounted) return null;
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />;
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      <ParticleField />

      <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)", animation: "landing-float 10s ease-in-out infinite" }} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)", animation: "landing-float 12s ease-in-out infinite 3s" }} />
      </motion.div>

      <motion.div style={{ y: contentY }} className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="mb-8">
          {["Stop", "Negotiating"].map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block mr-[0.25em] text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] font-black tracking-tight leading-[0.9]"
            >
              {word}
            </motion.span>
          ))}
          <br className="sm:hidden" />
          <motion.span
            initial={{ opacity: 0, y: 30, filter: "blur(10px)", scale: 0.95 }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block shimmer-text text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] font-black tracking-tight leading-[0.9]"
          >
            Blind.
          </motion.span>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg md:text-xl text-[var(--landing-text-secondary)] max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Your vendors are costing you more than you know.
          <br className="hidden md:block" />
          Parry sees the full picture.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <a
            href="mailto:yehonatan@parry-io.com"
            className="group relative inline-flex items-center gap-2 px-10 py-5 rounded-full text-white font-semibold text-lg transition-all active:scale-[0.97] overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)",
            }}
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            <span className="absolute inset-0 rounded-full glow-blue opacity-80 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 flex items-center gap-2">
              Book a Demo
              <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </span>
          </a>
        </motion.div>

      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown size={20} className="text-[var(--landing-text-tertiary)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
