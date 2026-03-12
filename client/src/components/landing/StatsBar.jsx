import ScrollReveal from "../shared/ScrollReveal";

const STATS = [
  { num: "रु100", label: "Starting price", green: true },
  { num: "24hr", label: "Delivery", green: false },
  { num: "10+", label: "Templates", green: true },
  { num: "AI", label: "Powered", green: false },
];

export default function StatsBar() {
  return (
    <div className="py-12 px-8 bg-white border-t border-b border-[#f0efeb]">
      <ScrollReveal>
        <div className="max-w-[800px] mx-auto flex justify-around flex-wrap gap-8">
          {STATS.map((s, i) => (
            <div key={i} className="text-center">
              <div
                className={`text-[1.8rem] font-bold tracking-tight ${
                  s.green ? "text-[#22c55e]" : "text-[#141413]"
                }`}
                style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.5px" }}
              >
                {s.num}
              </div>
              <div className="text-[0.78rem] text-[#9a9a92] mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}
