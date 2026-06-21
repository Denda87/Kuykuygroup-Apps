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
    <div>
      <GoldHeader title="KUYKUY STAFF" />
      <div className="px-4 py-4 flex flex-col gap-3">

        {/* Welcome */}
        <div className="rounded-2xl p-4" style={{ background: "linear-gradient(135deg,#1a1800,#161616)", border: "1px solid #D4AF3735" }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs tracking-wider">Welcome</p>
              <h2 className="font-serif text-xl font-bold text-white leading-tight">{user?.name || "Budi Santoso"}</h2>
              <p className="text-xs mt-0.5" style={{ color: "#D4AF37" }}>Therapist</p>
            </div>
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-black font-bold text-xl shrink-0"
              style={{ background: "linear-gradient(135deg,#C9A84C,#D4AF37,#B8960C)", boxShadow: "0 0 14px #D4AF3740" }}
            >
              {user?.name?.charAt(0) || "B"}
            </div>
          </div>
        </div>

        {/* Check-in */}
        <div className="rounded-2xl p-4 flex items-center justify-between" style={{ background: "linear-gradient(135deg,#0a1a0a,#111)", border: "1px solid #22c55e40" }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#16a34a30" }}>
              <CheckCircle size={22} className="text-green-400" />
            </div>
            <div>
              <p className="font-semibold text-green-400 text-sm">Sudah Check-In</p>
              <p className="text-gray-500 text-xs">08:15 🔒</p>
            </div>
          </div>
          <ChevronRight size={18} color="#444" />
        </div>

        {/* Customer Hari Ini */}
        <div className="rounded-2xl p-4" style={{ background: "linear-gradient(135deg,#1a1800,#161616)", border: "1px solid #D4AF3735" }}>
          <p className="text-gray-500 text-xs tracking-wider mb-3">Customer Hari Ini</p>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="font-serif font-bold mb-3" style={{ fontSize: 32, color: "#D4AF37" }}>
                {customersToday} <span className="text-gray-600" style={{ fontSize: 20 }}>/ {targetDaily}</span>
              </div>
              <ProgressBar value={customersToday} max={targetDaily} />
            </div>
            <CircularProgress value={customersToday} max={targetDaily} />
          </div>
        </div>

        {/* Target Harian */}
        <div className="rounded-2xl p-4" style={{ background: "linear-gradient(135deg,#1a1800,#161616)", border: "1px solid #D4AF3735" }}>
          <p className="text-gray-500 text-xs tracking-wider mb-1">Target Harian</p>
          <p className="font-serif font-bold text-lg">
            <span style={{ color: "#D4AF37" }}>{targetDaily}</span>
            <span className="text-gray-600"> / {targetDaily} Customer</span>
          </p>
        </div>

      </div>
    </div>
  );
}
