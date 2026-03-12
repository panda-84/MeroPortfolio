import { useRef } from "react";
import ScrollReveal from "../shared/ScrollReveal";

const TEMPLATES = [
  { name: "Developer Dark", badge: "Popular", badgeColor: "#3b82f6", type: "dark" },
  { name: "Designer Clean", badge: "Minimal", badgeColor: "#c8553d", type: "light" },
  { name: "Photographer Moody", badge: "New", badgeColor: "#c4956a", type: "moody" },
];

function TiltCard({ children }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    ref.current.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${y}deg) translateY(-4px)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="rounded-3xl overflow-hidden border border-[#e8e7e3] bg-white cursor-pointer
                 transition-all duration-500"
      style={{ transformStyle: "preserve-3d", transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
    >
      {children}
    </div>
  );
}

export default function Templates() {
  return (
    <section id="templates" className="py-20 px-8">
      <ScrollReveal>
        <div className="text-center mb-14">
          <span className="section-tag">Templates</span>
          <h2 className="section-title">Styles for everyone</h2>
          <p className="text-[#5a5a55] max-w-[460px] mx-auto">
            Choose a base, then customize everything
          </p>
        </div>
      </ScrollReveal>

      <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {TEMPLATES.map((t, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <TiltCard>
              {/* Preview */}
              <div className="h-60 p-4">
                <div className="h-full rounded-xl p-4 flex flex-col" style={{
                  background: t.type === "dark" ? "#0d1117" : t.type === "light" ? "#faf8f5" : "#1a1412",
                  border: `1px solid ${t.type === "dark" ? "#30363d" : t.type === "light" ? "#e8e2da" : "#3a2e24"}`,
                }}>
                  {t.type === "dark" && (
                    <>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#58a6ff] to-[#388bfd]" />
                        <div>
                          <div className="text-[0.65rem] font-semibold text-[#c9d1d9]">Aarav Sharma</div>
                          <div className="text-[0.45rem] text-[#8b949e]">Full Stack Developer</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-1 flex-1">
                        {["#3fb950", "#58a6ff", "#f78166", "#d2a8ff"].map((c, j) => (
                          <div key={j} className="bg-[#161b22] rounded p-2" style={{ border: "0.5px solid #30363d" }}>
                            <div className="w-1.5 h-1.5 rounded-full mb-1.5" style={{ background: c }} />
                            <div className="h-[3px] bg-[#30363d] rounded mb-0.5" />
                            <div className="h-[3px] bg-[#30363d] rounded w-3/5" />
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  {t.type === "light" && (
                    <>
                      <div className="flex justify-between mb-3">
                        <div>
                          <div className="text-[0.7rem] font-bold text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', serif" }}>Sita Poudel</div>
                          <div className="text-[0.45rem] text-[#999] uppercase tracking-wider">UI/UX Designer</div>
                        </div>
                        <div className="w-[18px] h-[18px] rounded-full border-[1.5px] border-[#1a1a1a]" />
                      </div>
                      <div className="grid gap-1 flex-1" style={{ gridTemplateColumns: "1.5fr 1fr" }}>
                        <div className="rounded-md bg-gradient-to-br from-[#e8d5c4] to-[#dbc4ae]" />
                        <div className="rounded-md bg-gradient-to-br from-[#c4d4c8] to-[#a8bfae]" />
                        <div className="rounded-md h-[50px] bg-gradient-to-br from-[#d4c4d8] to-[#bfa8c4]" style={{ gridColumn: "span 2" }} />
                      </div>
                    </>
                  )}
                  {t.type === "moody" && (
                    <>
                      <div className="flex-1 rounded-md bg-gradient-to-br from-[#3a2e24] to-[#2a2018] mb-3 relative">
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl text-[rgba(255,200,150,0.2)]">◉</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-[0.6rem] font-semibold text-[#e8ddd4] tracking-wider" style={{ fontFamily: "'Cormorant Garamond', serif" }}>RAJAN THAPA</div>
                        <div className="flex gap-[3px]">
                          {[true, false, false, false].map((active, j) => (
                            <span key={j} className="inline-block w-4 h-0.5 rounded-sm" style={{ background: active ? "#c4956a" : "#4a3e34" }} />
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="px-4 py-3 flex justify-between items-center border-t border-[#f0efeb]">
                <h4 className="text-[0.88rem] font-semibold">{t.name}</h4>
                <span
                  className="text-[0.6rem] font-semibold px-2.5 py-1 rounded-md"
                  style={{ fontFamily: "'JetBrains Mono', monospace", background: `${t.badgeColor}12`, color: t.badgeColor }}
                >
                  {t.badge}
                </span>
              </div>
            </TiltCard>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
