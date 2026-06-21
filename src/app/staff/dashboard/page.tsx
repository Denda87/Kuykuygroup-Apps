"use client";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import ProgressBar from "@/components/ProgressBar";
import CircularProgress from "@/components/CircularProgress";
import { getUser } from "@/lib/auth";
import { staffList } from "@/lib/mockData";
import { CheckCircle, ChevronRight, Users, Target } from "lucide-react";

export default function StaffDashboard() {
  const [staff, setStaff] = useState(staffList[0]);
  const [checkedIn, setCheckedIn] = useState(true);

  useEffect(() => {
    const user = getUser();
    if (user?.staffId) {
      const found = staffList.find(s => s.id === user.staffId);
      if (found) setStaff(found);
    }
    const saved = localStorage.getItem("kuykuy_checkin");
    if (saved) setCheckedIn(JSON.parse(saved));
  }, []);

  const handleCheckIn = () => {
    setCheckedIn(true);
    localStorage.setItem("kuykuy_checkin", "true");
  };

  return (
    <div className="px-4 py-6">
      {/* Header */}
      <div className="flex flex-col items-center mb-6">
        <Logo size={54} />
        <p className="text-[#C9A84C] text-xs font-bold tracking-[0.3em] mt-2">KUYKUY STAFF</p>
      </div>

      {/* Welcome */}
      <div className="flex items-center justify-between bg-[#111] rounded-xl p-4 mb-4 border border-[#C9A84C22]">
        <div>
          <p className="text-gray-400 text-sm">Welcome</p>
          <p className="text-white font-bold text-lg">{staff.name}</p>
          <p className="text-[#C9A84C] text-xs">{staff.role}</p>
        </div>
        <div className="w-14 h-14 rounded-full bg-[#C9A84C22] border-2 border-[#C9A84C44] flex items-center justify-center text-2xl font-bold text-[#C9A84C]">
          {staff.name[0]}
        </div>
      </div>

      {/* Check In */}
      <button
        onClick={!checkedIn ? handleCheckIn : undefined}
        className="w-full flex items-center justify-between bg-[#111] rounded-xl p-4 mb-4 border border-[#C9A84C22]"
      >
        <div className="flex items-center gap-3">
          <CheckCircle size={28} color={checkedIn ? "#22c55e" : "#666"} fill={checkedIn ? "#22c55e22" : "none"} />
          <div className="text-left">
            <p className="font-semibold text-white">{checkedIn ? "Sudah Check-In" : "Belum Check-In"}</p>
            {checkedIn && <p className="text-gray-500 text-xs">{staff.checkInTime} 🔒</p>}
            {!checkedIn && <p className="text-[#C9A84C] text-xs">Tap untuk check-in</p>}
          </div>
        </div>
        <ChevronRight size={20} color="#666" />
      </button>

      {/* Customer Today */}
      <div className="bg-[#111] rounded-xl p-4 mb-4 border border-[#C9A84C22]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Users size={18} color="#C9A84C" />
            <span className="text-white font-semibold">Customer Hari Ini</span>
          </div>
          <CircularProgress value={staff.customersToday} max={staff.targetDaily} size={52} />
        </div>
        <p className="text-white text-2xl font-bold mb-2">{staff.customersToday} <span className="text-gray-600 text-base">/ {staff.targetDaily}</span></p>
        <ProgressBar value={staff.customersToday} max={staff.targetDaily} />
      </div>

      {/* Target Harian */}
      <div className="bg-[#111] rounded-xl p-4 border border-[#C9A84C22]">
        <div className="flex items-center gap-2 mb-1">
          <Target size={18} color="#C9A84C" />
          <span className="text-white font-semibold">Target Harian</span>
        </div>
        <p className="text-gray-400 text-sm">{staff.targetDaily} / {staff.targetDaily} Customer</p>
        <ProgressBar value={staff.targetDaily} max={staff.targetDaily} />
      </div>
    </div>
  );
}
