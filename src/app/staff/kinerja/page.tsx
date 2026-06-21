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
    <div>
      <GoldHeader title="KINERJA" />
      <div className="px-4 py-4 flex flex-col gap-3">

        {/* Target Harian */}
        <div className="rounded-2xl p-4" style={{ background: "linear-gradient(135deg,#1a1800,#161616)", border: "1px solid #D4AF3735" }}>
          <div className="flex items-center gap-2 mb-3">
            <span style={{ fontSize: 18 }}>🎯</span>
            <p className="font-semibold text-gray-300 text-sm">Target Harian</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <p className="text-sm text-gray-400 mb-2">
                Hari Ini: <span style={{ color: "#D4AF37" }} className="font-bold">{dailyActual}</span> / {dailyTarget} Customer
              </p>
              <ProgressBar value={dailyActual} max={dailyTarget} />
              <p className="text-gray-600 text-xs mt-2">{Math.round((dailyActual / dailyTarget) * 100)}% dari target</p>
            </div>
            <CircularProgress value={dailyActual} max={dailyTarget} label="Hari Ini" />
          </div>
        </div>

        {/* Target Bulanan */}
        <div className="rounded-2xl p-4" style={{ background: "linear-gradient(135deg,#1a1800,#161616)", border: "1px solid #D4AF3735" }}>
          <div className="flex items-center gap-2 mb-3">
            <span style={{ fontSize: 18 }}>📊</span>
            <p className="font-semibold text-gray-300 text-sm">Target Bulanan</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <p className="text-sm text-gray-400 mb-2">
                April: <span style={{ color: "#D4AF37" }} className="font-bold">{monthlyActual}</span> / {monthlyTarget} Customer
              </p>
              <ProgressBar value={monthlyActual} max={monthlyTarget} />
              <p className="text-gray-600 text-xs mt-2">{Math.round((monthlyActual / monthlyTarget) * 100)}% dari target</p>
            </div>
            <CircularProgress value={monthlyActual} max={monthlyTarget} label="Bulan Ini" />
          </div>
        </div>

      </div>
    </div>
  );
}
