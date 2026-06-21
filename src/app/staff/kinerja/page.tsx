"use client";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import ProgressBar from "@/components/ProgressBar";
import CircularProgress from "@/components/CircularProgress";
import { useRouter } from "next/navigation";
import { ChevronLeft, Zap, Award } from "lucide-react";
import { getUser } from "@/lib/auth";
import { staffList } from "@/lib/mockData";

export default function KinerjaPage() {
  const router = useRouter();
  const [staff, setStaff] = useState(staffList[0]);

  useEffect(() => {
    const user = getUser();
    if (user?.staffId) {
      const found = staffList.find(s => s.id === user.staffId);
      if (found) setStaff(found);
    }
  }, []);

  const monthlyPct = Math.round((staff.monthlyCustomers / staff.targetMonthly) * 100);

  return (
    <div className="px-4 py-6">
      <div className="flex items-center mb-6">
        <button onClick={() => router.back()} className="text-[#C9A84C] mr-4"><ChevronLeft size={24} /></button>
        <div className="flex-1 flex flex-col items-center">
          <Logo size={48} />
          <p className="text-[#C9A84C] text-xs font-bold tracking-[0.3em] mt-1">KINERJA</p>
        </div>
        <div className="w-8" />
      </div>

      {/* Target Harian */}
      <div className="bg-[#111] rounded-xl p-5 mb-4 border border-[#C9A84C22]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap size={18} color="#C9A84C" />
            <div>
              <p className="text-white font-bold">Target Harian</p>
              <p className="text-gray-500 text-xs">Hari Ini: {staff.customersToday} / {staff.targetDaily} Customer</p>
            </div>
          </div>
          <CircularProgress value={staff.targetDaily} max={staff.targetDaily} size={56} />
        </div>
        <ProgressBar value={staff.customersToday} max={staff.targetDaily} />
        <p className="text-right text-xs text-[#C9A84C] mt-2">{Math.round((staff.customersToday / staff.targetDaily) * 100)}% tercapai</p>
      </div>

      {/* Target Bulanan */}
      <div className="bg-[#111] rounded-xl p-5 mb-4 border border-[#C9A84C22]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Award size={18} color="#C9A84C" />
            <div>
              <p className="text-white font-bold">Target Bulanan</p>
              <p className="text-gray-500 text-xs">Juni: {staff.monthlyCustomers} / {staff.targetMonthly} Customer</p>
            </div>
          </div>
          <CircularProgress value={staff.monthlyCustomers} max={staff.targetMonthly} size={56} />
        </div>
        <ProgressBar value={staff.monthlyCustomers} max={staff.targetMonthly} />
        <p className="text-right text-xs text-[#C9A84C] mt-2">{monthlyPct}% tercapai</p>
      </div>

      {/* Summary */}
      <div className="bg-[#111] rounded-xl p-5 border border-[#C9A84C22]">
        <p className="text-white font-bold mb-4">Ringkasan Kinerja</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Customer Hari Ini", value: staff.customersToday },
            { label: "Target Harian", value: staff.targetDaily },
            { label: "Customer Bulan Ini", value: staff.monthlyCustomers },
            { label: "Target Bulanan", value: staff.targetMonthly },
          ].map(({ label, value }) => (
            <div key={label} className="bg-[#0a0a0a] rounded-lg p-3 border border-[#C9A84C11]">
              <p className="text-gray-500 text-xs">{label}</p>
              <p className="text-[#C9A84C] font-bold text-xl mt-1">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
