import { useState } from "react";
import { useBuilder } from "../../context/BuilderContext";

export default function StepSkills() {
  const { data, addSkill, removeSkill, updateSkillProficiency, config } = useBuilder();
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim()) {
      addSkill(input, 80);
      setInput("");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-extrabold mb-0.5">Skills</h2>
      <p className="text-[#5a5a55] text-[0.82rem] mb-5">
        Press Enter to add {config.features.skillBars ? "· Drag slider for proficiency" : ""}
      </p>

      <div className="flex gap-1.5 mb-4">
        <input
          className="flex-1 px-3.5 py-2.5 bg-white border-[1.5px] border-[#e8e7e3] rounded-xl text-[#141413] text-[0.85rem] outline-none transition-all focus:border-[#22c55e] placeholder:text-[#d4d4c8]"
          placeholder="Type a skill..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); handleAdd(); } }}
        />
        <button onClick={handleAdd}
          className="w-10 bg-[#22c55e] border-none rounded-xl text-white text-lg font-extrabold cursor-pointer hover:brightness-110 transition-all">
          +
        </button>
      </div>

      {data.skills.length > 0 ? (
        <div className="grid gap-2">
          {data.skills.map((s, i) => (
            <div key={i} className="bg-[#f3f2ee] border border-[#e8e7e3] rounded-xl px-3 py-2.5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[0.82rem] font-semibold">{s.name}</span>
                <div className="flex items-center gap-2">
                  {config.features.skillBars && (
                    <span className="text-[0.65rem] font-bold text-[#22c55e]">{s.proficiency}%</span>
                  )}
                  <button onClick={() => removeSkill(i)}
                    className="text-[0.65rem] text-[#fb7185] cursor-pointer bg-transparent border-none hover:text-red-500 transition-colors">
                    ✕
                  </button>
                </div>
              </div>

              {/* Proficiency slider — only show if feature is enabled */}
              {config.features.skillBars && (
                <div className="flex items-center gap-2">
                  <input
                    type="range" min="10" max="100" step="5"
                    value={s.proficiency}
                    onChange={e => updateSkillProficiency(i, parseInt(e.target.value))}
                    className="flex-1 h-1.5 accent-[#22c55e]"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-[#d4d4c8] text-[0.82rem]">No skills added yet</div>
      )}

      <div className="text-[0.62rem] text-[#d4d4c8] mt-3">{data.skills.length}/20</div>
    </div>
  );
}