import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] px-8 transition-all duration-400 ${
        scrolled ? "glass-nav" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1140px] mx-auto h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-bold text-lg tracking-tight text-[#141413] no-underline" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Mero<span className="text-[#22c55e]">Portfolio</span>
        </a>

        {/* Links */}
        <div className="flex items-center gap-8">
          {["How It Works", "Templates", "Pricing"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, "")}`}
              className="hidden md:block text-[0.88rem] font-medium text-[#5a5a55] no-underline
                         relative transition-colors duration-200 hover:text-[#141413]
                         after:content-[''] after:absolute after:bottom-[-4px] after:left-0
                         after:w-0 after:h-[1.5px] after:bg-[#22c55e]
                         after:transition-all after:duration-300
                         hover:after:w-full"
            >
              {link}
            </a>
          ))}

          <a
            href="#"
            className="bg-[#141413] text-[#fafaf8] px-5 py-2.5 rounded-[10px] font-semibold text-[0.85rem]
                       no-underline shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300
                       hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
          >
            Get Started →
          </a>
        </div>
      </div>
    </nav>
  );
}
