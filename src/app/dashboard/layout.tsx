"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getUser, logout } from "@/lib/auth";
import Logo from "@/components/Logo";
import Link from "next/link";
import { LayoutDashboard, Users, ClipboardList, TrendingUp, FileBarChart, Settings, LogOut } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/staff", label: "Staff", icon: Users },
  { href: "/dashboard/absensi", label: "Absensi", icon: ClipboardList },
  { href: "/dashboard/kinerja", label: "Kinerja", icon: TrendingUp },
  { href: "/dashboard/laporan", label: "Laporan", icon: FileBarChart },
  { href: "/dashboard/pengaturan", label: "Pengaturan", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const user = getUser();
    if (!user || user.role !== "admin") router.replace("/login");
  }, [router]);

  const handleLogout = () => { logout(); router.push("/login"); };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <aside className={`${collapsed ? "w-16" : "w-60"} min-h-screen bg-[#080808] border-r border-[#C9A84C22] flex flex-col transition-all duration-200`}>
        <div className="p-4 flex items-center gap-3 border-b border-[#C9A84C22]">
          <Logo size={36} />
          {!collapsed && <span className="text-[#C9A84C] font-bold text-sm">KUYKUY ADMIN</span>}
        </div>
        <nav className="flex-1 p-2 space-y-1 mt-4">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${active ? "bg-[#C9A84C22] border border-[#C9A84C44]" : "hover:bg-[#111]"}`}>
                <Icon size={18} color={active ? "#C9A84C" : "#666"} />
                {!collapsed && <span className="text-sm" style={{ color: active ? "#C9A84C" : "#888" }}>{label}</span>}
              </Link>
            );
          })}
        </nav>
        <div className="p-2 border-t border-[#C9A84C22]">
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#111] w-full">
            <LogOut size={18} color="#666" />
            {!collapsed && <span className="text-sm text-gray-600">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-h-screen overflow-auto">
        <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #C9A84C, #D4AF37, #8B6914)" }} />
        {children}
      </main>
    </div>
  );
}
