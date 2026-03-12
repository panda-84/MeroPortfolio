import ScrollReveal from "../shared/ScrollReveal";

export function CtaBanner() {
  return (
    <section className="py-20 px-8">
      <ScrollReveal>
        <div className="max-w-[900px] mx-auto text-center bg-[#141413] text-white rounded-3xl py-14 px-8 relative overflow-hidden">
          {/* Glow */}
          <div className="absolute -top-[100px] -right-[100px] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.2)_0%,transparent_70%)]" />

          <h2
            className="text-[2.2rem] font-bold tracking-tight mb-3 relative"
            style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-1px" }}
          >
            Ready to stand out?
          </h2>
          <p className="text-white/60 max-w-[400px] mx-auto mb-6 text-[0.95rem] relative">
            Join hundreds of Nepali professionals who built their portfolio with us.
          </p>
          <button className="btn-green relative">
            Build My Portfolio — रु100 →
          </button>
        </div>
      </ScrollReveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[#e8e7e3] py-12 px-8 text-center">
      <div
        className="font-bold text-lg tracking-tight mb-4"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        Mero<span className="text-[#22c55e]">Portfolio</span>
      </div>

      <div className="flex gap-2.5 justify-center mb-4 flex-wrap">
        {["eSewa", "Khalti", "FonePay", "Bank Transfer"].map((m) => (
          <span
            key={m}
            className="text-[0.65rem] text-[#9a9a92] bg-[#f3f2ee] px-3 py-1.5 rounded-md border border-[#e8e7e3]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {m}
          </span>
        ))}
      </div>

      <p className="text-[0.78rem] text-[#9a9a92]">
        © 2026 MeroPortfolio · Made with ❤️ in Nepal
      </p>
    </footer>
  );
}
