import { useEffect, useRef } from "react";

const COLORS = [
  "rgba(34,197,94,0.25)",
  "rgba(59,130,246,0.2)",
  "rgba(245,158,11,0.15)",
  "rgba(0,0,0,0.06)",
];

export default function Particles() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      const p = document.createElement("div");
      const size = 2 + Math.random() * 4;
      const x = Math.random() * 100;
      const dur = 8 + Math.random() * 12;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];

      Object.assign(p.style, {
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        left: `${x}%`,
        borderRadius: "50%",
        background: color,
        animation: `particleFloat ${dur}s linear`,
      });

      container.appendChild(p);
      setTimeout(() => p.remove(), dur * 1000);
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    />
  );
}
