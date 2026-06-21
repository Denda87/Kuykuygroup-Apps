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
    <div className="min-h-screen" style={{ background: "#0a0a0a" }}>
      <div className="max-w-[430px] mx-auto relative pb-20">
        {children}
      </div>
      <BottomNav />
    </div>
  );
}
