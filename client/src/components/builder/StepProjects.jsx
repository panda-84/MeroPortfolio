import { useState } from "react";
import { useBuilder } from "../../context/BuilderContext";

export default function StepProjects() {
  const { data, updateProject, addProject, removeProject } = useBuilder();
  const [tagIns, setTagIns] = useState({});

  const handleImage = (i, e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = (ev) => updateProject(i, "image", ev.target.result);
    r.readAsDataURL(f);
  };

  const addTag = (i) => {
    const v = tagIns[i]?.trim();
    if (v && (data.projects[i].tags || []).length < 5) {
      updateProject(i, "tags", [...(data.projects[i].tags || []), v]);
      setTagIns(t => ({ ...t, [i]: "" }));
    }
  };

  const removeTag = (pi, ti) => {
    updateProject(pi, "tags", data.projects[pi].tags.filter((_, idx) => idx !== ti));
  };

  const ic = "w-full px-3.5 py-2.5 bg-white border-[1.5px] border-[#e8e7e3] rounded-xl text-[#141413] text-[0.85rem] outline-none transition-all focus:border-[#22c55e] placeholder:text-[#d4d4c8]";

  return (
    <div>
      <h2 className="text-xl font-extrabold mb-0.5">Projects</h2>
      <p className="text-[#5a5a55] text-[0.82rem] mb-5">Add images, tags, and links</p>

      <div className="grid gap-2.5">
        {data.projects.map((p, i) => (
          <div key={i} className="bg-[#f3f2ee] border border-[#e8e7e3] rounded-xl p-3.5">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[0.58rem] text-[#22c55e] font-bold uppercase tracking-widest">Project {i + 1}</span>
              <div className="flex gap-2">
                <label className="text-[0.58rem] text-[#3b82f6] cursor-pointer bg-[rgba(59,130,246,0.06)] px-2 py-0.5 rounded">
                  📷 Image
                  <input type="file" accept="image/*" onChange={e => handleImage(i, e)} className="hidden" />
                </label>
                {data.projects.length > 1 && (
                  <button onClick={() => removeProject(i)} className="text-[0.58rem] text-[#fb7185] cursor-pointer bg-transparent border-none">✕ Remove</button>
                )}
              </div>
            </div>

            {p.image && <img src={p.image} alt="" className="w-full h-16 object-cover rounded-lg mb-2" />}

            <div className="grid gap-1.5">
              <input className={ic} placeholder="Project name" value={p.name} onChange={e => updateProject(i, "name", e.target.value)} />
              <textarea className={`${ic} min-h-[40px] resize-y`} placeholder="Description" value={p.description} onChange={e => updateProject(i, "description", e.target.value)} />
              <input className={ic} placeholder="Live link (optional)" value={p.link} onChange={e => updateProject(i, "link", e.target.value)} />

              {/* Tags */}
              <input className={`${ic} text-[0.72rem] py-1.5`} placeholder="Add tag + Enter"
                value={tagIns[i] || ""} onChange={e => setTagIns(t => ({ ...t, [i]: e.target.value }))}
                onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addTag(i); } }} />

              {p.tags?.length > 0 && (
                <div className="flex gap-1 flex-wrap">
                  {p.tags.map((t, j) => (
                    <span key={j} onClick={() => removeTag(i, j)}
                      className="text-[0.58rem] text-[#22c55e] bg-[rgba(34,197,94,0.06)] px-1.5 py-0.5 rounded cursor-pointer hover:text-red-400">
                      {t} ✕
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {data.projects.length < 6 && (
          <button onClick={addProject}
            className="w-full bg-transparent border-2 border-dashed border-[#e8e7e3] rounded-xl py-2.5 text-[#9a9a92] cursor-pointer text-[0.78rem] hover:border-[#22c55e]/30 hover:text-[#22c55e] transition-all">
            + Add Project
          </button>
        )}
      </div>
    </div>
  );
}