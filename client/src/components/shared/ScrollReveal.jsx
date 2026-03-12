import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function ScrollReveal({ children, className = "", delay = 0 }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`transition-all duration-[800ms] ${className}`}
      style={{
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delay}s`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(32px)",
      }}
    >
      {children}
    </div>
  );
}
