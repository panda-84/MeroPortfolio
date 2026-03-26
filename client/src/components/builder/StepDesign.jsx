import { useState } from "react";
import { useBuilder, PALETTES, SECTIONS_LIST } from "../../context/BuilderContext";
import SectionManager from "./SectionManager";

const LAYOUTS = [
  { id: "classic", n: "Classic", icon: "▤" },
  { id: "split", n: "Split", icon: "◫" },
  { id: "card", n: "Cards", icon: "▦" },
  { id: "minimal", n: "Minimal", icon: "▬" },
];

const FONTS = [
  { n: "Jakarta", v: "'Plus Jakarta Sans',sans-serif" },
  { n: "Grotesk", v: "'Space Grotesk',sans-serif" },
  { n: "Playfair", v: "'Playfair Display',serif" },
  { n: "JetBrains", v: "'JetBrains Mono',monospace" },
  { n: "Cormorant", v: "'Cormorant Garamond',serif" },
];

const INTROS = [
  { id: "none", n: "None" }, { id: "fade", n: "Fade Up" }, { id: "typewriter", n: "Typewriter" },
  { id: "split", n: "Split Reveal" }, { id: "glitch", n: "Glitch" }, { id: "blur", n: "Blur Focus" },
];

const AVATARS = [
  { id: "rounded", n: "Rounded" }, { id: "circle", n: "Circle" },
  { id: "square", n: "Square" }, { id: "none", n: "None" },
];

function Panel({ title, icon, children, open: dflt = true }) {
  const [open, setOpen] = useState(dflt);
  return (
    <div className="mb-1.5 rounded-xl overflow-hidden border border-[#e8e7e3]">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-1.5 px-3 py-2.5 bg-white border-none cursor-pointer">
        <span className="text-[0.85rem]">{icon}</span>
        <span className="font-bold text-[0.82rem] flex-1 text-left text-[#141413]">{title}</span>
        <span className={`text-[#22c55e] text-[0.7rem] transition-transform duration-300 ${open ? "rotate-180" : ""}`}>▾</span>
      </button>
      <div className={`overflow-hidden transition-all duration-400 bg-[#fafaf8] ${open ? "max-h-[2000px]" : "max-h-0"}`}>
        <div className="p-3">{children}</div>
      </div>
    </div>
  );
}

function Toggle({ on, onChange }) {
  return (
    <div onClick={onChange} className="w-8 h-[18px] rounded-full p-[2px] cursor-pointer flex-shrink-0 transition-colors duration-200"
      style={{ background: on ? "#22c55e" : "#d4d4c8" }}>
      <div className="w-[14px] h-[14px] rounded-full bg-white shadow-sm transition-transform duration-200"
        style={{ transform: on ? "translateX(14px)" : "translateX(0)" }} />
    </div>
  );
}

export default function StepDesign() {
  const { config, updateConfig, toggleEffect, toggleSection } = useBuilder();

  return (
    <div>
      <h2 className="text-xl font-extrabold mb-0.5">Customize design</h2>
      <p className="text-[#5a5a55] text-[0.82rem] mb-5">Make it uniquely yours</p>

      <Panel title="Colors" icon="🎨">
        <div className="grid grid-cols-6 gap-1.5 mb-2">
          {PALETTES.map((p, i) => (
            <div key={i} onClick={() => updateConfig("palette", p)} title={p.name}
              className={`h-8 rounded-lg cursor-pointer transition-all duration-200 border-2 ${
                config.palette.name === p.name ? "border-[#22c55e]" : "border-[#e8e7e3] hover:border-[#d4d4c8]"
              }`}
              style={{ background: `linear-gradient(135deg, ${p.bg} 50%, ${p.ac} 50%)` }}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[0.62rem] text-[#9a9a92]">Custom accent:</span>
          <input type="color" value={config.palette.ac}
            onChange={e => updateConfig("palette", { ...config.palette, ac: e.target.value })}
            className="w-6 h-5 border-none cursor-pointer" />
          <span className="text-[0.58rem] text-[#9a9a92] font-mono">{config.palette.ac}</span>
        </div>
      </Panel>

      <Panel title="Layout" icon="📐">
        <div className="grid grid-cols-4 gap-1.5">
          {LAYOUTS.map(l => (
            <div key={l.id} onClick={() => updateConfig("layout", l.id)}
              className={`text-center py-2 px-1 rounded-lg cursor-pointer transition-all border-[1.5px] ${
                config.layout === l.id ? "border-[#22c55e] bg-[rgba(34,197,94,0.04)]" : "border-[#e8e7e3]"
              }`}>
              <div className={`text-xl ${config.layout === l.id ? "opacity-100" : "opacity-30"}`}>{l.icon}</div>
              <div className={`text-[0.62rem] font-semibold mt-0.5 ${config.layout === l.id ? "text-[#22c55e]" : "text-[#5a5a55]"}`}>{l.n}</div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Heading Font" icon="✏️" open={false}>
        <div className="grid gap-1">
          {FONTS.map(f => (
            <div key={f.n} onClick={() => updateConfig("hFont", f.v)}
              className={`flex justify-between items-center px-2.5 py-2 rounded-lg cursor-pointer border transition-all ${
                config.hFont === f.v ? "border-[#22c55e] bg-[rgba(34,197,94,0.04)]" : "border-[#e8e7e3]"
              }`}>
              <span style={{ fontFamily: f.v }} className="font-bold text-[0.85rem]">{f.n}</span>
              {config.hFont === f.v && <span className="text-[#22c55e] text-[0.65rem]">✓</span>}
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Intro Animation" icon="🎬" open={false}>
        <div className="grid grid-cols-3 gap-1.5">
          {INTROS.map(a => (
            <div key={a.id} onClick={() => updateConfig("intro", a.id)}
              className={`text-center py-2 px-1 rounded-lg cursor-pointer border-[1.5px] text-[0.7rem] font-semibold transition-all ${
                config.intro === a.id ? "border-[#22c55e] text-[#22c55e] bg-[rgba(34,197,94,0.04)]" : "border-[#e8e7e3] text-[#5a5a55]"
              }`}>{a.n}</div>
          ))}
        </div>
      </Panel>

      <Panel title="Avatar Style" icon="👤" open={false}>
        <div className="flex gap-2">
          {AVATARS.map(a => (
            <div key={a.id} onClick={() => updateConfig("avatarShape", a.id)}
              className={`flex-1 text-center py-2 rounded-lg cursor-pointer border-[1.5px] transition-all ${
                config.avatarShape === a.id ? "border-[#22c55e]" : "border-[#e8e7e3]"
              }`}>
              <div className={`text-[0.62rem] font-semibold ${config.avatarShape === a.id ? "text-[#22c55e]" : "text-[#5a5a55]"}`}>{a.n}</div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Effects" icon="✨" open={false}>
        {[
          { k: "grain", n: "Grain Texture", d: "Subtle noise" },
          { k: "glow", n: "Ambient Glow", d: "Color glow" },
          { k: "animate", n: "Animations", d: "Scroll effects" },
          { k: "glass", n: "Glass Effect", d: "Frosted cards" },
        ].map(e => (
          <div key={e.k} className="flex items-center justify-between py-1.5">
            <div>
              <div className="text-[0.78rem] font-semibold">{e.n}</div>
              <div className="text-[0.6rem] text-[#9a9a92]">{e.d}</div>
            </div>
            <Toggle on={config.effects[e.k]} onChange={() => toggleEffect(e.k)} />
          </div>
        ))}
      </Panel>

     <Panel title="Sections (arrange)" icon="📋" open={false}>
  <SectionManager />
</Panel>

      <Panel title="Spacing" icon="📏" open={false}>
        <input type="range" min="0.8" max="2" step="0.1" value={config.spacing}
          onChange={e => updateConfig("spacing", +e.target.value)}
          className="w-full accent-[#22c55e]" />
        <div className="flex justify-between text-[0.62rem] text-[#9a9a92]">
          <span>Compact</span>
          <span className="text-[#22c55e] font-semibold">{config.spacing}x</span>
          <span>Spacious</span>
        </div>
      </Panel>
    </div>
  );
}