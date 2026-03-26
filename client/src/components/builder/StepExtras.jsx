import { useState, useRef } from "react";
import { useBuilder } from "../../context/BuilderContext";

function Panel({ title, icon, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mb-1.5 rounded-xl overflow-hidden border border-[#e8e7e3]">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-1.5 px-3 py-2.5 bg-white border-none cursor-pointer">
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

const ic = "w-full px-3 py-2 bg-white border-[1.5px] border-[#e8e7e3] rounded-xl text-[#141413] text-[0.78rem] outline-none transition-all focus:border-[#22c55e] placeholder:text-[#d4d4c8]";

export default function StepExtras() {
  const { data, updateData, updateSocial, updateExperience, addExperience, updateEducation, addEducation, updateTestimonial, addTestimonial } = useBuilder();
  const resumeRef = useRef(null);

  const handleResume = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = (ev) => { updateData("resume", ev.target.result); updateData("resumeName", f.name); };
    r.readAsDataURL(f);
  };

  return (
    <div>
      <h2 className="text-xl font-extrabold mb-0.5">Extras</h2>
      <p className="text-[#5a5a55] text-[0.82rem] mb-5">Socials, experience, education & more</p>

      <Panel title="Social Links" icon="🔗">
        <div className="grid gap-2">
          {data.socials.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-[0.85rem] w-6 text-center">{s.icon}</span>
              <input className={ic} placeholder={`${s.label} URL`} value={s.url}
                onChange={e => updateSocial(i, e.target.value)} />
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Experience" icon="🏢" defaultOpen={false}>
        {data.experience.map((exp, i) => (
          <div key={i} className="grid grid-cols-2 gap-1.5 mb-2">
            <input className={ic} placeholder="Role" value={exp.role} onChange={e => updateExperience(i, "role", e.target.value)} />
            <input className={ic} placeholder="Company" value={exp.company} onChange={e => updateExperience(i, "company", e.target.value)} />
            <input className={`${ic} col-span-2`} placeholder="Period (e.g. 2023-Present)" value={exp.period} onChange={e => updateExperience(i, "period", e.target.value)} />
          </div>
        ))}
        <button onClick={addExperience} className="text-[0.7rem] bg-transparent border border-dashed border-[#e8e7e3] rounded-lg py-1.5 w-full text-[#9a9a92] cursor-pointer hover:text-[#22c55e] hover:border-[#22c55e]/30 transition-all">+ Add</button>
      </Panel>

      <Panel title="Education" icon="🎓" defaultOpen={false}>
        {data.education.map((edu, i) => (
          <div key={i} className="grid gap-1.5 mb-2">
            <input className={ic} placeholder="Degree" value={edu.degree} onChange={e => updateEducation(i, "degree", e.target.value)} />
            <div className="grid grid-cols-[2fr_1fr] gap-1.5">
              <input className={ic} placeholder="School" value={edu.school} onChange={e => updateEducation(i, "school", e.target.value)} />
              <input className={ic} placeholder="Year" value={edu.year} onChange={e => updateEducation(i, "year", e.target.value)} />
            </div>
          </div>
        ))}
        <button onClick={addEducation} className="text-[0.7rem] bg-transparent border border-dashed border-[#e8e7e3] rounded-lg py-1.5 w-full text-[#9a9a92] cursor-pointer hover:text-[#22c55e] hover:border-[#22c55e]/30 transition-all">+ Add</button>
      </Panel>

      <Panel title="Testimonials" icon="⭐" defaultOpen={false}>
        {data.testimonials.map((t, i) => (
          <div key={i} className="grid gap-1.5 mb-2">
            <textarea className={`${ic} min-h-[40px] resize-y`} placeholder="Quote" value={t.text} onChange={e => updateTestimonial(i, "text", e.target.value)} />
            <div className="grid grid-cols-2 gap-1.5">
              <input className={ic} placeholder="Name" value={t.author} onChange={e => updateTestimonial(i, "author", e.target.value)} />
              <input className={ic} placeholder="Role" value={t.role} onChange={e => updateTestimonial(i, "role", e.target.value)} />
            </div>
          </div>
        ))}
        <button onClick={addTestimonial} className="text-[0.7rem] bg-transparent border border-dashed border-[#e8e7e3] rounded-lg py-1.5 w-full text-[#9a9a92] cursor-pointer hover:text-[#22c55e] hover:border-[#22c55e]/30 transition-all">+ Add</button>
      </Panel>

      <Panel title="Resume / CV" icon="📄" defaultOpen={false}>
        <input ref={resumeRef} type="file" accept=".pdf,.doc,.docx" onChange={handleResume} className="hidden" />
        {data.resume ? (
          <div className="flex items-center gap-2 bg-[#f3f2ee] rounded-lg p-2.5">
            <span>📄</span>
            <div className="flex-1 text-[0.78rem] font-semibold">{data.resumeName}</div>
            <button onClick={() => { updateData("resume", null); updateData("resumeName", ""); }}
              className="bg-transparent border-none text-[#fb7185] text-[0.65rem] cursor-pointer">Remove</button>
          </div>
        ) : (
          <button onClick={() => resumeRef.current?.click()}
            className="w-full bg-transparent border-2 border-dashed border-[#e8e7e3] rounded-xl py-4 text-[#9a9a92] cursor-pointer text-[0.78rem] hover:border-[#22c55e]/30 hover:text-[#22c55e] transition-all">
            📄 Upload Resume (PDF, DOC)
          </button>
        )}
      </Panel>
    </div>
  );
}