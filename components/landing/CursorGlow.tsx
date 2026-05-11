"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const glow = glowRef.current;
    if (!glow) return;

    let x = 0, y = 0, targetX = 0, targetY = 0, raf = 0;
    const onMouse = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) setVisible(true);
    };
    const animate = () => {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      glow.style.transform = `translate3d(${x - 280}px, ${y - 280}px, 0)`;
      raf = requestAnimationFrame(animate);
    };
    window.addEventListener("mousemove", onMouse, { passive: true });
    raf = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [mounted, visible]);

  if (!mounted) return null;
  return (
    <div
      ref={glowRef}
      className="cursor-glow hidden md:block"
      style={{
        left: 0,
        top: 0,
        opacity: visible ? 1 : 0,
        transform: "translate3d(-9999px, -9999px, 0)",
      }}
    />
  );
}
