"use client";
import { useState, useEffect } from "react";
import AdminPageShell from "@/components/AdminPageShell";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";
import { TrendingUp, Star, Target, Zap, Award, UserPlus, Flag, ExternalLink, MapPin, RefreshCw } from "lucide-react";

const GOLD = "#d4af37";
const GOLD_GRAD = "linear-gradient(135deg,#f4d886,#d4af37 55%,#b8860b)";
const PANEL_BG = "linear-gradient(155deg,#15110a 0%,#0d0a05 100%)";
const BORDER = "1px solid rgba(212,175,55,.16)";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"];

const trendData = [
  { bulan: "Jan", produktivitas: 88, kepuasan: 4.5 },
  { bulan: "Feb", produktivitas: 92, kepuasan: 4.6 },
  { bulan: "Mar", produktivitas: 95, kepuasan: 4.7 },
  { bulan: "Apr", produktivitas: 108, kepuasan: 4.6 },
  { bulan: "Mei", produktivitas: 115, kepuasan: 4.8 },
  { bulan: "Jun", produktivitas: 120, kepuasan: 4.9 },
];

const komisiData = [
  { name: "Komisi Layanan", value: 45, color: "#d4af37" },
  { name: "Bonus Target", value: 25, color: "#5fae7d" },
  { name: "Bonus Rating", value: 18, color: "#6fa8d4" },
  { name: "Insentif Absensi", value: 12, color: "#e0726a" },
];

type Status = "Online" | "Memijat" | "Istirahat" | "Offline";

type Karyawan = {
  id: number;
  nama: string;
  cabang: string;
  status: Status;
  absensi: number;
  targetHarian: number;
  targetBulanan: number;
  pencapaianBulanan: number;
  rating: number;
  komisi: number;
  foto: string;
};

const STATUS_COLOR: Record<Status, { bg: string; color: string }> = {
  Online:   { bg: "rgba(95,174,125,.15)",  color: "#5fae7d" },
  Memijat:  { bg: "rgba(212,175,55,.15)",  color: "#d4af37" },
  Istirahat:{ bg: "rgba(111,168,212,.15)", color: "#6fa8d4" },
  Offline:  { bg: "rgba(224,114,106,.12)", color: "#e0726a" },
};

const BRANCHES = [
  "Semua Cabang", "V Phoenix", "Sierra", "Vierzhen", "Crystal", "Miracle",
  "Kuy Cibi", "Xi Kuy", "Kyu Betos", "Infinity", "B Kuy",
];

const BRANCH_MAPS: Record<string, string> = {
  "V Phoenix": "V Phoenix Spa Jakarta",
  "Sierra":    "Sierra Spa Jakarta",
  "Vierzhen":  "Vierzhen Spa Jakarta",
  "Crystal":   "Crystal Spa Jakarta",
  "Miracle":   "Miracle Spa Jakarta",
  "Kuy Cibi":  "Kuy Cibi Spa Jakarta",
  "Xi Kuy":    "Xi Kuy Spa Jakarta",
  "Kyu Betos": "Kyu Betos Spa Jakarta",
  "Infinity":  "Infinity Spa Jakarta",
  "B Kuy":     "B Kuy Spa Jakarta",
};

const KARYAWAN_DATA: Karyawan[] = [
  { id:1, nama:"Sari Dewi",      cabang:"V Phoenix", status:"Memijat",  absensi:26, targetHarian:6, targetBulanan:120, pencapaianBulanan:134, rating:4.9, komisi:3_420_000, foto:"" },
  { id:2, nama:"Rini Susanti",   cabang:"Sierra",    status:"Online",   absensi:25, targetHarian:5, targetBulanan:100, pencapaianBulanan:112, rating:4.8, komisi:2_980_000, foto:"" },
  { id:3, nama:"Mega Pratiwi",   cabang:"Crystal",   status:"Istirahat",absensi:24, targetHarian:5, targetBulanan:100, pencapaianBulanan:98,  rating:4.7, komisi:2_650_000, foto:"" },
  { id:4, nama:"Lina Handayani", cabang:"Vierzhen",  status:"Memijat",  absensi:27, targetHarian:6, targetBulanan:120, pencapaianBulanan:128, rating:4.8, komisi:3_180_000, foto:"" },
  { id:5, nama:"Dewi Kurnia",    cabang:"Miracle",   status:"Online",   absensi:22, targetHarian:4, targetBulanan:80,  pencapaianBulanan:85,  rating:4.6, komisi:2_200_000, foto:"" },
  { id:6, nama:"Ika Rahayu",     cabang:"Kuy Cibi",  status:"Online",   absensi:26, targetHarian:5, targetBulanan:100, pencapaianBulanan:105, rating:4.7, komisi:2_720_000, foto:"" },
  { id:7, nama:"Putri Anjani",   cabang:"Xi Kuy",    status:"Offline",  absensi:20, targetHarian:4, targetBulanan:80,  pencapaianBulanan:72,  rating:4.4, komisi:1_850_000, foto:"" },
  { id:8, nama:"Ayu Wulandari",  cabang:"Kyu Betos", status:"Memijat",  absensi:28, targetHarian:6, targetBulanan:120, pencapaianBulanan:136, rating:5.0, komisi:3_600_000, foto:"" },
  { id:9, nama:"Sri Wahyuni",    cabang:"Infinity",  status:"Online",   absensi:25, targetHarian:5, targetBulanan:100, pencapaianBulanan:110, rating:4.8, komisi:2_900_000, foto:"" },
  { id:10,nama:"Novi Andriani",  cabang:"B Kuy",     status:"Istirahat",absensi:23, targetHarian:5, targetBulanan:100, pencapaianBulanan:94,  rating:4.5, komisi:2_450_000, foto:"" },
];

function initials(nama: string) {
  return nama.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

function Stars({ val }: { val: number }) {
  return (
    <div className="flex items-center" style={{ gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={12}
          fill={i <= Math.round(val) ? GOLD : "transparent"}
          color={i <= Math.round(val) ? GOLD : "#3a3226"}
          strokeWidth={1.5}
        />
      ))}
      <span style={{ fontSize: 11, color: GOLD, marginLeft: 4, fontWeight: 700 }}>{val.toFixed(1)}</span>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, color }: { icon: React.ElementType; label: string; value: string; sub: string; color: string }) {
  return (
    <div style={{ background: PANEL_BG, border: BORDER, borderRadius: 16, padding: "20px 22px", boxShadow: "0 14px 34px rgba(0,0,0,.5)", flex: 1, minWidth: 180 }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
        <div style={{ width: 38, height: 38, borderRadius: 11, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={18} color={color} />
        </div>
        <span style={{ fontSize: 10, color: "#5fae7d", fontWeight: 600, background: "rgba(95,174,125,.1)", padding: "3px 8px", borderRadius: 6 }}>Live</span>
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, color: "#f3ecda", fontFamily: "'Cinzel', serif", letterSpacing: ".5px", lineHeight: 1.1 }}>{value}</div>
      <div style={{ fontSize: 11.5, color: "#9a8f70", marginTop: 6, fontWeight: 500 }}>{label}</div>
      <div style={{ fontSize: 11, color: color, marginTop: 4, fontWeight: 600 }}>{sub}</div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#15110a", border: BORDER, borderRadius: 10, padding: "10px 14px" }}>
      <div style={{ fontSize: 11, color: GOLD, marginBottom: 6, fontWeight: 700 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ fontSize: 12, color: p.color, fontWeight: 600 }}>
          {p.name}: {p.value}{p.name.includes("kepuasan") || p.name.includes("Kepuasan") ? "/5" : "%"}
        </div>
      ))}
    </div>
  );
};

export default function KinerjaPage() {
  const [selectedBranch, setSelectedBranch] = useState("Semua Cabang");
  const [activeBranch, setActiveBranch] = useState("V Phoenix");
  const [lastRefresh, setLastRefresh] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const now = new Date();
    setLastRefresh(now.toLocaleTimeString("id-ID"));
  }, []);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }

  function handleRefresh() {
    const now = new Date();
    setLastRefresh(now.toLocaleTimeString("id-ID"));
    showToast("Data diperbarui!");
  }

  const filtered = selectedBranch === "Semua Cabang"
    ? KARYAWAN_DATA
    : KARYAWAN_DATA.filter(k => k.cabang === selectedBranch);

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(BRANCH_MAPS[activeBranch] ?? activeBranch)}&z=15&output=embed`;

  return (
    <AdminPageShell title="Dashboard Kinerja Karyawan">
      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 999, background: GOLD_GRAD, color: "#1a1305", fontWeight: 700, fontSize: 13, padding: "12px 22px", borderRadius: 12, boxShadow: "0 8px 28px rgba(212,175,55,.4)" }}>
          {toast}
        </div>
      )}

      {/* HEADER */}
      <div style={{ background: PANEL_BG, border: BORDER, borderRadius: 16, padding: "20px 24px", marginBottom: 20, boxShadow: "0 14px 34px rgba(0,0,0,.5)" }}>
        <div className="flex items-center justify-between flex-wrap" style={{ gap: 14 }}>
          <div>
            <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 20, fontWeight: 700, background: GOLD_GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "1px" }}>
              Dashboard Kinerja Karyawan
            </h1>
            <p style={{ fontSize: 12, color: "#776d54", marginTop: 4 }}>KuyKuy Group · Semua Cabang · Data real-time</p>
          </div>
          <div className="flex items-center" style={{ gap: 10 }}>
            <span style={{ fontSize: 11, color: "#776d54" }}>Update: {lastRefresh}</span>
            <button onClick={handleRefresh} className="flex items-center" style={{ gap: 7, padding: "9px 16px", borderRadius: 10, cursor: "pointer", background: "rgba(212,175,55,.1)", border: BORDER, color: GOLD, fontSize: 12.5, fontWeight: 700 }}>
              <RefreshCw size={13} /> Refresh
            </button>
            <a href="/dashboard" style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 16px", borderRadius: 10, background: GOLD_GRAD, color: "#1a1305", fontSize: 12.5, fontWeight: 800, textDecoration: "none" }}>
              <ExternalLink size={13} /> Admin Dashboard
            </a>
          </div>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="flex flex-wrap" style={{ gap: 16, marginBottom: 20 }}>
        <StatCard icon={TrendingUp} label="Total Terapis Aktif" value="28/30" sub="2 sedang cuti" color="#5fae7d" />
        <StatCard icon={Star} label="Rata-rata Rating Karyawan" value="4.8/5.0" sub="↑ 0.2 dari bulan lalu" color={GOLD} />
        <StatCard icon={Target} label="Pencapaian Target Bulanan" value="92%" sub="↑ 4% dari bulan lalu" color="#6fa8d4" />
        <StatCard icon={Zap} label="Produktivitas Rata-rata" value="120%" sub="vs 101% bulan lalu" color="#e8c874" />
      </div>

      {/* CHARTS ROW */}
      <div className="grid grid-cols-2" style={{ gap: 16, marginBottom: 20 }}>
        {/* Line Chart */}
        <div style={{ background: PANEL_BG, border: BORDER, borderRadius: 16, padding: 22, boxShadow: "0 14px 34px rgba(0,0,0,.5)" }}>
          <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 14, fontWeight: 600, color: "#e8d49a", marginBottom: 18 }}>Tren Produktivitas & Kepuasan (6 Bulan)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={trendData} margin={{ top: 4, right: 16, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(212,175,55,.08)" />
              <XAxis dataKey="bulan" tick={{ fill: "#776d54", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fill: "#776d54", fontSize: 10 }} axisLine={false} tickLine={false} unit="%" domain={[80, 130]} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: "#776d54", fontSize: 10 }} axisLine={false} tickLine={false} domain={[4, 5]} />
              <Tooltip content={<CustomTooltip />} />
              <Line yAxisId="left" type="monotone" dataKey="produktivitas" name="Produktivitas" stroke={GOLD} strokeWidth={2.5} dot={{ fill: GOLD, r: 4 }} activeDot={{ r: 6 }} />
              <Line yAxisId="right" type="monotone" dataKey="kepuasan" name="Kepuasan" stroke="#5fae7d" strokeWidth={2.5} dot={{ fill: "#5fae7d", r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center" style={{ gap: 18, marginTop: 10 }}>
            <div className="flex items-center" style={{ gap: 7 }}><span style={{ width: 22, height: 3, borderRadius: 2, background: GOLD, display: "inline-block" }} /><span style={{ fontSize: 11, color: "#9a8f70" }}>Produktivitas (%)</span></div>
            <div className="flex items-center" style={{ gap: 7 }}><span style={{ width: 22, height: 3, borderRadius: 2, background: "#5fae7d", display: "inline-block" }} /><span style={{ fontSize: 11, color: "#9a8f70" }}>Kepuasan (0-5)</span></div>
          </div>
        </div>

        {/* Pie Chart */}
        <div style={{ background: PANEL_BG, border: BORDER, borderRadius: 16, padding: 22, boxShadow: "0 14px 34px rgba(0,0,0,.5)" }}>
          <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 14, fontWeight: 600, color: "#e8d49a", marginBottom: 18 }}>Distribusi Komisi & Bonus (Bulan Ini)</h3>
          <div className="flex items-center" style={{ gap: 20 }}>
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie data={komisiData} cx={85} cy={85} innerRadius={48} outerRadius={82} dataKey="value" stroke="none">
                  {komisiData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
              {komisiData.map(d => (
                <div key={d.name} className="flex items-center" style={{ gap: 10 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 3, background: d.color, display: "inline-block", flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11.5, color: "#c9bfa3", fontWeight: 600 }}>{d.name}</div>
                    <div style={{ fontSize: 11, color: d.color, fontWeight: 700 }}>{d.value}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 14, padding: "12px 14px", borderRadius: 10, background: "rgba(212,175,55,.06)", border: "1px solid rgba(212,175,55,.1)" }}>
            <div style={{ fontSize: 11, color: "#776d54", marginBottom: 4 }}>Total Komisi + Bonus Bulan Ini</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: GOLD, fontFamily: "'Cinzel', serif" }}>Rp 29.950.000</div>
          </div>
        </div>
      </div>

      {/* KINERJA TABLE */}
      <div style={{ background: PANEL_BG, border: BORDER, borderRadius: 16, padding: 22, boxShadow: "0 14px 34px rgba(0,0,0,.5)", marginBottom: 20 }}>
        <div className="flex items-center justify-between flex-wrap" style={{ gap: 12, marginBottom: 18 }}>
          <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 15, fontWeight: 600, color: "#e8d49a", letterSpacing: ".5px" }}>Detail Kinerja Karyawan</h3>
          <div className="flex items-center flex-wrap" style={{ gap: 8 }}>
            {BRANCHES.map(b => (
              <button key={b} onClick={() => setSelectedBranch(b)}
                style={{ padding: "7px 14px", borderRadius: 8, border: selectedBranch === b ? "none" : BORDER, background: selectedBranch === b ? GOLD_GRAD : "transparent", color: selectedBranch === b ? "#1a1305" : "#9a8f70", fontSize: 11.5, fontWeight: selectedBranch === b ? 800 : 500, cursor: "pointer" }}>
                {b}
              </button>
            ))}
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(212,175,55,.12)" }}>
                {["Foto", "Nama", "Cabang", "Status", "Absensi", "Target Harian", "Target Bulanan", "Rating", "Komisi Estimasi"].map(h => (
                  <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: "#5a5238", fontWeight: 600, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((k, i) => {
                const pct = Math.round(k.pencapaianBulanan / k.targetBulanan * 100);
                return (
                  <tr key={k.id} style={{ borderBottom: "1px solid rgba(255,255,255,.03)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,.015)" }}>
                    <td style={{ padding: "12px 12px" }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: GOLD_GRAD, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#1a1305", flexShrink: 0 }}>
                        {initials(k.nama)}
                      </div>
                    </td>
                    <td style={{ padding: "12px 12px", color: "#f3ecda", fontWeight: 600, whiteSpace: "nowrap" }}>{k.nama}</td>
                    <td style={{ padding: "12px 12px", color: "#9a8f70" }}>{k.cabang}</td>
                    <td style={{ padding: "12px 12px" }}>
                      <span style={{ padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700, background: STATUS_COLOR[k.status].bg, color: STATUS_COLOR[k.status].color }}>
                        {k.status}
                      </span>
                    </td>
                    <td style={{ padding: "12px 12px", color: "#c9bfa3", fontWeight: 600 }}>{k.absensi}/30 hr</td>
                    <td style={{ padding: "12px 12px", color: "#c9bfa3" }}>{k.targetHarian} sesi/hr</td>
                    <td style={{ padding: "12px 12px" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <span style={{ fontSize: 11, color: pct >= 100 ? "#5fae7d" : pct >= 80 ? GOLD : "#e0726a", fontWeight: 700 }}>{pct}%</span>
                        <div style={{ width: 80, height: 5, borderRadius: 3, background: "rgba(255,255,255,.06)" }}>
                          <div style={{ width: `${Math.min(pct, 100)}%`, height: "100%", borderRadius: 3, background: pct >= 100 ? "#5fae7d" : pct >= 80 ? GOLD : "#e0726a" }} />
                        </div>
                        <span style={{ fontSize: 10, color: "#5a5238" }}>{k.pencapaianBulanan}/{k.targetBulanan} sesi</span>
                      </div>
                    </td>
                    <td style={{ padding: "12px 12px" }}><Stars val={k.rating} /></td>
                    <td style={{ padding: "12px 12px", color: GOLD, fontWeight: 700, whiteSpace: "nowrap" }}>Rp {k.komisi.toLocaleString("id-ID")}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px 0", color: "#5a5238", fontSize: 13 }}>Tidak ada karyawan di cabang ini.</div>
          )}
        </div>
      </div>

      {/* BOTTOM ROW: Quick Management + Map */}
      <div className="grid grid-cols-2" style={{ gap: 16, marginBottom: 20 }}>
        {/* Quick Management */}
        <div style={{ background: PANEL_BG, border: BORDER, borderRadius: 16, padding: 22, boxShadow: "0 14px 34px rgba(0,0,0,.5)" }}>
          <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 15, fontWeight: 600, color: "#e8d49a", marginBottom: 18, letterSpacing: ".5px" }}>Quick Management</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <button onClick={() => showToast("Fitur penghargaan akan segera tersedia!")}
              className="flex items-center"
              style={{ gap: 14, padding: "14px 16px", borderRadius: 12, cursor: "pointer", background: "rgba(212,175,55,.08)", border: BORDER, color: "#e8d49a", fontSize: 13, fontWeight: 700, textAlign: "left" }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(212,175,55,.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Award size={18} color={GOLD} />
              </div>
              <div>
                <div>Beri Penghargaan Terbaik</div>
                <div style={{ fontSize: 11, color: "#776d54", fontWeight: 400, marginTop: 2 }}>Pilih karyawan bulan ini untuk mendapat reward</div>
              </div>
            </button>
            <a href="/dashboard/staff"
              className="flex items-center"
              style={{ gap: 14, padding: "14px 16px", borderRadius: 12, cursor: "pointer", background: "rgba(95,174,125,.06)", border: "1px solid rgba(95,174,125,.15)", color: "#5fae7d", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(95,174,125,.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <UserPlus size={18} color="#5fae7d" />
              </div>
              <div>
                <div>Undang Terapis Baru</div>
                <div style={{ fontSize: 11, color: "#3a7a55", fontWeight: 400, marginTop: 2 }}>Tambah terapis & atur cabang penempatan</div>
              </div>
            </a>
            <button onClick={() => showToast("Fitur target akan segera tersedia!")}
              className="flex items-center"
              style={{ gap: 14, padding: "14px 16px", borderRadius: 12, cursor: "pointer", background: "rgba(111,168,212,.06)", border: "1px solid rgba(111,168,212,.15)", color: "#6fa8d4", fontSize: 13, fontWeight: 700, textAlign: "left" }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(111,168,212,.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Flag size={18} color="#6fa8d4" />
              </div>
              <div>
                <div>Buat Target Baru</div>
                <div style={{ fontSize: 11, color: "#3a6080", fontWeight: 400, marginTop: 2 }}>Set target harian/bulanan per cabang atau individu</div>
              </div>
            </button>
            <div style={{ marginTop: 4, padding: "12px 14px", borderRadius: 10, background: "rgba(212,175,55,.04)", border: "1px solid rgba(212,175,55,.08)" }}>
              <div style={{ fontSize: 10, color: "#5a5238", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 8 }}>Hubungkan ke Sistem</div>
              <div className="flex flex-wrap" style={{ gap: 8 }}>
                {[
                  { label: "Admin Dashboard", href: "/dashboard" },
                  { label: "Kasir POS", href: "/dashboard/kasir" },
                  { label: "Absensi", href: "/dashboard/absensi" },
                  { label: "Komisi", href: "/dashboard/komisi" },
                ].map(l => (
                  <a key={l.label} href={l.href}
                    style={{ fontSize: 11, color: "#9a8f70", padding: "5px 10px", borderRadius: 6, border: BORDER, textDecoration: "none", fontWeight: 600 }}>
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Branch Map */}
        <div style={{ background: PANEL_BG, border: BORDER, borderRadius: 16, padding: 22, boxShadow: "0 14px 34px rgba(0,0,0,.5)" }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
            <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 15, fontWeight: 600, color: "#e8d49a", letterSpacing: ".5px" }}>Lokasi Cabang</h3>
            <MapPin size={16} color={GOLD} />
          </div>
          <div className="flex flex-wrap" style={{ gap: 6, marginBottom: 12 }}>
            {Object.keys(BRANCH_MAPS).map(b => (
              <button key={b} onClick={() => setActiveBranch(b)}
                style={{ padding: "5px 11px", borderRadius: 7, border: activeBranch === b ? "none" : BORDER, background: activeBranch === b ? GOLD_GRAD : "transparent", color: activeBranch === b ? "#1a1305" : "#776d54", fontSize: 11, fontWeight: activeBranch === b ? 800 : 500, cursor: "pointer" }}>
                {b}
              </button>
            ))}
          </div>
          <div style={{ borderRadius: 12, overflow: "hidden", border: BORDER, height: 240 }}>
            <iframe
              key={activeBranch}
              src={mapSrc}
              width="100%"
              height="240"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a
            href={`https://www.google.com/maps/search/${encodeURIComponent(BRANCH_MAPS[activeBranch] ?? activeBranch)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center"
            style={{ marginTop: 10, gap: 7, fontSize: 12, color: GOLD, fontWeight: 600, textDecoration: "none" }}>
            <ExternalLink size={13} /> Buka Rute di Google Maps — {activeBranch}
          </a>
        </div>
      </div>
    </AdminPageShell>
  );
}
