import { useBuilder, PALETTES } from "../../context/BuilderContext";

export default function StepTemplate() {
  const { config, updateConfig } = useBuilder();

  return (
    <div>
      <h2 className="text-xl font-extrabold mb-0.5">Pick a base style</h2>
      <p className="text-[#5a5a55] text-[0.82rem] mb-5">You'll customize everything in Step 7</p>
      <div className="grid grid-cols-2 gap-1.5">
        {PALETTES.map((p, i) => (
          <div key={i} onClick={() => updateConfig("palette", p)}
            className={`p-2.5 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
              config.palette.name === p.name ? "border-[#22c55e] bg-[rgba(34,197,94,0.04)]" : "border-[#e8e7e3] hover:border-[#d4d4c8]"
            }`}>
            <div className="h-8 rounded-lg mb-1.5" style={{ background: `linear-gradient(135deg, ${p.bg} 50%, ${p.ac} 50%)` }} />
            <div className="text-[0.7rem] font-semibold text-center">{p.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}