import { useBuilder } from "../../context/BuilderContext";

export default function BuilderPreview() {
  const { data, config } = useBuilder();
  const c = config.palette;
  const dk = c.bg.startsWith("#0") || c.bg.startsWith("#1");
  const avR = config.avatarShape === "circle" ? "50%" : config.avatarShape === "square" ? 4 : config.avatarShape === "none" ? null : 12;
  const sLbl = { fontSize: "0.55rem", textTransform: "uppercase", letterSpacing: 2.5, color: c.ac, fontWeight: 700, marginBottom: "0.4rem", fontFamily: config.hFont };

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
          <span className="text-[0.58rem] text-[#9a9a92] font-mono ml-1">
            {(data.name || "portfolio").toLowerCase().replace(/\s+/g, "-")}.meroportfolio.com
          </span>
        </div>
        <span className="text-[0.58rem] text-[#22c55e] bg-[rgba(34,197,94,0.06)] px-2 py-0.5 rounded font-semibold">Live</span>
      </div>

      {/* Preview */}
      <div className="border border-[#e8e7e3] rounded-2xl overflow-hidden max-h-[80vh] overflow-y-auto bg-white">
        <div style={{ background: c.bg, color: c.tx, fontFamily: config.bFont, minHeight: 300, position: "relative" }}>

          {/* Effects */}
          {config.effects.grain && (
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-[1]"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
          )}
          {config.effects.glow && (
            <div className="absolute -top-20 left-1/4 w-[200px] h-[200px] rounded-full pointer-events-none z-[1]"
              style={{ background: `radial-gradient(circle, ${c.ac}15 0%, transparent 70%)` }} />
          )}

          <div className="relative z-[2]">
            {/* Header */}
            <div style={{ padding: `${config.spacing * 1.5}rem ${config.spacing * 1.2}rem ${config.spacing}rem`, borderBottom: `1px solid ${c.bd}` }}>
              <div className="flex items-center gap-2.5 mb-2">
                {data.photo ? (
                  <img src={data.photo} alt="" className="w-11 h-11 object-cover flex-shrink-0" style={{ borderRadius: avR || 12, border: `2px solid ${c.bd}` }} />
                ) : avR !== null ? (
                  <div className="w-11 h-11 flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                    style={{ borderRadius: avR, background: `linear-gradient(135deg,${c.ac},${c.mu})`, fontFamily: config.hFont }}>
                    {(data.name || "?")[0]?.toUpperCase()}
                  </div>
                ) : null}
                <div>
                  <div style={{ fontFamily: config.hFont, fontWeight: 700, fontSize: "1.05rem", letterSpacing: "-0.3px" }}>{data.name || "Your Name"}</div>
                  <div style={{ fontSize: "0.75rem", color: c.mu }}>{data.title || "Your Title"}</div>
                  {data.tagline && <div style={{ fontSize: "0.62rem", color: c.ac, marginTop: 2, fontStyle: "italic" }}>{data.tagline}</div>}
                </div>
              </div>
              <div className="flex gap-2 flex-wrap" style={{ fontSize: "0.62rem", color: c.mu }}>
                {data.email && <span>📧 {data.email}</span>}
                {data.phone && <span>📱 {data.phone}</span>}
                {data.location && <span>📍 {data.location}</span>}
              </div>
              {data.socials?.some(s => s.url) && (
                <div className="flex gap-1 mt-2 flex-wrap">
                  {data.socials.filter(s => s.url).map((s, i) => (
                    <span key={i} style={{ fontSize: "0.55rem", background: dk ? c.sf : c.bd, border: `0.5px solid ${c.bd}`, padding: "0.15rem 0.4rem", borderRadius: 4, color: c.ac }}>{s.icon} {s.label}</span>
                  ))}
                </div>
              )}
            </div>

            {/* About */}
            {config.sections.includes("about") && data.about && (
              <div style={{ padding: `${config.spacing * 0.8}rem ${config.spacing * 1.2}rem`, borderBottom: `1px solid ${c.bd}` }}>
                <div style={sLbl}>About</div>
                <p style={{ fontSize: "0.78rem", lineHeight: 1.7, color: c.mu }}>{data.about}</p>
              </div>
            )}

            {/* Skills */}
            {config.sections.includes("skills") && data.skills?.length > 0 && (
              <div style={{ padding: `${config.spacing * 0.8}rem ${config.spacing * 1.2}rem`, borderBottom: `1px solid ${c.bd}` }}>
                <div style={sLbl}>Skills</div>
                <div className="flex gap-1 flex-wrap">
                  {data.skills.map((s, i) => (
                    <span key={i} style={{ fontSize: "0.62rem", padding: "0.2rem 0.5rem", background: dk ? c.sf : c.bd, border: `0.5px solid ${c.bd}`, borderRadius: 5 }}>{s}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {config.sections.includes("projects") && data.projects?.some(p => p.name) && (
              <div style={{ padding: `${config.spacing * 0.8}rem ${config.spacing * 1.2}rem`, borderBottom: `1px solid ${c.bd}` }}>
                <div style={sLbl}>Projects</div>
                <div className="grid gap-1.5" style={{ gridTemplateColumns: config.layout === "card" ? "1fr 1fr" : "1fr" }}>
                  {data.projects.filter(p => p.name).map((p, i) => (
                    <div key={i} style={{ background: config.effects.glass ? `${c.sf}bb` : c.sf, border: `0.5px solid ${c.bd}`, borderRadius: 8, overflow: "hidden" }}>
                      {p.image && <img src={p.image} alt="" className="w-full object-cover" style={{ height: config.layout === "card" ? 50 : 70, borderBottom: `0.5px solid ${c.bd}` }} />}
                      <div style={{ padding: "0.5rem 0.6rem" }}>
                        <div style={{ fontWeight: 600, fontSize: "0.78rem", fontFamily: config.hFont }}>{p.name}</div>
                        {p.description && <div style={{ fontSize: "0.65rem", color: c.mu, marginTop: "0.15rem" }}>{p.description}</div>}
                        {p.tags?.length > 0 && (
                          <div className="flex gap-0.5 mt-1 flex-wrap">
                            {p.tags.map((t, j) => <span key={j} style={{ fontSize: "0.5rem", color: c.ac, background: `${c.ac}10`, padding: "0.1rem 0.3rem", borderRadius: 3 }}>{t}</span>)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Experience */}
            {config.sections.includes("experience") && data.experience?.some(e => e.company) && (
              <div style={{ padding: `${config.spacing * 0.8}rem ${config.spacing * 1.2}rem`, borderBottom: `1px solid ${c.bd}` }}>
                <div style={sLbl}>Experience</div>
                {data.experience.filter(e => e.company).map((e, i) => (
                  <div key={i} className="mb-2">
                    <div style={{ fontWeight: 600, fontSize: "0.75rem" }}>{e.role} <span style={{ color: c.mu, fontWeight: 400 }}>at {e.company}</span></div>
                    <div style={{ fontSize: "0.58rem", color: c.ac }}>{e.period}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {config.sections.includes("education") && data.education?.some(e => e.school) && (
              <div style={{ padding: `${config.spacing * 0.8}rem ${config.spacing * 1.2}rem`, borderBottom: `1px solid ${c.bd}` }}>
                <div style={sLbl}>Education</div>
                {data.education.filter(e => e.school).map((e, i) => (
                  <div key={i} className="mb-1.5">
                    <div style={{ fontWeight: 600, fontSize: "0.75rem" }}>{e.degree}</div>
                    <div style={{ fontSize: "0.62rem", color: c.mu }}>{e.school} · {e.year}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Testimonials */}
            {config.sections.includes("testimonials") && data.testimonials?.some(t => t.text) && (
              <div style={{ padding: `${config.spacing * 0.8}rem ${config.spacing * 1.2}rem`, borderBottom: `1px solid ${c.bd}` }}>
                <div style={sLbl}>Testimonials</div>
                {data.testimonials.filter(t => t.text).map((t, i) => (
                  <div key={i} style={{ background: c.sf, border: `0.5px solid ${c.bd}`, borderRadius: 8, padding: "0.5rem", marginBottom: "0.3rem" }}>
                    <p style={{ fontSize: "0.68rem", color: c.mu, fontStyle: "italic", lineHeight: 1.5 }}>"{t.text}"</p>
                    <div style={{ fontSize: "0.58rem", color: c.ac, fontWeight: 600, marginTop: "0.2rem" }}>— {t.author}{t.role ? `, ${t.role}` : ""}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Footer */}
            <div style={{ padding: "0.8rem", textAlign: "center", borderTop: `1px solid ${c.bd}`, fontSize: "0.5rem", color: c.mu }}>
              Built with <span style={{ color: c.ac, fontWeight: 600 }}>MeroPortfolio</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-1.5 text-[0.55rem] text-[#d4d4c8]">↑ Updates live as you type</div>
    </div>
  );
}