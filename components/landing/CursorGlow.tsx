"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const glow = glowRef.current;
    if (!glow) return;

    let x = 0, y = 0, targetX = 0, targetY = 0;
    const onMouse = (e: MouseEvent) => { targetX = e.clientX; targetY = e.clientY; };
    const animate = () => {
      x += (targetX - x) * 0.08;
      y += (targetY - y) * 0.08;
      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;
      requestAnimationFrame(animate);
    };
    window.addEventListener("mousemove", onMouse);
    requestAnimationFrame(animate);
    return () => window.removeEventListener("mousemove", onMouse);
  }, [mounted]);

  if (!mounted) return null;
  return <div ref={glowRef} className="cursor-glow hidden md:block" />;
}
