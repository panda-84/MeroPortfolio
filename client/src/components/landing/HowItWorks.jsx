import ScrollReveal from "../shared/ScrollReveal";

const STEPS = [
  { num: "01", icon: "📝", title: "Fill a form", desc: "Name, bio, skills, projects — takes 5 minutes. AI helps you write everything." },
  { num: "02", icon: "💳", title: "Pay रु100", desc: "Quick payment via eSewa, Khalti, or FonePay. Price of a plate of momo." },
  { num: "03", icon: "🎨", title: "Customize", desc: "Pick colors, fonts, layout, animations. Make it uniquely yours." },
  { num: "04", icon: "🚀", title: "Go live", desc: "Your portfolio goes live with a custom link. Share it everywhere." },
];

export default function HowItWorks() {
  return (
    <section id="howitworks" className="py-20 px-8 bg-white">
      <ScrollReveal>
        <div className="text-center mb-14">
          <span className="section-tag">How It Works</span>
          <h2 className="section-title">Four steps to go live</h2>
          <p className="text-[#5a5a55] max-w-[460px] mx-auto">
            From zero to a professional portfolio in under 5 minutes
          </p>
        </div>
      </ScrollReveal>

      <div className="max-w-[1000px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STEPS.map((step, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div
              className="bg-white border border-[#e8e7e3] rounded-2xl p-7 relative overflow-hidden
                         transition-all duration-400 hover:-translate-y-1
                         hover:shadow-[0_16px_50px_rgba(0,0,0,0.08)]
                         before:content-[''] before:absolute before:top-0 before:left-0 before:right-0
                         before:h-[3px] before:bg-gradient-to-r before:from-[#22c55e] before:to-[#3b82f6]
                         before:opacity-0 before:transition-opacity before:duration-300
                         hover:before:opacity-100"
            >
              {/* Number */}
              <div
                className="w-8 h-8 rounded-lg bg-[rgba(34,197,94,0.06)] border border-[rgba(34,197,94,0.1)]
                           flex items-center justify-center text-[0.65rem] font-bold text-[#22c55e] mb-4"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {step.num}
              </div>

              <div className="text-2xl mb-3">{step.icon}</div>
              <h3 className="text-base font-bold mb-2">{step.title}</h3>
              <p className="text-[0.82rem] text-[#5a5a55] leading-relaxed">{step.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
