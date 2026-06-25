"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/auth";
import BottomNav from "@/components/BottomNav";

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    const user = getUser();
    if (!user) router.push("/login");
  }, [router]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(120% 90% at 50% -10%, #1a1712 0%, #0c0c0d 46%, #060606 100%)",
        fontFamily: "'Manrope', sans-serif",
      }}
    >
      <div className="max-w-[430px] mx-auto relative pb-24">
        {children}
      </div>
      <BottomNav />
    </div>
  );
}
