export default function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer shield gold border */}
      <path d="M100 8 L185 42 L185 110 Q185 170 100 210 Q15 170 15 110 L15 42 Z" fill="#1a1a1a" stroke="url(#goldGrad)" strokeWidth="6"/>
      {/* Inner shield */}
      <path d="M100 22 L172 52 L172 110 Q172 158 100 192 Q28 158 28 110 L28 52 Z" fill="#0d0d0d" stroke="#D4AF37" strokeWidth="2"/>
      {/* Left wing */}
      <path d="M28 90 Q10 75 5 55 Q15 65 20 60 Q8 48 12 30 Q22 45 25 40 Q18 28 25 15 Q32 35 30 50 Q38 38 42 42 Q35 58 32 70 Q38 72 35 85 Z" fill="#C9A84C" opacity="0.85"/>
      {/* Right wing */}
      <path d="M172 90 Q190 75 195 55 Q185 65 180 60 Q192 48 188 30 Q178 45 175 40 Q182 28 175 15 Q168 35 170 50 Q162 38 158 42 Q165 58 168 70 Q162 72 165 85 Z" fill="#C9A84C" opacity="0.85"/>
      {/* Crown */}
      <path d="M75 48 L80 38 L88 50 L100 32 L112 50 L120 38 L125 48 L120 58 L80 58 Z" fill="#D4AF37"/>
      <rect x="78" y="56" width="44" height="6" rx="2" fill="#D4AF37"/>
      {/* Red emblem background */}
      <ellipse cx="100" cy="120" rx="42" ry="48" fill="#8B0000"/>
      {/* K letter left */}
      <text x="72" y="135" fill="#fff" fontSize="38" fontFamily="serif" fontWeight="bold">K</text>
      {/* U letter */}
      <text x="94" y="135" fill="#fff" fontSize="26" fontFamily="serif" fontWeight="bold">U</text>
      {/* K letter right small */}
      <text x="115" y="135" fill="#fff" fontSize="22" fontFamily="serif" fontWeight="bold">K</text>
      {/* Bottom banner */}
      <path d="M52 178 Q100 188 148 178 L152 192 Q100 204 48 192 Z" fill="#D4AF37"/>
      <text x="100" y="190" textAnchor="middle" fill="#000" fontSize="10" fontFamily="serif" fontWeight="bold" letterSpacing="1">KUYKUY GROUP</text>
      {/* Gold gradient def */}
      <defs>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C9A84C"/>
          <stop offset="50%" stopColor="#D4AF37"/>
          <stop offset="100%" stopColor="#B8960C"/>
        </linearGradient>
      </defs>
    </svg>
  );
}
