"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ClipboardList, TrendingUp, User } from "lucide-react";

const navItems = [
  { href: "/staff/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/staff/absensi", label: "Absensi", icon: ClipboardList },
  { href: "/staff/kinerja", label: "Kinerja", icon: TrendingUp },
  { href: "/staff/profile", label: "Profile", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-[#111] border-t border-[#C9A84C33] flex justify-around py-2 z-50">
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link key={href} href={href} className="flex flex-col items-center gap-0.5 px-3 py-1">
            <Icon size={20} color={active ? "#C9A84C" : "#666"} />
            <span className="text-[10px]" style={{ color: active ? "#C9A84C" : "#666" }}>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
