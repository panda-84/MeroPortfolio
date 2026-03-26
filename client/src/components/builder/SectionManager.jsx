import { useState, useRef } from "react";
import { useBuilder, SECTIONS_LIST } from "../../context/BuilderContext";

export default function SectionManager() {
  const { config, updateConfig, toggleSection } = useBuilder();
  const [dragIdx, setDragIdx] = useState(null);
  const [overIdx, setOverIdx] = useState(null);
  const dragItem = useRef(null);

  // Get ordered list: enabled first (in order), then disabled
  const enabledSections = config.sections
    .map(id => SECTIONS_LIST.find(s => s.id === id))
    .filter(Boolean);

  const disabledSections = SECTIONS_LIST.filter(
    s => !config.sections.includes(s.id)
  );

  const handleDragStart = (idx) => {
    setDragIdx(idx);
    dragItem.current = idx;
  };

  const handleDragOver = (e, idx) => {
    e.preventDefault();
    setOverIdx(idx);
  };

  const handleDrop = (idx) => {
    if (dragItem.current === null || dragItem.current === idx) {
      setDragIdx(null);
      setOverIdx(null);
      return;
    }

    const newOrder = [...config.sections];
    const dragged = newOrder[dragItem.current];
    newOrder.splice(dragItem.current, 1);
    newOrder.splice(idx, 0, dragged);

    updateConfig("sections", newOrder);
    setDragIdx(null);
    setOverIdx(null);
    dragItem.current = null;
  };

  const moveUp = (idx) => {
    if (idx === 0) return;
    const newOrder = [...config.sections];
    [newOrder[idx - 1], newOrder[idx]] = [newOrder[idx], newOrder[idx - 1]];
    updateConfig("sections", newOrder);
  };

  const moveDown = (idx) => {
    if (idx === config.sections.length - 1) return;
    const newOrder = [...config.sections];
    [newOrder[idx], newOrder[idx + 1]] = [newOrder[idx + 1], newOrder[idx]];
    updateConfig("sections", newOrder);
  };

  const addSection = (id) => {
    updateConfig("sections", [...config.sections, id]);
  };

  const removeSection = (id) => {
    updateConfig("sections", config.sections.filter(s => s !== id));
  };

  return (
    <div>
      <h2 className="text-xl font-extrabold mb-0.5">Arrange sections</h2>
      <p className="text-[#5a5a55] text-[0.82rem] mb-5">
        Drag to reorder · Toggle to show/hide
      </p>

      {/* Active sections */}
      <div className="mb-4">
        <div className="text-[0.62rem] font-semibold uppercase tracking-widest text-[#22c55e] mb-2">
          Active sections (drag to reorder)
        </div>

        <div className="grid gap-1">
          {enabledSections.map((section, idx) => (
            <div
              key={section.id}
              draggable
              onDragStart={() => handleDragStart(idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDrop={() => handleDrop(idx)}
              onDragEnd={() => { setDragIdx(null); setOverIdx(null); }}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border transition-all duration-200 cursor-grab active:cursor-grabbing ${
                dragIdx === idx
                  ? "opacity-50 border-[#22c55e] bg-[rgba(34,197,94,0.04)] scale-[0.98]"
                  : overIdx === idx
                  ? "border-[#22c55e] bg-[rgba(34,197,94,0.02)]"
                  : "border-[#e8e7e3] bg-white hover:border-[#d4d4c8]"
              }`}
            >
              {/* Drag handle */}
              <div className="flex flex-col gap-[2px] cursor-grab opacity-30 hover:opacity-60 transition-opacity">
                <div className="flex gap-[2px]">
                  <div className="w-[3px] h-[3px] rounded-full bg-[#9a9a92]" />
                  <div className="w-[3px] h-[3px] rounded-full bg-[#9a9a92]" />
                </div>
                <div className="flex gap-[2px]">
                  <div className="w-[3px] h-[3px] rounded-full bg-[#9a9a92]" />
                  <div className="w-[3px] h-[3px] rounded-full bg-[#9a9a92]" />
                </div>
                <div className="flex gap-[2px]">
                  <div className="w-[3px] h-[3px] rounded-full bg-[#9a9a92]" />
                  <div className="w-[3px] h-[3px] rounded-full bg-[#9a9a92]" />
                </div>
              </div>

              {/* Position number */}
              <span className="text-[0.6rem] font-bold text-[#22c55e] bg-[rgba(34,197,94,0.06)] w-5 h-5 rounded flex items-center justify-center flex-shrink-0">
                {idx + 1}
              </span>

              {/* Icon + name */}
              <span className="text-[0.85rem]">{section.icon}</span>
              <span className="text-[0.82rem] font-semibold flex-1">{section.name}</span>

              {/* Move arrows */}
              <div className="flex gap-0.5">
                <button
                  onClick={(e) => { e.stopPropagation(); moveUp(idx); }}
                  disabled={idx === 0}
                  className={`w-6 h-6 rounded-md border border-[#e8e7e3] flex items-center justify-center text-[0.65rem] cursor-pointer transition-all bg-white ${
                    idx === 0 ? "opacity-20 cursor-default" : "hover:border-[#22c55e] hover:text-[#22c55e]"
                  }`}
                >
                  ↑
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); moveDown(idx); }}
                  disabled={idx === enabledSections.length - 1}
                  className={`w-6 h-6 rounded-md border border-[#e8e7e3] flex items-center justify-center text-[0.65rem] cursor-pointer transition-all bg-white ${
                    idx === enabledSections.length - 1 ? "opacity-20 cursor-default" : "hover:border-[#22c55e] hover:text-[#22c55e]"
                  }`}
                >
                  ↓
                </button>
              </div>

              {/* Remove button */}
              <button
                onClick={(e) => { e.stopPropagation(); removeSection(section.id); }}
                className="w-6 h-6 rounded-md border border-[#e8e7e3] flex items-center justify-center text-[0.65rem] text-[#fb7185] cursor-pointer transition-all bg-white hover:border-[#fb7185] hover:bg-[#fef2f2]"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {enabledSections.length === 0 && (
          <div className="text-center py-6 text-[#d4d4c8] text-[0.82rem] border-2 border-dashed border-[#e8e7e3] rounded-xl">
            No sections added yet — add some below!
          </div>
        )}
      </div>

      {/* Available sections to add */}
      {disabledSections.length > 0 && (
        <div>
          <div className="text-[0.62rem] font-semibold uppercase tracking-widest text-[#9a9a92] mb-2">
            Available sections (click to add)
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {disabledSections.map((section) => (
              <button
                key={section.id}
                onClick={() => addSection(section.id)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-dashed border-[#e8e7e3] bg-[#fafaf8] cursor-pointer transition-all duration-200 hover:border-[#22c55e] hover:bg-[rgba(34,197,94,0.02)] group"
              >
                <span className="text-[0.85rem] opacity-40 group-hover:opacity-100 transition-opacity">
                  {section.icon}
                </span>
                <span className="text-[0.75rem] font-medium text-[#9a9a92] group-hover:text-[#22c55e] transition-colors">
                  {section.name}
                </span>
                <span className="ml-auto text-[0.7rem] text-[#d4d4c8] group-hover:text-[#22c55e] transition-colors">
                  +
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}