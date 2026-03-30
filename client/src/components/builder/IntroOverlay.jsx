import { useState, useEffect } from "react";

/* ═══ BACKGROUND EFFECTS ═══ */
function BgParticles({ color }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 2 + Math.random() * 4,
            height: 2 + Math.random() * 4,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: color,
            opacity: 0.2 + Math.random() * 0.3,
            animation: `introFloat ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
      <style>{`@keyframes introFloat{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-20px) scale(1.5)}}`}</style>
    </div>
  );
}

function BgStars({ color }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 1 + Math.random() * 2,
            height: 1 + Math.random() * 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: color,
            animation: `twinkle ${1 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
      <style>{`@keyframes twinkle{0%,100%{opacity:0.2}50%{opacity:1}}`}</style>
    </div>
  );
}

function BgGradient({ color }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute w-[300px] h-[300px] rounded-full top-[-100px] right-[-50px]" style={{ background: `radial-gradient(circle, ${color}25 0%, transparent 70%)`, animation: "meshMove 8s ease-in-out infinite" }} />
      <div className="absolute w-[250px] h-[250px] rounded-full bottom-[-80px] left-[-50px]" style={{ background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`, animation: "meshMove 10s ease-in-out infinite reverse" }} />
      <style>{`@keyframes meshMove{0%,100%{transform:translate(0,0)}50%{transform:translate(30px,-30px)}}`}</style>
    </div>
  );
}

function BgWaves({ color }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className="absolute w-[200%] left-[-50%]"
          style={{
            height: 30, bottom: `${15 + i * 20}%`,
            borderRadius: "40%",
            border: `1px solid ${color}${20 + i * 10}`,
            animation: `waveIntro ${3 + i}s ease-in-out infinite`,
          }}
        />
      ))}
      <style>{`@keyframes waveIntro{0%,100%{transform:translateX(-10%) rotate(0deg)}50%{transform:translateX(10%) rotate(2deg)}}`}</style>
    </div>
  );
}

function BgAurora({ color }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute w-[120%] h-[40%] top-[20%] left-[-10%]"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}20, #a78bfa20, ${color}10, transparent)`,
          filter: "blur(30px)",
          animation: "auroraIntro 4s ease-in-out infinite",
        }}
      />
      <style>{`@keyframes auroraIntro{0%,100%{transform:translateX(-5%) scaleY(1)}50%{transform:translateX(5%) scaleY(1.3)}}`}</style>
    </div>
  );
}

function BgMatrix({ color }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none flex justify-around">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="text-[0.5rem] leading-tight"
          style={{
            color: `${color}30`,
            fontFamily: "monospace",
            animation: `matrixDrop ${2 + Math.random() * 2}s linear infinite`,
            animationDelay: `${Math.random()}s`,
          }}
        >
          {Array.from({ length: 12 }).map((_, j) => (
            <div key={j}>{String.fromCharCode(0x30A0 + Math.random() * 96)}</div>
          ))}
        </div>
      ))}
      <style>{`@keyframes matrixDrop{0%{transform:translateY(-100%)}100%{transform:translateY(100%)}}`}</style>
    </div>
  );
}

function BgDots({ color }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: 48 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-[3px] h-[3px] rounded-full"
          style={{
            background: `${color}20`,
            left: `${(i % 8) * 13 + 4}%`,
            top: `${Math.floor(i / 8) * 17 + 5}%`,
          }}
        />
      ))}
    </div>
  );
}

/* ═══ TEXT ANIMATIONS ═══ */
function AnimText({ text, type, color, phase }) {
  if (!text) return null;

  if (type === "minimal" || type === "spotlight") {
    return (
      <span style={{
        opacity: phase >= 1 ? 1 : 0,
        transform: phase >= 1 ? "translateY(0)" : "translateY(20px)",
        transition: "all 1s cubic-bezier(.16,1,.3,1)",
        display: "inline-block",
      }}>{text}</span>
    );
  }

  if (type === "typewriter") {
    const [chars, setChars] = useState(0);
    useEffect(() => {
      if (phase < 1) { setChars(0); return; }
      const iv = setInterval(() => setChars(c => { if (c >= text.length) { clearInterval(iv); return c; } return c + 1; }), 60);
      return () => clearInterval(iv);
    }, [phase, text]);
    return (
      <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        {text.slice(0, chars)}
        <span style={{ borderRight: `2px solid ${color}`, animation: "blink 0.7s step-end infinite", marginLeft: 2 }}>&nbsp;</span>
        <style>{`@keyframes blink{50%{opacity:0}}`}</style>
      </span>
    );
  }

  if (type === "split") {
    const mid = Math.ceil(text.length / 2);
    return (
      <span style={{ display: "inline-flex" }}>
        <span style={{ transform: phase >= 1 ? "translateX(0)" : "translateX(-40px)", opacity: phase >= 1 ? 1 : 0, transition: "all 0.8s cubic-bezier(.16,1,.3,1)", display: "inline-block" }}>{text.slice(0, mid)}</span>
        <span style={{ transform: phase >= 1 ? "translateX(0)" : "translateX(40px)", opacity: phase >= 1 ? 1 : 0, transition: "all 0.8s cubic-bezier(.16,1,.3,1) 0.1s", display: "inline-block" }}>{text.slice(mid)}</span>
      </span>
    );
  }

  if (type === "glitch") {
    return (
      <span style={{ display: "inline-block", animation: phase >= 1 ? "glitchIntro 0.3s infinite" : "none" }}>
        {text}
        <style>{`@keyframes glitchIntro{0%{transform:translate(0)}20%{transform:translate(-3px,3px)}40%{transform:translate(3px,-3px)}60%{transform:translate(-2px,-2px)}80%{transform:translate(2px,2px)}100%{transform:translate(0)}}`}</style>
      </span>
    );
  }

  if (type === "blur") {
    return (
      <span style={{
        display: "inline-block",
        filter: phase >= 1 ? "blur(0)" : "blur(16px)",
        opacity: phase >= 1 ? 1 : 0.2,
        transform: phase >= 1 ? "scale(1)" : "scale(1.1)",
        transition: "all 1.2s cubic-bezier(.16,1,.3,1)",
      }}>{text}</span>
    );
  }

  if (type === "wave") {
    return (
      <span style={{ display: "inline-flex" }}>
        {text.split("").map((ch, i) => (
          <span key={i} style={{
            display: "inline-block",
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? "translateY(0)" : "translateY(20px)",
            transition: `all 0.5s cubic-bezier(.16,1,.3,1) ${i * 0.05}s`,
          }}>{ch === " " ? "\u00A0" : ch}</span>
        ))}
      </span>
    );
  }

  if (type === "particles") {
    return (
      <span style={{
        display: "inline-block",
        opacity: phase >= 1 ? 1 : 0,
        transform: phase >= 1 ? "scale(1)" : "scale(0.5)",
        transition: "all 0.8s cubic-bezier(.16,1,.3,1)",
        filter: phase >= 1 ? "none" : "blur(8px)",
      }}>{text}</span>
    );
  }

  return <span>{text}</span>;
}

/* ═══ TYPING TAGLINE ═══ */
function TypingTagline({ text, color, start }) {
  const [chars, setChars] = useState(0);
  useEffect(() => {
    if (!start || !text) { setChars(0); return; }
    const iv = setInterval(() => setChars(c => { if (c >= text.length) { clearInterval(iv); return c; } return c + 1; }), 40);
    return () => clearInterval(iv);
  }, [start, text]);

  if (!text) return null;
  return (
    <span style={{ color, fontSize: "0.7rem", fontStyle: "italic" }}>
      {text.slice(0, chars)}
      {chars < text.length && <span style={{ borderRight: `1.5px solid ${color}`, animation: "blink 0.7s step-end infinite", marginLeft: 1 }}>&nbsp;</span>}
    </span>
  );
}

/* ═══ MAIN INTRO OVERLAY ═══ */
export default function IntroOverlay({ data, config, onDone }) {
  const [phase, setPhase] = useState(0);
  const [fading, setFading] = useState(false);

  const intro = config.intro_config || {
    template: "minimal", welcomeText: "", tagline: "",
    showName: true, showTitle: true, showPhoto: false,
    bgAnimation: "gradient", duration: 3, scrollArrow: true, typingTagline: true,
  };

  const c = config.palette;

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 200);
    const t2 = setTimeout(() => setPhase(2), 800);
    const fadeTime = intro.duration * 1000;
    const t3 = setTimeout(() => setFading(true), fadeTime - 500);
    const t4 = setTimeout(() => onDone?.(), fadeTime);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [intro.duration]);

  const bgMap = {
    gradient: <BgGradient color={c.ac} />,
    particles: <BgParticles color={c.ac} />,
    stars: <BgStars color={c.ac} />,
    waves: <BgWaves color={c.ac} />,
    aurora: <BgAurora color={c.ac} />,
    matrix: <BgMatrix color={c.ac} />,
    dots: <BgDots color={c.ac} />,
  };

  const avR = config.avatarShape === "circle" ? "50%" : config.avatarShape === "square" ? 4 : 14;

  return (
    <div
      className="absolute inset-0 z-50 flex flex-col items-center justify-center text-center"
      style={{
        background: c.bg,
        opacity: fading ? 0 : 1,
        transition: "opacity 0.5s ease-out",
        overflow: "hidden",
      }}
    >
      {/* Background effect */}
      {bgMap[intro.bgAnimation]}

      {/* Grain */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }} />

      {/* Spotlight effect */}
      {intro.template === "spotlight" && (
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: phase >= 1 ? 300 : 0,
            height: phase >= 1 ? 300 : 0,
            background: `radial-gradient(circle, ${c.ac}15 0%, transparent 70%)`,
            transition: "all 1.5s cubic-bezier(.16,1,.3,1)",
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 px-6 max-w-[280px]">

        {/* Photo */}
        {intro.showPhoto && data.photo && (
          <div style={{
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? "scale(1)" : "scale(0.8)",
            transition: "all 0.6s cubic-bezier(.16,1,.3,1)",
            marginBottom: 12,
          }}>
            <img
              src={data.photo} alt=""
              style={{
                width: 56, height: 56, borderRadius: avR, objectFit: "cover",
                border: `2px solid ${c.bd}`, margin: "0 auto", display: "block",
              }}
            />
          </div>
        )}

        {/* Welcome text OR Name */}
        <div style={{ fontFamily: config.hFont, fontWeight: 700, fontSize: "1.3rem", letterSpacing: "-0.5px", color: c.tx, marginBottom: 4, lineHeight: 1.2 }}>
          <AnimText
            text={intro.welcomeText || (intro.showName ? (data.name || "Your Name") : "")}
            type={intro.template}
            color={c.ac}
            phase={phase}
          />
        </div>

        {/* Title */}
        {intro.showTitle && data.title && (
          <div style={{
            fontSize: "0.78rem", color: c.mu, marginBottom: 6,
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? "translateY(0)" : "translateY(8px)",
            transition: "all 0.6s cubic-bezier(.16,1,.3,1) 0.2s",
          }}>
            {data.title}
          </div>
        )}

        {/* Tagline with typing effect */}
        {intro.tagline && (
          <div style={{
            marginTop: 4,
            opacity: phase >= 2 ? 1 : 0,
            transition: "opacity 0.4s 0.4s",
          }}>
            {intro.typingTagline ? (
              <TypingTagline text={intro.tagline} color={c.ac} start={phase >= 2} />
            ) : (
              <span style={{ fontSize: "0.7rem", color: c.ac, fontStyle: "italic" }}>{intro.tagline}</span>
            )}
          </div>
        )}
      </div>

      {/* Scroll arrow */}
      {intro.scrollArrow && (
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2"
          style={{
            opacity: phase >= 2 ? 0.5 : 0,
            transition: "opacity 0.5s 0.8s",
            animation: "bounceArrow 1.5s ease-in-out infinite",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c.mu} strokeWidth="2" strokeLinecap="round">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
          <style>{`@keyframes bounceArrow{0%,100%{transform:translateY(0)}50%{transform:translateY(4px)}}`}</style>
        </div>
      )}
    </div>
  );
}