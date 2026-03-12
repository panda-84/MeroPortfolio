import MeshBlobs from "../shared/MeshBlobs";
import Particles from "../shared/Particles";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-8 pt-28 pb-12 overflow-hidden">
      <MeshBlobs />
      <Particles />

      {/* Badge */}
      <div className="animate-hero-1 inline-flex items-center gap-2 text-[0.78rem] font-semibold text-[#22c55e] bg-[rgba(34,197,94,0.06)] border border-[rgba(34,197,94,0.12)] px-5 py-2 rounded-full mb-8">
        <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse-dot" />
        AI-Powered Portfolio Builder
      </div>

      {/* Heading */}
      <h1
        className="animate-hero-2 text-[clamp(2.8rem,7vw,5.5rem)] font-bold leading-[1.05] mb-6 max-w-[750px]"
        style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-2.5px" }}
      >
        Build your portfolio.
        <br />
        <span className="relative inline-block">
          Go live <span className="text-[#22c55e]">today.</span>
          <span className="absolute bottom-1 left-0 right-0 h-2 bg-[rgba(34,197,94,0.15)] rounded animate-underline" />
        </span>
      </h1>

      {/* Subtitle */}
      <p className="animate-hero-3 text-lg text-[#5a5a55] max-w-[480px] leading-relaxed mb-10">
        Professional portfolios for students, freelancers & creatives in Nepal.
        Pick a style, add your work, let AI do the rest.
      </p>

      {/* CTAs */}
      <div className="animate-hero-4 flex gap-3 flex-wrap justify-center">
        <a href="#" className="btn-dark text-base px-8 py-4">
          Start Building — Free →
        </a>
        <a href="#templates" className="btn-light text-base px-8 py-4">
          View Templates
        </a>
      </div>

      {/* Price */}
      <div className="animate-hero-5 mt-10">
        <div style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          <span className="text-[2.8rem] font-bold tracking-tight">रु100</span>
          <span className="text-base text-[#5a5a55] font-normal ml-2">NPR</span>
        </div>
        <div className="text-[0.82rem] text-[#9a9a92] mt-1">
          One-time · No subscriptions · No hidden fees
        </div>
      </div>
    </section>
  );
}
