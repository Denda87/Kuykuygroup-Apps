"use client";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import { useRouter } from "next/navigation";
import { ChevronLeft, Phone, Users, TrendingUp, LogOut } from "lucide-react";
import { getUser, logout } from "@/lib/auth";
import { staffList } from "@/lib/mockData";

export default function ProfilePage() {
  const router = useRouter();
  const [staff, setStaff] = useState(staffList[0]);

  useEffect(() => {
    const user = getUser();
    if (user?.staffId) {
      const found = staffList.find(s => s.id === user.staffId);
      if (found) setStaff(found);
    }
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="px-4 py-6">
      <div className="flex items-center mb-6">
        <button onClick={() => router.back()} className="text-[#C9A84C] mr-4"><ChevronLeft size={24} /></button>
        <div className="flex-1 flex flex-col items-center">
          <Logo size={48} />
          <p className="text-[#C9A84C] text-xs font-bold tracking-[0.3em] mt-1">PROFILE</p>
        </div>
        <div className="w-8" />
      </div>

      {/* Avatar + Name */}
      <div className="flex items-center gap-4 bg-[#111] rounded-xl p-5 mb-4 border border-[#C9A84C22]">
        <div className="w-20 h-20 rounded-full border-2 border-[#C9A84C] bg-[#C9A84C22] flex items-center justify-center text-3xl font-bold text-[#C9A84C]">
          {staff.name[0]}
        </div>
        <div>
          <p className="text-white font-bold text-xl">{staff.name}</p>
          <p className="text-[#C9A84C] text-sm">{staff.role}</p>
        </div>
      </div>

      {/* Info */}
      <div className="bg-[#111] rounded-xl p-5 mb-4 border border-[#C9A84C22] space-y-4">
        <div className="flex items-center gap-3">
          <Phone size={18} color="#C9A84C" />
          <div>
            <p className="text-gray-500 text-xs">Nomor HP</p>
            <p className="text-white text-sm">{staff.phone}</p>
          </div>
        </div>
        <div className="h-px bg-[#C9A84C11]" />
        <div className="flex items-center gap-3">
          <Users size={18} color="#C9A84C" />
          <div>
            <p className="text-gray-500 text-xs">Total Hari Ini</p>
            <p className="text-white text-sm">{staff.customersToday} Customer</p>
          </div>
        </div>
        <div className="h-px bg-[#C9A84C11]" />
        <div className="flex items-center gap-3">
          <TrendingUp size={18} color="#C9A84C" />
          <div>
            <p className="text-gray-500 text-xs">Performa Bulanan</p>
            <p className="text-white text-sm">{staff.monthlyCustomers} Customer</p>
          </div>
        </div>
      </div>

      <button onClick={handleLogout} className="gold-btn w-full py-4 rounded-xl text-black font-bold tracking-widest flex items-center justify-center gap-2">
        <LogOut size={18} /> LOGOUT
      </button>
    </div>
  );
}
