import { useState, useEffect, useRef } from "react";
import { PORTFOLIOS } from "../../data/portfolios";
import IPhoneFrame from "../shared/IPhoneFrame";
import PhoneScreen from "../shared/PhoneScreen";
import ScrollReveal from "../shared/ScrollReveal";

const COUNT = PORTFOLIOS.length;
const ANGLE_STEP = 360 / COUNT;
const RADIUS = 320;

/* ═══ EXPANDED OVERLAY ═══ */
function ExpandedView({ portfolio, onClose }) {
  if (!portfolio) return null;
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[200] bg-black/60 flex items-center justify-center cursor-pointer animate-fade-in"
      style={{ backdropFilter: "blur(16px)" }}
    >
      <div onClick={(e) => e.stopPropagation()} className="cursor-default animate-scale-in">
        <IPhoneFrame scale={1.5}>
          <PhoneScreen portfolio={portfolio} scale={1.5} />
        </IPhoneFrame>
        <div className="text-center mt-4">
          <div className="font-bold text-white">{portfolio.name}</div>
          <div className="text-[0.78rem] text-white/50 mt-1">{portfolio.title}</div>
          <div className="text-[0.68rem] text-white/30 mt-2">Click outside to close</div>
        </div>
      </div>
    </div>
  );
}

/* ═══ MAIN CAROUSEL ═══ */
export default function PhoneCarousel() {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [velocity, setVelocity] = useState(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const animFrame = useRef(null);
  const didDrag = useRef(false);

  // Auto-play
  useEffect(() => {
    if (!autoPlay || isDragging || expanded) return;
    const iv = setInterval(() => setRotation((r) => r - 0.15), 16);
    return () => clearInterval(iv);
  }, [autoPlay, isDragging, expanded]);

  // Momentum
  useEffect(() => {
    if (isDragging || Math.abs(velocity) < 0.05) return;
    const decay = () => {
      setVelocity((v) => {
        const nv = v * 0.95;
        setRotation((r) => r + nv);
        if (Math.abs(nv) < 0.05) return 0;
        animFrame.current = requestAnimationFrame(decay);
        return nv;
      });
    };
    animFrame.current = requestAnimationFrame(decay);
    return () => cancelAnimationFrame(animFrame.current);
  }, [isDragging]);

  const onDown = (e) => {
    setIsDragging(true);
    setAutoPlay(false);
    didDrag.current = false;
    const x = e.clientX ?? e.touches?.[0]?.clientX;
    lastX.current = x;
    lastTime.current = Date.now();
    setVelocity(0);
    cancelAnimationFrame(animFrame.current);
  };

  const onMove = (e) => {
    if (!isDragging) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX;
    const dx = x - lastX.current;
    const dt = Date.now() - lastTime.current;
    if (Math.abs(dx) > 3) didDrag.current = true;
    setRotation((r) => r + dx * 0.3);
    setVelocity(dt > 0 ? (dx * 0.3) / Math.max(dt / 16, 1) : 0);
    lastX.current = x;
    lastTime.current = Date.now();
  };

  const onUp = () => {
    setIsDragging(false);
    setTimeout(() => setAutoPlay(true), 5000);
  };

  const getStyle = (i) => {
    const angle = (i * ANGLE_STEP + rotation) * (Math.PI / 180);
    const x = Math.sin(angle) * RADIUS;
    const z = Math.cos(angle) * RADIUS;
    const scale = 0.55 + ((z + RADIUS) / (2 * RADIUS)) * 0.5;
    const opacity = 0.35 + ((z + RADIUS) / (2 * RADIUS)) * 0.65;
    const blur = z < -RADIUS * 0.3 ? Math.abs(z + RADIUS * 0.3) / 80 : 0;

    return {
      position: "absolute", left: "50%", top: "50%",
      transform: `translate(-50%,-50%) translateX(${x}px) translateZ(${z}px) scale(${scale})`,
      zIndex: Math.round(z + RADIUS),
      opacity,
      filter: blur > 0 ? `blur(${blur}px)` : "none",
      transition: isDragging ? "none" : "transform 0.15s ease-out, opacity 0.3s",
      cursor: "pointer",
    };
  };

  const isPhoneFront = (i) => {
    const a = ((i * ANGLE_STEP + rotation) % 360 + 360) % 360;
    return a > 330 || a < 30;
  };

  return (
    <section className="py-20 overflow-hidden relative" id="showcase">
      {/* Header */}
      <ScrollReveal className="text-center mb-10 px-8">
        <span className="section-tag">Real Portfolios</span>
        <h2 className="section-title">Built by real people</h2>
        <p className="text-[#5a5a55] max-w-[420px] mx-auto">
          Drag to explore · Click to view · Built with MeroPortfolio
        </p>
      </ScrollReveal>

      {/* 3D Carousel */}
      <div
        className="w-full relative select-none"
        style={{ height: 520, perspective: 1200, cursor: isDragging ? "grabbing" : "grab" }}
        onMouseDown={onDown}
        onMouseMove={onMove}
        onMouseUp={onUp}
        onMouseLeave={() => isDragging && onUp()}
        onTouchStart={onDown}
        onTouchMove={onMove}
        onTouchEnd={onUp}
      >
        <div className="w-full h-full relative" style={{ transformStyle: "preserve-3d" }}>
          {PORTFOLIOS.map((p, i) => (
            <div
              key={p.id}
              style={getStyle(i)}
              onClick={() => !didDrag.current && setExpanded(p)}
            >
              {/* Shadow */}
              <div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2"
                style={{
                  width: 140, height: 20, borderRadius: "50%",
                  background: "radial-gradient(ellipse, rgba(0,0,0,0.12) 0%, transparent 70%)",
                  filter: "blur(4px)",
                }}
              />
              <IPhoneFrame scale={0.85}>
                <PhoneScreen portfolio={p} scale={0.72} />
              </IPhoneFrame>
              {/* Label */}
              <div
                className="text-center mt-3 transition-opacity duration-300"
                style={{ opacity: isPhoneFront(i) ? 1 : 0 }}
              >
                <div className="font-bold text-[0.82rem] text-[#141413]">{p.name}</div>
                <div className="text-[0.68rem] text-[#9a9a92]">{p.title}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Fade edges */}
        <div className="absolute top-0 left-0 bottom-0 w-[120px] bg-gradient-to-r from-[#fafaf8] to-transparent pointer-events-none z-50" />
        <div className="absolute top-0 right-0 bottom-0 w-[120px] bg-gradient-to-l from-[#fafaf8] to-transparent pointer-events-none z-50" />
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-1.5 mt-4">
        {PORTFOLIOS.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setAutoPlay(false);
              setRotation(-i * ANGLE_STEP);
              setTimeout(() => setAutoPlay(true), 4000);
            }}
            className="h-2 rounded-full border-none cursor-pointer transition-all duration-400"
            style={{
              width: isPhoneFront(i) ? 24 : 8,
              background: isPhoneFront(i) ? "#22c55e" : "#d4d4c8",
              transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        ))}
      </div>

      {/* Auto-play toggle */}
      <div className="text-center mt-3">
        <button
          onClick={() => setAutoPlay(!autoPlay)}
          className={`px-4 py-2 rounded-lg text-[0.72rem] font-semibold cursor-pointer transition-all duration-200 border ${
            autoPlay
              ? "bg-[rgba(34,197,94,0.06)] border-[rgba(34,197,94,0.2)] text-[#22c55e]"
              : "bg-transparent border-[#e8e7e3] text-[#9a9a92]"
          }`}
        >
          {autoPlay ? "⏸ Auto-rotating" : "▶ Auto-rotate"}
        </button>
      </div>

      {/* Expanded view */}
      <ExpandedView portfolio={expanded} onClose={() => setExpanded(null)} />
    </section>
  );
}
