"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Clock, BarChart2, User } from "lucide-react";

const navItems = [
  { href: "/staff/dashboard", label: "Dashboard", icon: Home },
  { href: "/staff/absensi", label: "Absensi", icon: Clock },
  { href: "/staff/kinerja", label: "Kinerja", icon: BarChart2 },
  { href: "/staff/profile", label: "Profile", icon: User },
];

export default function BottomNav() {
  const path = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50" style={{background: "linear-gradient(180deg, #111 0%, #0a0a0a 100%)", borderTop: "1px solid #D4AF3730", boxShadow: "0 -4px 20px #00000080"}}>
      <div className="flex justify-around py-2 max-w-[430px] mx-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = path === href;
          return (
            <Link key={href} href={href} className="flex flex-col items-center gap-1 px-4 py-1 relative">
              {active && (
                <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full" style={{background: "linear-gradient(90deg, #C9A84C, #D4AF37)"}} />
              )}
              <div className={`p-1.5 rounded-xl transition-all ${active ? "" : ""}`} style={active ? {background: "#D4AF3715"} : {}}>
                <Icon size={20} color={active ? "#D4AF37" : "#555"} />
              </div>
              <span className="text-xs" style={{color: active ? "#D4AF37" : "#555"}}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
