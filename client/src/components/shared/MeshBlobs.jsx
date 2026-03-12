export default function MeshBlobs() {
  return (
    <>
      <div
        className="absolute rounded-full pointer-events-none animate-blob"
        style={{
          width: 500, height: 500, top: -120, right: -80,
          background: "radial-gradient(circle, rgba(34,197,94,0.12) 0%, rgba(59,130,246,0.06) 50%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none animate-blob-delay"
        style={{
          width: 400, height: 400, top: 200, left: -100,
          background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, rgba(236,72,153,0.04) 50%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none animate-blob-delay-2"
        style={{
          width: 350, height: 350, bottom: -50, right: "20%",
          background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
    </>
  );
}
