import { useBuilder } from "../../context/BuilderContext";

const STEPS = [
  { icon: "🎨", label: "Template" },
  { icon: "👤", label: "Profile" },
  { icon: "💬", label: "About" },
  { icon: "⚡", label: "Skills" },
  { icon: "💼", label: "Projects" },
  { icon: "🔗", label: "Extras" },
  { icon: "🎬", label: "Intro" },
  { icon: "✨", label: "Design" },
  { icon: "🚀", label: "Launch" },
];

export default function BuilderSteps() {
  const { step, goTo, completeness } = useBuilder();

  return (
    <div className="flex items-center justify-between">
      <div className="flex bg-white rounded-[10px] p-[3px] border border-[#e8e7e3] gap-[2px]">
        {STEPS.map((s, i) => (
          <button
            key={i}
            onClick={() => goTo(i + 1)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border-none cursor-pointer text-[0.7rem] font-semibold transition-all duration-200 ${
              step === i + 1 ? "bg-[#f0efeb] text-[#22c55e]"
                : step > i + 1 ? "bg-transparent text-[#5a5a55]"
                : "bg-transparent text-[#d4d4c8]"
            }`}
          >
            <span className={`text-[0.75rem] ${step >= i + 1 ? "opacity-100" : "opacity-30"}`}>{s.icon}</span>
            {step === i + 1 && <span>{s.label}</span>}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <svg width="34" height="34" className="-rotate-90">
          <circle cx="17" cy="17" r="13" fill="none" stroke="#e8e7e3" strokeWidth="2.5" />
          <circle cx="17" cy="17" r="13" fill="none" stroke="#22c55e" strokeWidth="2.5"
            strokeDasharray={82} strokeDashoffset={82 - (completeness / 100) * 82}
            strokeLinecap="round" className="transition-all duration-500 ease-out" />
        </svg>
        <span className="text-[0.68rem] text-[#5a5a55] font-semibold">{completeness}%</span>
      </div>
    </div>
  );
}