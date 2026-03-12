export default function PhoneScreen({ portfolio: p, scale = 1 }) {
  const isDark = p.bg.startsWith("#0") || p.bg.startsWith("#1");
  const s = scale;

  return (
    <div
      className="w-full h-full overflow-hidden"
      style={{ background: p.bg, color: p.text, fontFamily: "'DM Sans', sans-serif", fontSize: `${s}rem` }}
    >
      {/* Status bar */}
      <div
        className="flex justify-between items-center"
        style={{ padding: `${4*s}px ${10*s}px`, fontSize: `${7*s}px`, color: p.muted }}
      >
        <span>9:41</span>
        <div
          className="relative"
          style={{ width: 10*s, height: 6*s, borderRadius: 1.5, border: `0.8px solid ${p.muted}` }}
        >
          <div
            className="absolute rounded-sm"
            style={{ inset: `${1.5*s}px`, background: p.color, borderRadius: 0.5 }}
          />
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center" style={{ padding: `${10*s}px ${12*s}px ${8*s}px`, gap: `${7*s}px` }}>
        <div
          className="flex items-center justify-center text-white font-bold flex-shrink-0"
          style={{
            width: 28*s, height: 28*s, borderRadius: 8*s,
            background: `linear-gradient(135deg, ${p.color}, ${p.muted})`,
            fontSize: `${11*s}px`,
          }}
        >
          {p.name[0]}
        </div>
        <div>
          <div className="font-bold" style={{ fontSize: `${10*s}px`, letterSpacing: -0.2 }}>{p.name}</div>
          <div style={{ fontSize: `${7*s}px`, color: p.muted, marginTop: 1 }}>{p.title}</div>
        </div>
      </div>

      {/* About */}
      <div style={{ padding: `${4*s}px ${12*s}px ${6*s}px` }}>
        <div
          className="uppercase font-bold"
          style={{ fontSize: `${5*s}px`, letterSpacing: 2, color: p.color, marginBottom: `${3*s}px` }}
        >
          About
        </div>
        <p style={{ fontSize: `${7.5*s}px`, color: p.muted, lineHeight: 1.5 }}>{p.about}</p>
      </div>

      {/* Skills */}
      <div style={{ padding: `${4*s}px ${12*s}px ${6*s}px` }}>
        <div
          className="uppercase font-bold"
          style={{ fontSize: `${5*s}px`, letterSpacing: 2, color: p.color, marginBottom: `${4*s}px` }}
        >
          Skills
        </div>
        <div className="flex flex-wrap" style={{ gap: `${3*s}px` }}>
          {p.skills.map((sk, i) => (
            <span
              key={i}
              style={{
                fontSize: `${6*s}px`,
                padding: `${1.5*s}px ${5*s}px`,
                background: isDark ? p.surface : p.border,
                border: `0.5px solid ${p.border}`,
                borderRadius: `${3*s}px`,
              }}
            >
              {sk}
            </span>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div style={{ padding: `${4*s}px ${12*s}px` }}>
        {p.projects.map((proj, i) => (
          <div
            key={i}
            style={{
              background: p.surface,
              border: `0.5px solid ${p.border}`,
              borderRadius: `${5*s}px`,
              padding: `${5*s}px ${7*s}px`,
              marginBottom: `${3*s}px`,
            }}
          >
            <div className="font-semibold" style={{ fontSize: `${8*s}px` }}>{proj.name}</div>
            <div style={{ fontSize: `${6.5*s}px`, color: p.muted, marginTop: `${1*s}px` }}>{proj.desc}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center" style={{ padding: `${8*s}px`, fontSize: `${5*s}px`, color: p.muted }}>
        Built with <span className="font-semibold" style={{ color: p.color }}>MeroPortfolio</span>
      </div>
    </div>
  );
}
