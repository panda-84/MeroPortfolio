import { useState } from "react";
import { useBuilder } from "../../context/BuilderContext";

export default function StepSkills() {
  const { data, addSkill, removeSkill } = useBuilder();
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim()) {
      addSkill(input);
      setInput("");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-extrabold mb-0.5">Skills</h2>
      <p className="text-[#5a5a55] text-[0.82rem] mb-5">Press Enter to add (max 20)</p>

      <div className="flex gap-1.5 mb-3">
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
        <div className="flex flex-wrap gap-1.5">
          {data.skills.map((s, i) => (
            <span key={i} onClick={() => removeSkill(i)}
              className="bg-[rgba(34,197,94,0.06)] border border-[rgba(34,197,94,0.15)] text-[#22c55e] px-3 py-1.5 rounded-lg text-[0.72rem] font-medium cursor-pointer transition-all hover:bg-red-50 hover:border-red-200 hover:text-red-400">
              {s} ✕
            </span>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-[#d4d4c8] text-[0.82rem]">No skills added yet</div>
      )}

      <div className="text-[0.62rem] text-[#d4d4c8] mt-3">{data.skills.length}/20 · Click a skill to remove</div>
    </div>
  );
}