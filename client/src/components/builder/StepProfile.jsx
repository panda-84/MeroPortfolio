import { useRef } from "react";
import { useBuilder } from "../../context/BuilderContext";

export default function StepProfile() {
  const { data, updateData } = useBuilder();
  const photoRef = useRef(null);

  const handlePhoto = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = (ev) => updateData("photo", ev.target.result);
    r.readAsDataURL(f);
  };

  return (
    <div>
      <h2 className="text-xl font-extrabold mb-0.5">Your profile</h2>
      <p className="text-[#5a5a55] text-[0.82rem] mb-5">Basic info + photo</p>

      {/* Photo upload */}
      <input ref={photoRef} type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
      <div className="flex justify-center mb-5">
        <div onClick={() => photoRef.current?.click()} className="cursor-pointer text-center">
          <div className="w-20 h-20 rounded-2xl bg-[#f3f2ee] border-2 border-dashed border-[#e8e7e3] flex items-center justify-center overflow-hidden mx-auto hover:border-[#22c55e]/40 transition-all">
            {data.photo ? (
              <img src={data.photo} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="text-[#9a9a92] text-2xl">+</span>
            )}
          </div>
          <div className="text-[0.62rem] text-[#9a9a92] mt-1.5">
            {data.photo ? "Change photo" : "Add photo"}
          </div>
        </div>
      </div>

      <div className="grid gap-3">
        <div>
          <label className="text-[0.65rem] font-semibold uppercase tracking-wider text-[#5a5a55] mb-1 block">Name *</label>
          <input className="w-full px-3.5 py-2.5 bg-white border-[1.5px] border-[#e8e7e3] rounded-xl text-[#141413] text-[0.85rem] outline-none transition-all focus:border-[#22c55e] placeholder:text-[#d4d4c8]"
            placeholder="Aarav Sharma" value={data.name} onChange={e => updateData("name", e.target.value)} />
        </div>
        <div>
          <label className="text-[0.65rem] font-semibold uppercase tracking-wider text-[#5a5a55] mb-1 block">Title *</label>
          <input className="w-full px-3.5 py-2.5 bg-white border-[1.5px] border-[#e8e7e3] rounded-xl text-[#141413] text-[0.85rem] outline-none transition-all focus:border-[#22c55e] placeholder:text-[#d4d4c8]"
            placeholder="Full Stack Developer" value={data.title} onChange={e => updateData("title", e.target.value)} />
        </div>
        <div>
          <label className="text-[0.65rem] font-semibold uppercase tracking-wider text-[#5a5a55] mb-1 block">Tagline (optional)</label>
          <input className="w-full px-3.5 py-2.5 bg-white border-[1.5px] border-[#e8e7e3] rounded-xl text-[#141413] text-[0.85rem] outline-none transition-all focus:border-[#22c55e] placeholder:text-[#d4d4c8]"
            placeholder="Building the future, one line at a time" value={data.tagline} onChange={e => updateData("tagline", e.target.value)} />
        </div>
        <div>
          <label className="text-[0.65rem] font-semibold uppercase tracking-wider text-[#5a5a55] mb-1 block">Email</label>
          <input className="w-full px-3.5 py-2.5 bg-white border-[1.5px] border-[#e8e7e3] rounded-xl text-[#141413] text-[0.85rem] outline-none transition-all focus:border-[#22c55e] placeholder:text-[#d4d4c8]"
            type="email" placeholder="you@email.com" value={data.email} onChange={e => updateData("email", e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[0.65rem] font-semibold uppercase tracking-wider text-[#5a5a55] mb-1 block">Phone</label>
            <input className="w-full px-3.5 py-2.5 bg-white border-[1.5px] border-[#e8e7e3] rounded-xl text-[#141413] text-[0.85rem] outline-none transition-all focus:border-[#22c55e] placeholder:text-[#d4d4c8]"
              placeholder="+977..." value={data.phone} onChange={e => updateData("phone", e.target.value)} />
          </div>
          <div>
            <label className="text-[0.65rem] font-semibold uppercase tracking-wider text-[#5a5a55] mb-1 block">Location</label>
            <input className="w-full px-3.5 py-2.5 bg-white border-[1.5px] border-[#e8e7e3] rounded-xl text-[#141413] text-[0.85rem] outline-none transition-all focus:border-[#22c55e] placeholder:text-[#d4d4c8]"
              placeholder="Kathmandu" value={data.location} onChange={e => updateData("location", e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  );
}