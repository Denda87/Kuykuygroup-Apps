import Logo from "./Logo";

export default function GoldHeader({ title }: { title: string }) {
  return (
    <div
      className="relative flex flex-col items-center justify-end pb-5"
      style={{
        background: "linear-gradient(180deg, #1c1400 0%, #100e00 60%, #0a0a0a 100%)",
        borderBottom: "2px solid #D4AF37",
        minHeight: 160,
      }}
    >
      {/* glow */}
      <div className="absolute inset-0" style={{background: "radial-gradient(ellipse at 50% 20%, #D4AF3722 0%, transparent 70%)"}} />
      <div className="relative z-10 mb-1">
        <Logo size={80} />
      </div>
      <h1
        className="relative z-10 font-serif font-bold tracking-[0.25em] text-base"
        style={{
          background: "linear-gradient(135deg, #C9A84C, #f5e070, #B8960C)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {title}
      </h1>
    </div>
  );
}
