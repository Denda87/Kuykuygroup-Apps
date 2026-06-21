import Logo from "./Logo";

export default function GoldHeader({ title }: { title: string }) {
  return (
    <div className="relative flex flex-col items-center justify-center pt-8 pb-6 mb-4" style={{background: "linear-gradient(180deg, #1a1200 0%, #0d0d0d 100%)", borderBottom: "1px solid #D4AF3730"}}>
      <div className="absolute inset-0" style={{background: "radial-gradient(ellipse at 50% 0%, #D4AF3720 0%, transparent 70%)"}} />
      <div className="relative">
        <Logo size={64} />
      </div>
      <h1 className="font-serif text-lg font-bold tracking-widest mt-2" style={{background: "linear-gradient(135deg, #C9A84C, #D4AF37, #B8960C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"}}>
        {title}
      </h1>
    </div>
  );
}
