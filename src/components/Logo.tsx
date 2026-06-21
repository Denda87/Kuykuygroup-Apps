export default function Logo({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.15} viewBox="0 0 100 115" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8C96A" />
          <stop offset="50%" stopColor="#C9A84C" />
          <stop offset="100%" stopColor="#8B6914" />
        </linearGradient>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="50%" stopColor="#111111" />
          <stop offset="100%" stopColor="#000000" />
        </linearGradient>
      </defs>
      {/* Shield outline */}
      <path d="M50 2 L95 20 L95 60 Q95 90 50 113 Q5 90 5 60 L5 20 Z" fill="url(#goldGrad)" />
      <path d="M50 8 L89 24 L89 60 Q89 86 50 107 Q11 86 11 60 L11 24 Z" fill="url(#shieldGrad)" />
      {/* Inner shield */}
      <path d="M50 18 L80 30 L80 58 Q80 76 50 92 Q20 76 20 58 L20 30 Z" fill="none" stroke="#C9A84C" strokeWidth="1.5" />
      {/* KK letters */}
      <text x="50" y="68" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#C9A84C" fontFamily="serif">KK</text>
      {/* Crown */}
      <path d="M35 24 L40 18 L50 22 L60 18 L65 24 L62 28 L38 28 Z" fill="#C9A84C" />
      {/* Wings hints */}
      <path d="M20 50 Q10 45 8 38 Q14 42 20 48" fill="#333" />
      <path d="M80 50 Q90 45 92 38 Q86 42 80 48" fill="#333" />
    </svg>
  );
}
