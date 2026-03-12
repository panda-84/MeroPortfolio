export default function IPhoneFrame({ children, scale = 1, className = "" }) {
  return (
    <div
      className={`relative flex-shrink-0 ${className}`}
      style={{
        width: 220 * scale,
        height: 440 * scale,
        borderRadius: 28 * scale,
        background: "#1a1a1a",
        padding: 6 * scale,
        boxShadow: `
          0 ${2 * scale}px ${8 * scale}px rgba(0,0,0,0.15),
          0 ${12 * scale}px ${40 * scale}px rgba(0,0,0,0.12),
          inset 0 0 0 ${1 * scale}px rgba(255,255,255,0.08)
        `,
      }}
    >
      {/* Inner bezel */}
      <div
        className="w-full h-full relative overflow-hidden"
        style={{ borderRadius: 22 * scale, background: "#000" }}
      >
        {/* Dynamic Island / Notch */}
        <div
          className="absolute left-1/2 -translate-x-1/2 z-10"
          style={{
            top: 6 * scale,
            width: 72 * scale,
            height: 18 * scale,
            borderRadius: 12 * scale,
            background: "#1a1a1a",
          }}
        >
          {/* Camera */}
          <div
            className="absolute top-1/2 -translate-y-1/2"
            style={{
              right: 10 * scale,
              width: 7 * scale,
              height: 7 * scale,
              borderRadius: "50%",
              background: "radial-gradient(circle, #1a3045 30%, #0a1520 70%)",
              boxShadow: "inset 0 0 2px rgba(100,180,255,0.3)",
            }}
          />
        </div>

        {/* Screen content */}
        <div className="w-full h-full overflow-hidden">{children}</div>
      </div>

      {/* Glass reflection */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: 28 * scale,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.02) 100%)",
        }}
      />
    </div>
  );
}
