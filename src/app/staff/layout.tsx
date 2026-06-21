"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/auth";
import BottomNav from "@/components/BottomNav";

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    const user = getUser();
    if (!user) router.replace("/login");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Gold header bar */}
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #C9A84C, #D4AF37, #8B6914)" }} />
      <div className="max-w-sm mx-auto min-h-screen pb-20 relative">
        {children}
      </div>
      <BottomNav />
    </div>
  );
}
