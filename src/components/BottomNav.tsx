"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, ClipboardList, BarChart2, User } from "lucide-react";

const navItems = [
  { href: "/staff/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/staff/absensi", label: "Absensi", icon: ClipboardList },
  { href: "/staff/kinerja", label: "Kinerja", icon: BarChart2 },
  { href: "/staff/profile", label: "Profile", icon: User },
];

export default function BottomNav() {
  const path = usePathname();
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: "linear-gradient(180deg, #111 0%, #0a0a0a 100%)",
        borderTop: "1.5px solid #D4AF3740",
        boxShadow: "0 -6px 24px #00000090",
      }}
    >
      <div className="flex justify-around items-center py-2 max-w-[430px] mx-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = path === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-0.5 px-3 py-1 relative"
            >
              {active && (
                <span
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-0.5 rounded-full"
                  style={{ background: "linear-gradient(90deg, #C9A84C, #D4AF37, #B8960C)" }}
                />
              )}
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
                style={active ? { background: "#D4AF3718" } : {}}
              >
                <Icon size={20} color={active ? "#D4AF37" : "#666"} strokeWidth={1.8} />
              </div>
              <span
                className="text-[10px] tracking-wider"
                style={{ color: active ? "#D4AF37" : "#555" }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
