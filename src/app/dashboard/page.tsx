"use client";
import { staffList, weeklyData } from "@/lib/mockData";
import { Users, CheckCircle, Target, Building2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const stats = [
  { label: "Total Staff", value: staffList.length, icon: Users, color: "#C9A84C" },
  { label: "Customer Hari Ini", value: staffList.reduce((a, s) => a + s.customersToday, 0), icon: Target, color: "#22c55e" },
  { label: "Target Tercapai", value: staffList.filter(s => s.customersToday >= s.targetDaily).length, icon: CheckCircle, color: "#3b82f6" },
  { label: "Cabang Aktif", value: 2, icon: Building2, color: "#a855f7" },
];

export default function AdminDashboard() {
  const today = new Date().toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Dashboard Admin</h1>
        <p className="text-gray-500 text-sm mt-1">{today}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-[#111] rounded-xl p-5 border border-[#C9A84C22]">
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-400 text-sm">{label}</p>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${color}22` }}>
                <Icon size={20} color={color} />
              </div>
            </div>
            <p className="text-3xl font-bold text-white">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Chart */}
        <div className="bg-[#111] rounded-xl p-5 border border-[#C9A84C22]">
          <h2 className="text-white font-bold mb-4">Customer Per Hari (Minggu Ini)</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" />
              <XAxis dataKey="day" stroke="#555" tick={{ fill: "#888", fontSize: 12 }} />
              <YAxis stroke="#555" tick={{ fill: "#888", fontSize: 12 }} />
              <Tooltip contentStyle={{ background: "#111", border: "1px solid #C9A84C33", borderRadius: 8, color: "#fff" }} />
              <Bar dataKey="customers" fill="#C9A84C" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Activity */}
        <div className="bg-[#111] rounded-xl p-5 border border-[#C9A84C22]">
          <h2 className="text-white font-bold mb-4">Aktivitas Terbaru</h2>
          <div className="space-y-3">
            {[
              { time: "08:15", msg: "Budi Santin check-in", type: "checkin" },
              { time: "08:30", msg: "Sari Dewi check-in", type: "checkin" },
              { time: "09:00", msg: "Sari Dewi menyelesaikan 1 customer (Massage)", type: "customer" },
              { time: "09:45", msg: "Maya Sari menyelesaikan target harian", type: "target" },
              { time: "10:15", msg: "Budi Santin menyelesaikan 1 customer (Facial)", type: "customer" },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-gray-600 text-xs whitespace-nowrap mt-0.5">{a.time}</span>
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${a.type === "checkin" ? "bg-green-500" : a.type === "target" ? "bg-[#C9A84C]" : "bg-blue-500"}`} />
                <p className="text-gray-400 text-sm">{a.msg}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-[#111] rounded-xl p-5 border border-[#C9A84C22]">
        <h2 className="text-white font-bold mb-4">Daftar Staff Hari Ini</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#C9A84C22]">
                {["Nama", "Role", "Status", "Check-In", "Customer", "Progress"].map(h => (
                  <th key={h} className="text-left text-gray-500 pb-3 pr-4 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C9A84C11]">
              {staffList.map(s => (
                <tr key={s.id}>
                  <td className="py-3 pr-4 text-white font-medium">{s.name}</td>
                  <td className="py-3 pr-4 text-gray-400">{s.role}</td>
                  <td className="py-3 pr-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${s.checkedIn ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                      {s.checkedIn ? "Hadir" : "Absen"}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-gray-400">{s.checkInTime || "-"}</td>
                  <td className="py-3 pr-4 text-white">{s.customersToday} / {s.targetDaily}</td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-[#333] rounded-full h-1.5">
                        <div className="h-1.5 rounded-full" style={{ width: `${(s.customersToday / s.targetDaily) * 100}%`, background: "linear-gradient(90deg, #C9A84C, #D4AF37)" }} />
                      </div>
                      <span className="text-gray-500 text-xs">{Math.round((s.customersToday / s.targetDaily) * 100)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
