import ScrollReveal from "../shared/ScrollReveal";

const FEATURES = [
  { icon: "✍️", name: "AI Bio Writer", desc: "Enter your name and role. AI writes a professional bio in seconds.", tier: "Free", tierColor: "#22c55e" },
  { icon: "⚡", name: "Smart Skill Suggest", desc: "AI recommends skills based on your role.", tier: "Free", tierColor: "#22c55e" },
  { icon: "💬", name: "AI Portfolio Chatbot", desc: "Visitors chat with an AI that knows your portfolio.", tier: "Pro", tierColor: "#f59e0b" },
  { icon: "🔍", name: "Portfolio Reviewer", desc: "AI scores your portfolio and gives improvement tips.", tier: "Pro", tierColor: "#f59e0b" },
];

export default function AiFeatures() {
  return (
    <section className="py-20 px-8 bg-white">
      <ScrollReveal>
        <div className="text-center mb-14">
          <span className="section-tag">AI-Powered</span>
          <h2 className="section-title">Let AI do the hard work</h2>
          <p className="text-[#5a5a55] max-w-[460px] mx-auto">
            Write bios, suggest skills, review your portfolio
          </p>
        </div>
      </ScrollReveal>

      <div className="max-w-[800px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FEATURES.map((f, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="bg-white border border-[#e8e7e3] rounded-2xl p-6 transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <div className="text-2xl mb-3">{f.icon}</div>
              <h3 className="text-[0.95rem] font-bold mb-1.5">{f.name}</h3>
              <p className="text-[0.78rem] text-[#5a5a55] leading-relaxed">{f.desc}</p>
              <span
                className="inline-block mt-3 text-[0.58rem] font-semibold px-2.5 py-1 rounded"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  background: `${f.tierColor}0F`,
                  color: f.tierColor,
                }}
              >
                {f.tier}
              </span>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
