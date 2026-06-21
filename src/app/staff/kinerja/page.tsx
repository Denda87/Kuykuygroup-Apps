"use client";
import ProgressBar from "@/components/ProgressBar";
import CircularProgress from "@/components/CircularProgress";
import GoldHeader from "@/components/GoldHeader";

export default function KinerjaPage() {
  const dailyActual = 3;
  const dailyTarget = 5;
  const monthlyActual = 30;
  const monthlyTarget = 100;

  return (
    <div className="pb-2">
      <GoldHeader title="KINERJA" />

      <div className="px-4 space-y-3">
        {/* Target Harian */}
        <div className="rounded-2xl p-5" style={{background: "linear-gradient(135deg, #1a1a0d, #161616)", border: "1px solid #D4AF3730"}}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🎯</span>
            <p className="text-gray-400 text-sm font-semibold">Target Harian</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-lg font-bold font-serif mb-2">
                Hari Ini: <span style={{color: "#D4AF37"}}>{dailyActual}</span> / {dailyTarget} Customer
              </div>
              <ProgressBar value={dailyActual} max={dailyTarget} className="mt-2" />
              <p className="text-gray-600 text-xs mt-2">{Math.round((dailyActual/dailyTarget)*100)}% dari target tercapai</p>
            </div>
            <div className="ml-6">
              <CircularProgress value={dailyActual} max={dailyTarget} label="Hari Ini" />
            </div>
          </div>
        </div>

        {/* Target Bulanan */}
        <div className="rounded-2xl p-5" style={{background: "linear-gradient(135deg, #1a1a0d, #161616)", border: "1px solid #D4AF3730"}}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">📊</span>
            <p className="text-gray-400 text-sm font-semibold">Target Bulanan</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-lg font-bold font-serif mb-2">
                April: <span style={{color: "#D4AF37"}}>{monthlyActual}</span> / {monthlyTarget} Customer
              </div>
              <ProgressBar value={monthlyActual} max={monthlyTarget} className="mt-2" />
              <p className="text-gray-600 text-xs mt-2">{Math.round((monthlyActual/monthlyTarget)*100)}% dari target bulanan tercapai</p>
            </div>
            <div className="ml-6">
              <CircularProgress value={monthlyActual} max={monthlyTarget} label="Bulan Ini" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
