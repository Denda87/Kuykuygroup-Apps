export default function Logo({ size = 40 }: { size?: number }) {
  const w = size;
  const h = size * 1.15;
  return (
    <svg width={w} height={h} viewBox="0 0 300 345" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldOuter" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f0d060"/>
          <stop offset="30%" stopColor="#D4AF37"/>
          <stop offset="60%" stopColor="#f5e070"/>
          <stop offset="100%" stopColor="#B8960C"/>
        </linearGradient>
        <linearGradient id="shieldLeft" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3a3a3a"/>
          <stop offset="100%" stopColor="#555"/>
        </linearGradient>
        <linearGradient id="shieldRight" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#111"/>
          <stop offset="100%" stopColor="#222"/>
        </linearGradient>
        <linearGradient id="innerShield" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff"/>
          <stop offset="100%" stopColor="#e0e0e0"/>
        </linearGradient>
        <clipPath id="leftHalf">
          <rect x="0" y="0" width="150" height="345"/>
        </clipPath>
        <clipPath id="rightHalf">
          <rect x="150" y="0" width="150" height="345"/>
        </clipPath>
        <clipPath id="shieldClip">
          <path d="M150 8 L280 55 L280 160 Q280 280 150 330 Q20 280 20 160 L20 55 Z"/>
        </clipPath>
      </defs>

      {/* === WINGS LEFT === */}
      <g opacity="0.9">
        <path d="M55 120 Q20 100 5 70 Q25 85 30 78 Q12 62 18 40 Q32 58 36 50 Q22 34 30 18 Q42 40 40 56 Q52 42 56 48 Q46 68 44 82 Q54 86 50 100 Z" fill="#aaa"/>
        <path d="M58 140 Q22 128 8 100 Q28 114 32 106 Q16 92 20 70 Q34 88 38 80 Q26 62 32 46 Q46 66 44 82 Q56 68 60 74 Q50 94 48 110 Q58 116 54 130 Z" fill="#999" opacity="0.8"/>
        <path d="M60 160 Q24 150 10 122 Q30 136 34 128 Q18 114 22 92 Q36 112 40 104 Q28 86 34 70 Q48 90 46 106 Q58 92 62 98 Q52 118 50 136 Q60 142 56 156 Z" fill="#888" opacity="0.6"/>
      </g>

      {/* === WINGS RIGHT === */}
      <g opacity="0.9">
        <path d="M245 120 Q280 100 295 70 Q275 85 270 78 Q288 62 282 40 Q268 58 264 50 Q278 34 270 18 Q258 40 260 56 Q248 42 244 48 Q254 68 256 82 Q246 86 250 100 Z" fill="#bbb"/>
        <path d="M242 140 Q278 128 292 100 Q272 114 268 106 Q284 92 280 70 Q266 88 262 80 Q274 62 268 46 Q254 66 256 82 Q244 68 240 74 Q250 94 252 110 Q242 116 246 130 Z" fill="#aaa" opacity="0.8"/>
        <path d="M240 160 Q276 150 290 122 Q270 136 266 128 Q282 114 278 92 Q264 112 260 104 Q272 86 266 70 Q252 90 254 106 Q242 92 238 98 Q248 118 250 136 Q240 142 244 156 Z" fill="#999" opacity="0.6"/>
      </g>

      {/* === OUTER SHIELD === */}
      <path d="M150 8 L280 55 L280 160 Q280 280 150 330 Q20 280 20 160 L20 55 Z" fill="url(#goldOuter)" />

      {/* === LEFT HALF FILL === */}
      <path d="M150 8 L280 55 L280 160 Q280 280 150 330 Q20 280 20 160 L20 55 Z" fill="url(#shieldLeft)" clipPath="url(#leftHalf)"/>
      {/* === RIGHT HALF FILL === */}
      <path d="M150 8 L280 55 L280 160 Q280 280 150 330 Q20 280 20 160 L20 55 Z" fill="url(#shieldRight)" clipPath="url(#rightHalf)"/>

      {/* === GOLD BORDER (stroke) === */}
      <path d="M150 8 L280 55 L280 160 Q280 280 150 330 Q20 280 20 160 L20 55 Z" fill="none" stroke="url(#goldOuter)" strokeWidth="10"/>
      {/* Center divider line gold */}
      <line x1="150" y1="8" x2="150" y2="330" stroke="url(#goldOuter)" strokeWidth="2" opacity="0.5"/>

      {/* === INNER WHITE SHIELD === */}
      <path d="M150 55 L230 82 L230 155 Q230 218 150 248 Q70 218 70 155 L70 82 Z" fill="url(#innerShield)"/>
      <path d="M150 55 L230 82 L230 155 Q230 218 150 248 Q70 218 70 155 L70 82 Z" fill="none" stroke="#ccc" strokeWidth="3"/>

      {/* === CROWN === */}
      <g transform="translate(150, 62)">
        <path d="M-28 10 L-18 -8 L-8 6 L0 -14 L8 6 L18 -8 L28 10 L22 18 L-22 18 Z" fill="#D4AF37"/>
        <rect x="-24" y="17" width="48" height="8" rx="2" fill="#D4AF37"/>
        {/* Crown jewels */}
        <circle cx="-18" cy="-4" r="3" fill="#ff4444"/>
        <circle cx="0" cy="-10" r="3" fill="#ff4444"/>
        <circle cx="18" cy="-4" r="3" fill="#ff4444"/>
      </g>

      {/* === RED KUK EMBLEM === */}
      {/* K left */}
      <text x="90" y="195" fill="#cc0000" fontSize="72" fontFamily="serif" fontWeight="900" fontStyle="italic">K</text>
      {/* U */}
      <text x="138" y="195" fill="#cc0000" fontSize="52" fontFamily="serif" fontWeight="900" fontStyle="italic">U</text>
      {/* K right */}
      <text x="172" y="195" fill="#cc0000" fontSize="44" fontFamily="serif" fontWeight="900" fontStyle="italic">K</text>

      {/* Cross bar on the emblem */}
      <rect x="82" y="168" width="136" height="8" rx="4" fill="#cc0000" opacity="0.6"/>

      {/* === SCROLL BANNER === */}
      <path d="M60 265 Q150 285 240 265 L245 285 Q150 308 55 285 Z" fill="#D4AF37"/>
      <path d="M55 285 Q62 295 70 290 L60 265 Z" fill="#B8960C"/>
      <path d="M245 285 Q238 295 230 290 L240 265 Z" fill="#B8960C"/>
      <text x="150" y="282" textAnchor="middle" fill="#1a1000" fontSize="13" fontFamily="serif" fontWeight="bold" letterSpacing="2">KUYKUY GROUP</text>
    </svg>
  );
}
