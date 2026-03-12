import ScrollReveal from "../shared/ScrollReveal";

const PLANS = [
  {
    name: "Starter", price: "रु100", period: "one-time", featured: true,
    features: ["1-page portfolio", "10+ templates", "AI Bio + Skills", "Free hosting", "Mobile responsive"],
    cta: "Get Started →",
  },
  {
    name: "Pro", price: "रु500", period: "one-time", featured: false,
    features: ["Everything in Starter", "Full customizer", "All AI features", "Custom domain", "Multi-page"],
    cta: "Go Pro",
  },
  {
    name: "Care Plan", price: "रु300", period: "per year", featured: false,
    features: ["Unlimited updates", "AI reviews monthly", "SEO optimization", "Performance tuning", "WhatsApp support"],
    cta: "Add Care",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 px-8">
      <ScrollReveal>
        <div className="text-center mb-14">
          <span className="section-tag">Pricing</span>
          <h2 className="section-title">Simple, honest pricing</h2>
          <p className="text-[#5a5a55] max-w-[460px] mx-auto">
            Start for रु100. Upgrade only when you need.
          </p>
        </div>
      </ScrollReveal>

      <div className="max-w-[920px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PLANS.map((plan, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div
              className={`bg-white border rounded-3xl p-8 text-center relative transition-all duration-400
                         hover:-translate-y-1 hover:shadow-[0_16px_50px_rgba(0,0,0,0.08)]
                         ${plan.featured
                           ? "border-[#22c55e] shadow-[0_0_60px_rgba(34,197,94,0.12)]"
                           : "border-[#e8e7e3]"
                         }`}
            >
              {/* Popular badge */}
              {plan.featured && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 text-[0.58rem] font-bold
                             bg-[#22c55e] text-white px-3 py-0.5 rounded-md tracking-wider"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  MOST POPULAR
                </div>
              )}

              <div className="text-[0.72rem] font-semibold uppercase tracking-wider text-[#9a9a92] mb-3">
                {plan.name}
              </div>

              <div
                className="text-[2.8rem] font-bold tracking-tight mb-1"
                style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-1px" }}
              >
                {plan.price}
              </div>
              <div className="text-[0.8rem] text-[#9a9a92] mb-6">{plan.period}</div>

              <ul className="text-left space-y-2.5 mb-6">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2.5 text-[0.82rem] text-[#5a5a55]">
                    <span className="text-[#22c55e] font-bold text-xs">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3.5 rounded-xl font-bold text-[0.88rem] cursor-pointer transition-all duration-300
                           hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]
                           ${plan.featured
                             ? "bg-[#141413] text-white border-none"
                             : "bg-transparent text-[#141413] border border-[#e8e7e3]"
                           }`}
              >
                {plan.cta}
              </button>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
