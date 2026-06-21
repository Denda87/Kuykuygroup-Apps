"use client";
import GoldHeader from "@/components/GoldHeader";
import ProgressBar from "@/components/ProgressBar";
import CircularProgress from "@/components/CircularProgress";
import { getUser } from "@/lib/auth";
import { CheckCircle, ChevronRight } from "lucide-react";

export default function StaffDashboard() {
  const user = getUser();
  const customersToday = 3;
  const targetDaily = 5;

  return (
    <div className="pb-2">
      <GoldHeader title="KUYKUY STAFF" />

      <div className="px-4 space-y-3">
        {/* Welcome Card */}
        <div className="rounded-2xl p-5" style={{background: "linear-gradient(135deg, #1a1a0d, #161616)", border: "1px solid #D4AF3730"}}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-black font-bold text-xl shrink-0" style={{background: "linear-gradient(135deg, #C9A84C, #D4AF37, #B8960C)"}}>
              {user?.name?.charAt(0) || "B"}
            </div>
            <div>
              <p className="text-gray-500 text-xs tracking-wider">Welcome</p>
              <h2 className="font-serif text-xl font-bold text-white">{user?.name || "Budi Santoso"}</h2>
              <p className="text-xs mt-0.5" style={{color: "#D4AF37"}}>Therapist</p>
            </div>
          </div>
        </div>

        {/* Check-in Status */}
        <div className="rounded-2xl p-4 flex items-center justify-between" style={{background: "linear-gradient(135deg, #0d1a0d, #111)", border: "1px solid #22c55e40"}}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle size={20} className="text-green-400" />
            </div>
            <div>
              <p className="font-semibold text-green-400 text-sm">Sudah Check-In</p>
              <p className="text-gray-500 text-xs">08:15 🔒</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-gray-600" />
        </div>

        {/* Customer Today */}
        <div className="rounded-2xl p-5" style={{background: "linear-gradient(135deg, #1a1a0d, #161616)", border: "1px solid #D4AF3730"}}>
          <p className="text-gray-500 text-xs tracking-wider mb-3">Customer Hari Ini</p>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-4xl font-bold font-serif mb-3" style={{color: "#D4AF37"}}>
                {customersToday} <span className="text-gray-600 text-2xl">/ {targetDaily}</span>
              </div>
              <ProgressBar value={customersToday} max={targetDaily} />
            </div>
            <div className="ml-6">
              <CircularProgress value={customersToday} max={targetDaily} />
            </div>
          </div>
        </div>

        {/* Target Harian */}
        <div className="rounded-2xl p-5" style={{background: "linear-gradient(135deg, #1a1a0d, #161616)", border: "1px solid #D4AF3730"}}>
          <p className="text-gray-500 text-xs tracking-wider mb-1">Target Harian</p>
          <div className="text-xl font-bold font-serif">
            <span style={{color: "#D4AF37"}}>{targetDaily}</span>
            <span className="text-gray-600"> / {targetDaily} Customer</span>
          </div>
          <p className="text-gray-600 text-xs mt-2">Tetap semangat! Kamu sudah {customersToday} dari {targetDaily} customer.</p>
        </div>
      </div>
    </div>
  );
}
