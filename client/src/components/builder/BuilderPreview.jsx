import { useState, useEffect } from "react";
import { useBuilder } from "../../context/BuilderContext";
import IntroOverlay from "./IntroOverlay";

/* ═══ SKILL BAR ═══ */
function SkillBar({ name, proficiency, color, bg }) {
  const [width, setWidth] = useState(0);
  useEffect(() => { const t = setTimeout(() => setWidth(proficiency), 300); return () => clearTimeout(t); }, [proficiency]);
  return (
    <div style={{ marginBottom: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.65rem", marginBottom: 3 }}>
        <span>{name}</span>
        <span style={{ color, fontWeight: 600 }}>{proficiency}%</span>
      </div>
      <div style={{ height: 5, background: bg, borderRadius: 3, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${width}%`, background: color, borderRadius: 3, transition: "width 1s cubic-bezier(.4,0,.2,1)" }} />
      </div>
    </div>
  );
}

/* ═══ FLIP CARD ═══ */
function FlipCard({ project, colors: c, config, isFlip }) {
  const [flipped, setFlipped] = useState(false);
  const dk = c.bg?.startsWith("#0") || c.bg?.startsWith("#1");

  if (!isFlip) {
    return (
      <div style={{ background: config.effects.glass ? `${c.sf}bb` : c.sf, border: `0.5px solid ${c.bd}`, borderRadius: 8, overflow: "hidden" }}>
        {project.image && <img src={project.image} alt="" style={{ width: "100%", height: config.layout === "card" ? 50 : 70, objectFit: "cover", borderBottom: `0.5px solid ${c.bd}` }} />}
        <div style={{ padding: "0.5rem 0.6rem" }}>
          <div style={{ fontWeight: 600, fontSize: "0.78rem", fontFamily: config.hFont }}>{project.name}</div>
          {project.description && <div style={{ fontSize: "0.65rem", color: c.mu, marginTop: "0.15rem" }}>{project.description}</div>}
          {project.tags?.length > 0 && (
            <div style={{ display: "flex", gap: 2, marginTop: 4, flexWrap: "wrap" }}>
              {project.tags.map((t, j) => <span key={j} style={{ fontSize: "0.5rem", color: c.ac, background: `${c.ac}10`, padding: "0.1rem 0.3rem", borderRadius: 3 }}>{t}</span>)}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div onMouseEnter={() => setFlipped(true)} onMouseLeave={() => setFlipped(false)} style={{ perspective: 400, cursor: "pointer" }}>
      <div style={{ position: "relative", transformStyle: "preserve-3d", transition: "transform 0.6s cubic-bezier(.4,0,.2,1)", transform: flipped ? "rotateY(180deg)" : "rotateY(0)" }}>
        <div style={{ backfaceVisibility: "hidden", background: config.effects.glass ? `${c.sf}bb` : c.sf, border: `0.5px solid ${c.bd}`, borderRadius: 8, overflow: "hidden" }}>
          {project.image && <img src={project.image} alt="" style={{ width: "100%", height: config.layout === "card" ? 50 : 70, objectFit: "cover", borderBottom: `0.5px solid ${c.bd}` }} />}
          <div style={{ padding: "0.5rem 0.6rem" }}>
            <div style={{ fontWeight: 600, fontSize: "0.78rem", fontFamily: config.hFont }}>{project.name}</div>
            {project.tags?.length > 0 && <div style={{ display: "flex", gap: 2, marginTop: 4, flexWrap: "wrap" }}>{project.tags.map((t, j) => <span key={j} style={{ fontSize: "0.5rem", color: c.ac, background: `${c.ac}10`, padding: "0.1rem 0.3rem", borderRadius: 3 }}>{t}</span>)}</div>}
            <div style={{ fontSize: "0.45rem", color: c.mu, marginTop: 3, textAlign: "center" }}>Hover to flip</div>
          </div>
        </div>
        <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)", background: c.ac, borderRadius: 8, padding: "0.6rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontWeight: 700, fontSize: "0.72rem", color: dk ? "#0a0a0f" : "#fff", marginBottom: 3 }}>{project.name}</div>
          {project.description && <div style={{ fontSize: "0.58rem", color: dk ? "#0a0a0f99" : "#ffffffcc", lineHeight: 1.4 }}>{project.description}</div>}
          {project.link && <div style={{ fontSize: "0.5rem", marginTop: 4, color: dk ? "#0a0a0f" : "#fff", fontWeight: 600 }}>↗ View</div>}
        </div>
      </div>
    </div>
  );
}

/* ═══ MAIN PREVIEW ═══ */
export default function BuilderPreview() {
  const { data, config } = useBuilder();
  const c = config.palette;
  const f = config.features;
  const dk = c.bg.startsWith("#0") || c.bg.startsWith("#1");
  const avR = config.avatarShape === "circle" ? "50%" : config.avatarShape === "square" ? 4 : config.avatarShape === "none" ? null : 12;
  const sLbl = { fontSize: "0.55rem", textTransform: "uppercase", letterSpacing: 2.5, color: c.ac, fontWeight: 700, marginBottom: "0.4rem", fontFamily: config.hFont };

  const [showIntro, setShowIntro] = useState(true);
  const [previewTheme, setPreviewTheme] = useState("default");
  const [showHireMe, setShowHireMe] = useState(false);
  const [introKey, setIntroKey] = useState(0);

  // Replay intro when config changes
  useEffect(() => {
    if (f.animatedIntro) {
      setShowIntro(true);
      setIntroKey(k => k + 1);
    }
  }, [config.intro_config?.template, config.intro_config?.bgAnimation]);

  const tc = previewTheme === "flipped"
    ? { bg: dk ? "#fafaf8" : "#0a0a0f", sf: dk ? "#fff" : "#12121e", tx: dk ? "#141413" : "#e4e4ed", mu: dk ? "#777" : "#6b6b80", bd: dk ? "#e8e7e3" : "#1e1e30", ac: c.ac }
    : { bg: c.bg, sf: c.sf, tx: c.tx, mu: c.mu, bd: c.bd, ac: c.ac };

  /* ═══ SECTION RENDERERS ═══ */
  const renderAbout = () => data.about ? (
    <div key="about" style={{ padding: `${config.spacing * 0.8}rem ${config.spacing * 1.2}rem`, borderBottom: `1px solid ${tc.bd}` }}>
      <div style={sLbl}>About</div>
      <p style={{ fontSize: "0.78rem", lineHeight: 1.7, color: tc.mu }}>{data.about}</p>
    </div>
  ) : null;

  const renderSkills = () => data.skills?.length ? (
    <div key="skills" style={{ padding: `${config.spacing * 0.8}rem ${config.spacing * 1.2}rem`, borderBottom: `1px solid ${tc.bd}` }}>
      <div style={sLbl}>Skills</div>
      {f.skillBars ? (
        data.skills.map((s, i) => <SkillBar key={i} name={s.name} proficiency={s.proficiency} color={tc.ac} bg={tc.bd} />)
      ) : (
        <div style={{ display: "flex", gap: "0.25rem", flexWrap: "wrap" }}>
          {data.skills.map((s, i) => <span key={i} style={{ fontSize: "0.62rem", padding: "0.2rem 0.5rem", background: dk ? tc.sf : tc.bd, border: `0.5px solid ${tc.bd}`, borderRadius: 5 }}>{s.name}</span>)}
        </div>
      )}
    </div>
  ) : null;

  const renderProjects = () => data.projects?.some(p => p.name) ? (
    <div key="projects" style={{ padding: `${config.spacing * 0.8}rem ${config.spacing * 1.2}rem`, borderBottom: `1px solid ${tc.bd}` }}>
      <div style={sLbl}>Projects</div>
      <div style={{ display: "grid", gap: "0.4rem", gridTemplateColumns: config.layout === "card" ? "1fr 1fr" : "1fr" }}>
        {data.projects.filter(p => p.name).map((p, i) => <FlipCard key={i} project={p} colors={tc} config={config} isFlip={f.flipCards} />)}
      </div>
    </div>
  ) : null;

  const renderExperience = () => data.experience?.some(e => e.company) ? (
    <div key="experience" style={{ padding: `${config.spacing * 0.8}rem ${config.spacing * 1.2}rem`, borderBottom: `1px solid ${tc.bd}` }}>
      <div style={sLbl}>Experience</div>
      {data.experience.filter(e => e.company).map((e, i) => (
        <div key={i} style={{ marginBottom: 8 }}><div style={{ fontWeight: 600, fontSize: "0.75rem" }}>{e.role} <span style={{ color: tc.mu, fontWeight: 400 }}>at {e.company}</span></div><div style={{ fontSize: "0.58rem", color: tc.ac }}>{e.period}</div></div>
      ))}
    </div>
  ) : null;

  const renderEducation = () => data.education?.some(e => e.school) ? (
    <div key="education" style={{ padding: `${config.spacing * 0.8}rem ${config.spacing * 1.2}rem`, borderBottom: `1px solid ${tc.bd}` }}>
      <div style={sLbl}>Education</div>
      {data.education.filter(e => e.school).map((e, i) => (
        <div key={i} style={{ marginBottom: 6 }}><div style={{ fontWeight: 600, fontSize: "0.75rem" }}>{e.degree}</div><div style={{ fontSize: "0.62rem", color: tc.mu }}>{e.school} · {e.year}</div></div>
      ))}
    </div>
  ) : null;

  const renderTestimonials = () => data.testimonials?.some(t => t.text) ? (
    <div key="testimonials" style={{ padding: `${config.spacing * 0.8}rem ${config.spacing * 1.2}rem`, borderBottom: `1px solid ${tc.bd}` }}>
      <div style={sLbl}>Testimonials</div>
      {data.testimonials.filter(t => t.text).map((t, i) => (
        <div key={i} style={{ background: tc.sf, border: `0.5px solid ${tc.bd}`, borderRadius: 8, padding: "0.5rem", marginBottom: 4 }}>
          <p style={{ fontSize: "0.68rem", color: tc.mu, fontStyle: "italic", lineHeight: 1.5 }}>"{t.text}"</p>
          <div style={{ fontSize: "0.58rem", color: tc.ac, fontWeight: 600, marginTop: 4 }}>— {t.author}{t.role ? `, ${t.role}` : ""}</div>
        </div>
      ))}
    </div>
  ) : null;

  const renderResume = () => data.resume ? (
    <div key="resume" style={{ padding: `${config.spacing * 0.8}rem ${config.spacing * 1.2}rem`, borderBottom: `1px solid ${tc.bd}` }}>
      <div style={sLbl}>Resume</div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, background: tc.sf, border: `0.5px solid ${tc.bd}`, borderRadius: 8, padding: "0.5rem" }}>
        <span>📄</span><div style={{ flex: 1, fontSize: "0.72rem", fontWeight: 600 }}>{data.resumeName}</div>
        {f.downloadResume && <span style={{ fontSize: "0.6rem", color: tc.ac, fontWeight: 600 }}>⬇ Download</span>}
      </div>
    </div>
  ) : null;

  const renderServices = () => (<div key="services" style={{ padding: `${config.spacing * 0.8}rem ${config.spacing * 1.2}rem`, borderBottom: `1px solid ${tc.bd}` }}><div style={sLbl}>Services</div><div style={{ fontSize: "0.68rem", color: tc.mu, fontStyle: "italic" }}>Your services here</div></div>);
  const renderContact = () => (<div key="contact" style={{ padding: `${config.spacing * 0.8}rem ${config.spacing * 1.2}rem`, borderBottom: `1px solid ${tc.bd}` }}><div style={sLbl}>Contact</div><div style={{ display: "grid", gap: 4 }}><div style={{ height: 26, background: tc.sf, border: `0.5px solid ${tc.bd}`, borderRadius: 6 }} /><div style={{ height: 26, background: tc.sf, border: `0.5px solid ${tc.bd}`, borderRadius: 6 }} /><div style={{ height: 44, background: tc.sf, border: `0.5px solid ${tc.bd}`, borderRadius: 6 }} /><div style={{ height: 22, width: 70, background: tc.ac, borderRadius: 6, opacity: 0.8 }} /></div></div>);
  const renderGallery = () => (<div key="gallery" style={{ padding: `${config.spacing * 0.8}rem ${config.spacing * 1.2}rem`, borderBottom: `1px solid ${tc.bd}` }}><div style={sLbl}>Gallery</div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4 }}>{[1,2,3,4,5,6].map(n => <div key={n} style={{ height: 36, background: tc.sf, border: `0.5px solid ${tc.bd}`, borderRadius: 4 }} />)}</div></div>);
  const renderAchievements = () => (<div key="achievements" style={{ padding: `${config.spacing * 0.8}rem ${config.spacing * 1.2}rem`, borderBottom: `1px solid ${tc.bd}` }}><div style={sLbl}>Achievements</div><div style={{ fontSize: "0.68rem", color: tc.mu, fontStyle: "italic" }}>Your achievements</div></div>);

  const sectionMap = { about: renderAbout, skills: renderSkills, projects: renderProjects, experience: renderExperience, education: renderEducation, testimonials: renderTestimonials, resume: renderResume, services: renderServices, contact: renderContact, gallery: renderGallery, achievements: renderAchievements };

  return (
    <div className="sticky top-16 self-start">
      {/* Browser chrome */}
      <div className="flex items-center justify-between mb-1.5 px-1">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e] inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840] inline-block" />
          </div>
          <span className="text-[0.58rem] text-[#9a9a92] font-mono ml-1">{(data.name || "portfolio").toLowerCase().replace(/\s+/g, "-")}.meroportfolio.com</span>
        </div>
        <div className="flex gap-1.5">
          {f.animatedIntro && (
            <button onClick={() => { setShowIntro(true); setIntroKey(k => k + 1); }}
              className="text-[0.55rem] text-[#5a5a55] bg-[#f3f2ee] px-2 py-0.5 rounded font-semibold border border-[#e8e7e3] cursor-pointer hover:text-[#22c55e] transition-colors">
              ▶ Replay
            </button>
          )}
          <span className="text-[0.58rem] text-[#22c55e] bg-[rgba(34,197,94,0.06)] px-2 py-0.5 rounded font-semibold">Live</span>
        </div>
      </div>

      {/* Preview */}
      <div className="border border-[#e8e7e3] rounded-2xl overflow-hidden max-h-[80vh] overflow-y-auto bg-white relative">
        <div style={{ background: tc.bg, color: tc.tx, fontFamily: config.bFont, minHeight: 300, position: "relative" }}>

          {/* ═══ INTRO OVERLAY ═══ */}
          {f.animatedIntro && showIntro && (
            <IntroOverlay key={introKey} data={data} config={config} onDone={() => setShowIntro(false)} />
          )}

          {/* Effects */}
          {config.effects.grain && <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-[1]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />}
          {config.effects.glow && <div className="absolute -top-20 left-1/4 w-[200px] h-[200px] rounded-full pointer-events-none z-[1]" style={{ background: `radial-gradient(circle, ${tc.ac}15 0%, transparent 70%)` }} />}

          <div className="relative z-[2]">
            {/* Cover Image */}
            {f.coverImage && data.coverImage && <div style={{ width: "100%", height: 100, overflow: "hidden" }}><img src={data.coverImage} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>}
            {f.coverImage && !data.coverImage && <div style={{ width: "100%", height: 80, background: `linear-gradient(135deg, ${tc.ac}20, ${tc.bd})` }} />}

            {/* Theme Toggle */}
            {f.themeToggle && (
              <button onClick={() => setPreviewTheme(p => p === "default" ? "flipped" : "default")}
                style={{ position: "absolute", top: f.coverImage ? 88 : 8, right: 10, zIndex: 10, width: 28, height: 28, borderRadius: "50%", border: `1px solid ${tc.bd}`, background: tc.sf, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem" }}>
                {previewTheme === "default" ? "🌙" : "☀️"}
              </button>
            )}

            {/* Header */}
            <div style={{ padding: `${config.spacing * 1.5}rem ${config.spacing * 1.2}rem ${config.spacing}rem`, borderBottom: `1px solid ${tc.bd}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.4rem" }}>
                {data.photo ? <img src={data.photo} alt="" style={{ width: 44, height: 44, objectFit: "cover", flexShrink: 0, borderRadius: avR || 12, border: `2px solid ${tc.bd}` }} />
                  : avR !== null ? <div style={{ width: 44, height: 44, borderRadius: avR, background: `linear-gradient(135deg,${tc.ac},${tc.mu})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "1.1rem", fontFamily: config.hFont, flexShrink: 0 }}>{(data.name || "?")[0]?.toUpperCase()}</div> : null}
                <div>
                  <div style={{ fontFamily: config.hFont, fontWeight: 700, fontSize: "1.05rem", letterSpacing: "-0.3px", display: "flex", alignItems: "center", gap: 6 }}>
                    {data.name || "Your Name"}
                    {f.availableBadge && <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: "0.5rem", fontWeight: 600, color: "#22c55e", background: "rgba(34,197,94,0.08)", padding: "0.15rem 0.4rem", borderRadius: 100, border: "1px solid rgba(34,197,94,0.15)" }}><span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px rgba(34,197,94,0.5)" }} />Available</span>}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: tc.mu }}>{data.title || "Your Title"}</div>
                  {data.tagline && <div style={{ fontSize: "0.6rem", color: tc.ac, marginTop: 2, fontStyle: "italic" }}>{data.tagline}</div>}
                </div>
              </div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", fontSize: "0.6rem", color: tc.mu }}>
                {data.email && <span>📧 {data.email}</span>}
                {data.phone && <span>📱 {data.phone}</span>}
                {data.location && <span>📍 {data.location}</span>}
              </div>
              {data.socials?.some(s => s.url) && <div style={{ display: "flex", gap: 4, marginTop: 6, flexWrap: "wrap" }}>{data.socials.filter(s => s.url).map((s, i) => <span key={i} style={{ fontSize: "0.52rem", background: dk ? tc.sf : tc.bd, border: `0.5px solid ${tc.bd}`, padding: "0.15rem 0.4rem", borderRadius: 4, color: tc.ac }}>{s.icon} {s.label}</span>)}</div>}
              {f.downloadResume && data.resume && <div style={{ marginTop: 8 }}><span style={{ fontSize: "0.58rem", color: tc.ac, background: `${tc.ac}10`, border: `1px solid ${tc.ac}20`, padding: "0.25rem 0.6rem", borderRadius: 6, fontWeight: 600, cursor: "pointer" }}>📥 Download Resume</span></div>}
            </div>

            {/* Dynamic Sections */}
            {config.sections.map(id => { const r = sectionMap[id]; return r ? r() : null; })}

            {/* Footer */}
            <div style={{ padding: "0.8rem", textAlign: "center", borderTop: `1px solid ${tc.bd}`, fontSize: "0.5rem", color: tc.mu }}>
              Built with <span style={{ color: tc.ac, fontWeight: 600 }}>MeroPortfolio</span>
            </div>
          </div>

          {/* Hire Me Button */}
          {f.hireMeButton && (
            <>
              <button onClick={() => setShowHireMe(!showHireMe)} style={{ position: "absolute", bottom: 12, right: 12, zIndex: 20, background: tc.ac, color: dk ? "#0a0a0f" : "#fff", border: "none", borderRadius: 100, padding: "0.35rem 0.8rem", fontSize: "0.6rem", fontWeight: 700, cursor: "pointer", boxShadow: `0 4px 16px ${tc.ac}40` }}>
                {showHireMe ? "✕ Close" : "💼 Hire Me"}
              </button>
              {showHireMe && (
                <div style={{ position: "absolute", bottom: 48, right: 12, zIndex: 20, width: 200, background: tc.sf, border: `1px solid ${tc.bd}`, borderRadius: 10, padding: "0.6rem", boxShadow: "0 8px 30px rgba(0,0,0,0.15)" }}>
                  <div style={{ fontSize: "0.65rem", fontWeight: 700, marginBottom: 6 }}>Get in touch</div>
                  <div style={{ display: "grid", gap: 4 }}>
                    <div style={{ height: 22, background: tc.bg, border: `0.5px solid ${tc.bd}`, borderRadius: 5 }} />
                    <div style={{ height: 22, background: tc.bg, border: `0.5px solid ${tc.bd}`, borderRadius: 5 }} />
                    <div style={{ height: 36, background: tc.bg, border: `0.5px solid ${tc.bd}`, borderRadius: 5 }} />
                    <div style={{ height: 22, background: tc.ac, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.55rem", fontWeight: 700, color: dk ? "#0a0a0f" : "#fff" }}>Send Message</div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="text-center mt-1.5 text-[0.55rem] text-[#d4d4c8]">↑ Updates live as you type</div>
    </div>
  );
}