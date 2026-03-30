import { useState } from "react";
import { useBuilder } from "../../context/BuilderContext";

const INTRO_TEMPLATES = [
  {
    id: "minimal",
    name: "Minimal Fade",
    desc: "Clean fade-in with your name",
    icon: "✨",
    preview: "bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e]",
  },
  {
    id: "typewriter",
    name: "Typewriter",
    desc: "Text types out character by character",
    icon: "⌨️",
    preview: "bg-gradient-to-br from-[#0d1117] to-[#161b22]",
  },
  {
    id: "split",
    name: "Split Reveal",
    desc: "Name splits from the center",
    icon: "🔀",
    preview: "bg-gradient-to-br from-[#1a0a14] to-[#0a141a]",
  },
  {
    id: "particles",
    name: "Particle Burst",
    desc: "Particles form your name",
    icon: "💫",
    preview: "bg-gradient-to-br from-[#08080f] to-[#141428]",
  },
  {
    id: "glitch",
    name: "Glitch Effect",
    desc: "Cyberpunk glitch distortion",
    icon: "⚡",
    preview: "bg-gradient-to-br from-[#0a0f08] to-[#081a0a]",
  },
  {
    id: "blur",
    name: "Blur Reveal",
    desc: "Blurry to crystal clear",
    icon: "🌀",
    preview: "bg-gradient-to-br from-[#0f0a1a] to-[#1a0a2e]",
  },
  {
    id: "wave",
    name: "Wave Text",
    desc: "Letters wave in one by one",
    icon: "🌊",
    preview: "bg-gradient-to-br from-[#0a0f14] to-[#142028]",
  },
  {
    id: "spotlight",
    name: "Spotlight",
    desc: "Dark screen, spotlight reveals name",
    icon: "🔦",
    preview: "bg-gradient-to-br from-[#000] to-[#111]",
  },
];

const BG_ANIMATIONS = [
  { id: "none", name: "Solid Color", icon: "⬛" },
  { id: "gradient", name: "Gradient Mesh", icon: "🎨" },
  { id: "particles", name: "Floating Particles", icon: "✨" },
  { id: "stars", name: "Starfield", icon: "⭐" },
  { id: "waves", name: "Wave Lines", icon: "🌊" },
  { id: "aurora", name: "Aurora", icon: "🌌" },
  { id: "matrix", name: "Matrix Rain", icon: "💻" },
  { id: "dots", name: "Dot Grid", icon: "⚬" },
];

export default function StepIntro() {
  const { data, updateData, config, updateConfig } = useBuilder();

  // Initialize intro config if not exists
  const intro = config.intro_config || {
    template: "minimal",
    welcomeText: "",
    tagline: "",
    showName: true,
    showTitle: true,
    showPhoto: false,
    bgAnimation: "gradient",
    duration: 3,
    scrollArrow: true,
    typingTagline: true,
  };

  const updateIntro = (key, value) => {
    updateConfig("intro_config", { ...intro, [key]: value });
  };

  return (
    <div>
      <h2 className="text-xl font-extrabold mb-0.5">Customize Your Intro</h2>
      <p className="text-[#5a5a55] text-[0.82rem] mb-5">First impression matters — make it memorable</p>

      {/* Intro Template Picker */}
      <div className="mb-5">
        <label className="text-[0.65rem] font-semibold uppercase tracking-wider text-[#5a5a55] mb-2 block">
          Animation Style
        </label>
        <div className="grid grid-cols-2 gap-2">
          {INTRO_TEMPLATES.map((t) => (
            <div
              key={t.id}
              onClick={() => updateIntro("template", t.id)}
              className={`rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border-2 ${
                intro.template === t.id
                  ? "border-[#22c55e] shadow-[0_0_20px_rgba(34,197,94,0.1)]"
                  : "border-[#e8e7e3] hover:border-[#d4d4c8]"
              }`}
            >
              {/* Mini preview */}
              <div className={`h-16 ${t.preview} flex items-center justify-center relative overflow-hidden`}>
                <span className="text-white/80 text-[0.7rem] font-bold tracking-wide">{data.name || "Your Name"}</span>
                {intro.template === t.id && (
                  <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#22c55e] flex items-center justify-center text-white text-[0.55rem] font-bold">✓</div>
                )}
              </div>
              <div className="p-2 bg-white">
                <div className="flex items-center gap-1.5">
                  <span className="text-[0.8rem]">{t.icon}</span>
                  <div>
                    <div className="text-[0.72rem] font-bold">{t.name}</div>
                    <div className="text-[0.58rem] text-[#9a9a92]">{t.desc}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Welcome Text */}
      <div className="mb-4">
        <label className="text-[0.65rem] font-semibold uppercase tracking-wider text-[#5a5a55] mb-1.5 block">
          Welcome Message
        </label>
        <input
          className="w-full px-3.5 py-2.5 bg-white border-[1.5px] border-[#e8e7e3] rounded-xl text-[#141413] text-[0.85rem] outline-none transition-all focus:border-[#22c55e] placeholder:text-[#d4d4c8]"
          placeholder="Hi, I'm Aarav 👋"
          value={intro.welcomeText}
          onChange={e => updateIntro("welcomeText", e.target.value)}
        />
        <div className="text-[0.58rem] text-[#9a9a92] mt-1">Leave empty to show just your name</div>
      </div>

      {/* Custom Tagline */}
      <div className="mb-4">
        <label className="text-[0.65rem] font-semibold uppercase tracking-wider text-[#5a5a55] mb-1.5 block">
          Tagline (appears below name)
        </label>
        <input
          className="w-full px-3.5 py-2.5 bg-white border-[1.5px] border-[#e8e7e3] rounded-xl text-[#141413] text-[0.85rem] outline-none transition-all focus:border-[#22c55e] placeholder:text-[#d4d4c8]"
          placeholder="Building the future, one line at a time"
          value={intro.tagline}
          onChange={e => updateIntro("tagline", e.target.value)}
        />
      </div>

      {/* Background Animation */}
      <div className="mb-4">
        <label className="text-[0.65rem] font-semibold uppercase tracking-wider text-[#5a5a55] mb-2 block">
          Background Effect
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {BG_ANIMATIONS.map((bg) => (
            <div
              key={bg.id}
              onClick={() => updateIntro("bgAnimation", bg.id)}
              className={`text-center py-2.5 px-1 rounded-lg cursor-pointer transition-all border-[1.5px] ${
                intro.bgAnimation === bg.id
                  ? "border-[#22c55e] bg-[rgba(34,197,94,0.04)]"
                  : "border-[#e8e7e3] hover:border-[#d4d4c8]"
              }`}
            >
              <div className="text-lg mb-0.5">{bg.icon}</div>
              <div className={`text-[0.58rem] font-semibold ${intro.bgAnimation === bg.id ? "text-[#22c55e]" : "text-[#5a5a55]"}`}>
                {bg.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div className="mb-4">
        <label className="text-[0.65rem] font-semibold uppercase tracking-wider text-[#5a5a55] mb-1.5 block">
          Intro Duration
        </label>
        <input
          type="range" min="2" max="5" step="0.5"
          value={intro.duration}
          onChange={e => updateIntro("duration", parseFloat(e.target.value))}
          className="w-full accent-[#22c55e]"
        />
        <div className="flex justify-between text-[0.62rem] text-[#9a9a92]">
          <span>Quick (2s)</span>
          <span className="text-[#22c55e] font-semibold">{intro.duration}s</span>
          <span>Slow (5s)</span>
        </div>
      </div>

      {/* Toggle Options */}
      <div className="mb-2">
        <label className="text-[0.65rem] font-semibold uppercase tracking-wider text-[#5a5a55] mb-2 block">
          Show in intro
        </label>
        <div className="grid gap-1.5">
          {[
            { key: "showName", label: "Your Name", desc: "Display name in intro" },
            { key: "showTitle", label: "Job Title", desc: "Show title below name" },
            { key: "showPhoto", label: "Profile Photo", desc: "Show your photo in intro" },
            { key: "typingTagline", label: "Typing Effect", desc: "Tagline types out letter by letter" },
            { key: "scrollArrow", label: "Scroll Arrow", desc: "Bouncing arrow at bottom" },
          ].map((opt) => (
            <div
              key={opt.key}
              onClick={() => updateIntro(opt.key, !intro[opt.key])}
              className="flex items-center justify-between py-2 px-3 rounded-xl bg-[#f3f2ee] cursor-pointer hover:bg-[#eeedea] transition-colors"
            >
              <div>
                <div className="text-[0.78rem] font-semibold">{opt.label}</div>
                <div className="text-[0.58rem] text-[#9a9a92]">{opt.desc}</div>
              </div>
              <div
                className="w-8 h-[18px] rounded-full p-[2px] flex-shrink-0 transition-colors duration-200"
                style={{ background: intro[opt.key] ? "#22c55e" : "#d4d4c8" }}
              >
                <div
                  className="w-[14px] h-[14px] rounded-full bg-white shadow-sm transition-transform duration-200"
                  style={{ transform: intro[opt.key] ? "translateX(14px)" : "translateX(0)" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}