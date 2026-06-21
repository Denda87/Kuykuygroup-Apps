export default function CircularProgress({ value, max, label }: { value: number; max: number; label?: string }) {
  const r = 34;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(1, value / max);
  const dash = circ * pct;
  return (
    <div className="relative inline-flex items-center justify-center shrink-0">
      <svg width="84" height="84" className="-rotate-90">
        <circle cx="42" cy="42" r={r} fill="none" stroke="#1a1a0a" strokeWidth="8" />
        <circle
          cx="42" cy="42" r={r} fill="none"
          stroke="url(#cgold)"
          strokeWidth="8"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="cgold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#C9A84C"/>
            <stop offset="100%" stopColor="#D4AF37"/>
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <div className="text-xl font-bold font-serif" style={{ color: "#D4AF37" }}>{value}</div>
        {label && <div className="text-[9px] text-gray-500 leading-tight">{label}</div>}
      </div>
    </div>
  );
}
