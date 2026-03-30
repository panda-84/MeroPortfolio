import { createContext, useContext, useState } from "react";

export const PALETTES = [
  { name: "Mint Night", bg: "#0a0a0f", sf: "#12121e", ac: "#5cff6b", tx: "#e4e4ed", mu: "#6b6b80", bd: "#1e1e30" },
  { name: "Ocean", bg: "#080d14", sf: "#0f1824", ac: "#38bdf8", tx: "#e0eaf4", mu: "#6b8299", bd: "#1a2a3d" },
  { name: "Coral", bg: "#0f0a0a", sf: "#1e1214", ac: "#fb7185", tx: "#f0e4e4", mu: "#99706b", bd: "#2e1a1a" },
  { name: "Lavender", bg: "#0d0a14", sf: "#16121e", ac: "#a78bfa", tx: "#e8e4f4", mu: "#7b6b99", bd: "#231e3d" },
  { name: "Gold", bg: "#0f0d08", sf: "#1e1b12", ac: "#fbbf24", tx: "#f0ede4", mu: "#998a6b", bd: "#2e2a1a" },
  { name: "Rose", bg: "#100c0c", sf: "#1e1418", ac: "#f472b6", tx: "#f0e8ec", mu: "#99707e", bd: "#2e1a24" },
  { name: "Clean White", bg: "#fafaf8", sf: "#ffffff", ac: "#141413", tx: "#141413", mu: "#777", bd: "#e8e7e3" },
  { name: "Warm Paper", bg: "#faf6f0", sf: "#fff8f0", ac: "#c45c3a", tx: "#2a1f18", mu: "#8a7a6a", bd: "#e8dcd0" },
  { name: "Forest", bg: "#0a0f0c", sf: "#121e18", ac: "#34d399", tx: "#d8f0e4", mu: "#6b9980", bd: "#1a3028" },
  { name: "Arctic", bg: "#f0f4f8", sf: "#ffffff", ac: "#0369a1", tx: "#0c2a4a", mu: "#6889a8", bd: "#d0dce8" },
  { name: "Sunset", bg: "#1a0f08", sf: "#2a1a10", ac: "#f97316", tx: "#fde8d0", mu: "#b08860", bd: "#3a2a18" },
  { name: "Cherry", bg: "#0f0508", sf: "#1e0a10", ac: "#e11d48", tx: "#f8e0e8", mu: "#a06070", bd: "#2e1020" },
];

export const SECTIONS_LIST = [
  { id: "about", name: "About", icon: "💬" },
  { id: "skills", name: "Skills", icon: "⚡" },
  { id: "projects", name: "Projects", icon: "💼" },
  { id: "experience", name: "Experience", icon: "🏢" },
  { id: "education", name: "Education", icon: "🎓" },
  { id: "testimonials", name: "Testimonials", icon: "⭐" },
  { id: "services", name: "Services", icon: "🛠" },
  { id: "contact", name: "Contact Form", icon: "📬" },
  { id: "resume", name: "Resume/CV", icon: "📄" },
  { id: "gallery", name: "Photo Gallery", icon: "🖼" },
  { id: "achievements", name: "Achievements", icon: "🏆" },
];

export const FONTS_H = [
  { n: "Jakarta", v: "'Plus Jakarta Sans',sans-serif" },
  { n: "Grotesk", v: "'Space Grotesk',sans-serif" },
  { n: "Playfair", v: "'Playfair Display',serif" },
  { n: "JetBrains", v: "'JetBrains Mono',monospace" },
  { n: "Cormorant", v: "'Cormorant Garamond',serif" },
];

export const LAYOUTS = [
  { id: "classic", n: "Classic", icon: "▤", d: "Top-down" },
  { id: "split", n: "Split", icon: "◫", d: "Sidebar" },
  { id: "card", n: "Cards", icon: "▦", d: "Grid" },
  { id: "minimal", n: "Minimal", icon: "▬", d: "Text" },
];

export const INTROS = [
  { id: "none", n: "None" }, { id: "fade", n: "Fade Up" },
  { id: "typewriter", n: "Typewriter" }, { id: "split", n: "Split Reveal" },
  { id: "glitch", n: "Glitch" }, { id: "blur", n: "Blur Focus" },
];

export const AVATAR_SHAPES = [
  { id: "rounded", n: "Rounded", r: 14 }, { id: "circle", n: "Circle", r: "50%" },
  { id: "square", n: "Square", r: 4 }, { id: "none", n: "None", r: null },
];

const BuilderContext = createContext(null);

export function BuilderProvider({ children }) {
  const [step, setStep] = useState(1);

  const [data, setData] = useState({
    name: "", title: "", tagline: "", email: "", phone: "", location: "",
    photo: null, coverImage: null, about: "",
    // Skills now have proficiency
    skills: [],
    projects: [{ name: "", description: "", link: "", image: null, tags: [] }],
    socials: [
      { icon: "🐙", label: "GitHub", url: "" }, { icon: "💼", label: "LinkedIn", url: "" },
      { icon: "🐦", label: "Twitter", url: "" }, { icon: "🌐", label: "Website", url: "" },
      { icon: "📸", label: "Instagram", url: "" }, { icon: "🎵", label: "TikTok", url: "" },
    ],
    experience: [{ role: "", company: "", period: "" }],
    education: [{ degree: "", school: "", year: "" }],
    testimonials: [{ text: "", author: "", role: "" }],
    resume: null, resumeName: "",
    // Contact info for Hire Me
    contactMessage: "",
  });

  const [config, setConfig] = useState({
    palette: PALETTES[0], hFont: FONTS_H[0].v, bFont: "'DM Sans',sans-serif",
    layout: "classic", intro: "fade", avatarShape: "rounded", spacing: 1.2,
    effects: { grain: true, glow: true, animate: true, glass: false },
    sections: ["about", "skills", "projects"],
    // ═══ NEW FEATURE TOGGLES ═══
    features: {
      skillBars: true,        // Animated proficiency bars
      coverImage: false,       // Hero banner
      availableBadge: true,    // Green "Available" dot
      themeToggle: true,       // Dark/light switch for visitors
      hireMeButton: true,      // Floating hire me button
      flipCards: true,         // Project cards flip on hover
      animatedIntro: true,     // Name animation on load
      downloadResume: true,    // Resume download button
    },
    intro_config: {
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
    },
  });

  // ═══ DATA HELPERS ═══
  const updateData = (k, v) => setData(d => ({ ...d, [k]: v }));

  // Projects
  const updateProject = (i, k, v) => setData(d => ({ ...d, projects: d.projects.map((p, idx) => idx === i ? { ...p, [k]: v } : p) }));
  const addProject = () => data.projects.length < 6 && setData(d => ({ ...d, projects: [...d.projects, { name: "", description: "", link: "", image: null, tags: [] }] }));
  const removeProject = (i) => data.projects.length > 1 && setData(d => ({ ...d, projects: d.projects.filter((_, idx) => idx !== i) }));

  // Skills with proficiency
  const addSkill = (name, proficiency = 80) => {
    if (name.trim() && data.skills.length < 20 && !data.skills.find(s => s.name === name.trim())) {
      setData(d => ({ ...d, skills: [...d.skills, { name: name.trim(), proficiency }] }));
    }
  };
  const removeSkill = (i) => setData(d => ({ ...d, skills: d.skills.filter((_, idx) => idx !== i) }));
  const updateSkillProficiency = (i, proficiency) => {
    setData(d => ({ ...d, skills: d.skills.map((s, idx) => idx === i ? { ...s, proficiency } : s) }));
  };

  // Socials
  const updateSocial = (index, url) => {
    setData(d => ({ ...d, socials: d.socials.map((s, i) => i === index ? { ...s, url } : s) }));
  };

  // Experience
  const updateExperience = (index, key, value) => {
    setData(d => ({ ...d, experience: d.experience.map((e, i) => i === index ? { ...e, [key]: value } : e) }));
  };
  const addExperience = () => {
    setData(d => ({ ...d, experience: [...d.experience, { role: "", company: "", period: "" }] }));
  };

  // Education
  const updateEducation = (index, key, value) => {
    setData(d => ({ ...d, education: d.education.map((e, i) => i === index ? { ...e, [key]: value } : e) }));
  };
  const addEducation = () => {
    setData(d => ({ ...d, education: [...d.education, { degree: "", school: "", year: "" }] }));
  };

  // Testimonials
  const updateTestimonial = (index, key, value) => {
    setData(d => ({ ...d, testimonials: d.testimonials.map((t, i) => i === index ? { ...t, [key]: value } : t) }));
  };
  const addTestimonial = () => {
    setData(d => ({ ...d, testimonials: [...d.testimonials, { text: "", author: "", role: "" }] }));
  };

  // ═══ CONFIG HELPERS ═══
  const updateConfig = (k, v) => setConfig(c => ({ ...c, [k]: v }));
  const toggleEffect = (k) => setConfig(c => ({ ...c, effects: { ...c.effects, [k]: !c.effects[k] } }));
  const toggleSection = (id) => setConfig(c => ({ ...c, sections: c.sections.includes(id) ? c.sections.filter(s => s !== id) : [...c.sections, id] }));
  const toggleFeature = (k) => setConfig(c => ({ ...c, features: { ...c.features, [k]: !c.features[k] } }));

  // ═══ NAVIGATION ═══
  const goNext = () => setStep(s => Math.min(9, s + 1));
  const goBack = () => setStep(s => Math.max(1, s - 1));
  const goTo = (s) => setStep(s);

  // ═══ COMPLETENESS ═══
  const completeness = (() => {
    let s = 0;
    if (data.name) s++; if (data.title) s++; if (data.about) s++;
    if (data.skills.length) s++; if (data.projects.some(p => p.name)) s++; if (data.photo) s++;
    return Math.round((s / 6) * 100);
  })();

  return (
    <BuilderContext.Provider value={{
      step, setStep, goNext, goBack, goTo,
      data, setData, updateData,
      updateProject, addProject, removeProject,
      addSkill, removeSkill, updateSkillProficiency,
      updateSocial,
      updateExperience, addExperience,
      updateEducation, addEducation,
      updateTestimonial, addTestimonial,
      config, setConfig, updateConfig,
      toggleEffect, toggleSection, toggleFeature,
      completeness,
    }}>
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {
  const ctx = useContext(BuilderContext);
  if (!ctx) throw new Error("useBuilder must be inside BuilderProvider");
  return ctx;
}
