import { useBuilder } from "../../context/BuilderContext";

export default function StepLaunch() {
  const { data, config, completeness } = useBuilder();

  return (
    <div>
      <h2 className="text-xl font-extrabold mb-0.5">Ready to launch! 🎉</h2>
      <p className="text-[#5a5a55] text-[0.82rem] mb-5">Review and submit your portfolio</p>

      <div className="bg-[#f3f2ee] rounded-xl p-4 text-[0.78rem] text-[#5a5a55] leading-loose border border-[#e8e7e3] mb-5">
        <strong className="text-[#141413]">Summary:</strong><br />
        Name: {data.name || "—"} · Title: {data.title || "—"}<br />
        Skills: {data.skills.length} · Projects: {data.projects.filter(p => p.name).length}<br />
        Photo: {data.photo ? "✅" : "❌"} · Sections: {config.sections.length} enabled<br />
        Theme: {config.palette.name} · Layout: {config.layout}<br />
        Completeness: <span className="text-[#22c55e] font-bold">{completeness}%</span>
      </div>

      {completeness < 60 && (
        <div className="bg-[#fef3c7] border border-[#fbbf24]/20 rounded-xl p-3 mb-4 text-[0.78rem] text-[#92400e]">
          ⚠️ Your portfolio is only {completeness}% complete. Add more info for a better result!
        </div>
      )}

      <button className="w-full py-3.5 bg-[#22c55e] text-white border-none rounded-2xl font-extrabold text-base cursor-pointer shadow-[0_0_30px_rgba(34,197,94,0.25)] hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(34,197,94,0.35)] transition-all duration-300">
        Submit & Pay रु100 🚀
      </button>

      <div className="flex gap-2 justify-center mt-4">
        {["eSewa", "Khalti", "FonePay"].map(m => (
          <span key={m} className="text-[0.62rem] text-[#9a9a92] bg-[#f3f2ee] px-2.5 py-1 rounded border border-[#e8e7e3]" style={{ fontFamily: "'JetBrains Mono',monospace" }}>
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}