import { useBuilder } from "../../context/BuilderContext";

export default function StepAbout() {
  const { data, updateData } = useBuilder();

  return (
    <div>
      <h2 className="text-xl font-extrabold mb-0.5">Your story</h2>
      <p className="text-[#5a5a55] text-[0.82rem] mb-5">Tell visitors who you are</p>

      <textarea
        className="w-full px-3.5 py-2.5 bg-white border-[1.5px] border-[#e8e7e3] rounded-xl text-[#141413] text-[0.85rem] outline-none transition-all focus:border-[#22c55e] placeholder:text-[#d4d4c8] min-h-[130px] resize-y leading-relaxed"
        placeholder="Write 2-3 sentences about yourself..."
        value={data.about}
        onChange={e => updateData("about", e.target.value)}
      />

      <div className="flex gap-1.5 mt-3 flex-wrap">
        <span className="text-[0.62rem] text-[#9a9a92]">Tips:</span>
        {["What you do", "Your experience", "What excites you"].map(t => (
          <span key={t} className="text-[0.58rem] bg-[#f3f2ee] px-2 py-0.5 rounded text-[#5a5a55] border border-[#e8e7e3]">{t}</span>
        ))}
      </div>
    </div>
  );
}