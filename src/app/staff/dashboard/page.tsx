"use client";
import { getUser } from "@/lib/auth";
import { getMyRecord } from "@/lib/store";
import { useEffect, useState } from "react";
import Link from "next/link";

const GOLD = "#caa23d";
const GOLD_LIGHT = "#f6dd8c";
const GOLD_DARK = "#9a6e1f";
const GOLD_GRAD = `linear-gradient(150deg,#7c5418,#c8902b,#f7e08c,#c8902b,#7c5418)`;
const CARD_BG = "linear-gradient(160deg,#1b1b1e,#121214)";
const CARD_BORDER = `1px solid rgba(202,162,61,.2)`;

const schedule = [
  { time: "09:00", name: "Rina Kusuma", service: "Reflexologi Kaki", duration: "60 mnt", done: true },
  { time: "10:30", name: "Dodi Pratama", service: "Full Body Massage", duration: "90 mnt", done: true },
  { time: "13:00", name: "Sari Wulandari", service: "Hot Stone Therapy", duration: "90 mnt", done: true },
  { time: "15:00", name: "Budi Haryono", service: "Lulur Premium", duration: "120 mnt", done: false },
  { time: "16:30", name: "Lina Agustina", service: "Reflexologi Kaki", duration: "60 mnt", done: false },
];

function formatRp(n: number) {
  if (n >= 1000000) return `Rp ${(n / 1000000).toFixed(1)}jt`;
  if (n >= 1000) return `Rp ${Math.round(n / 1000)}k`;
  return `Rp ${n}`;
}

export default function StaffDashboard() {
  const [user, setUser] = useState<{ name: string; email: string; branch: string; staffId: string; jobRole: string } | null>(null);
  const [record, setRecord] = useState<ReturnType<typeof getMyRecord>>(undefined);
  const [now, setNow] = useState("");

  useEffect(() => {
    const u = getUser();
    setUser(u as typeof user);
    if (u?.staffId) setRecord(getMyRecord(u.staffId));
    const tick = () => {
      const d = new Date();
      setNow(d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }));
    };
    tick();
    const t = setInterval(tick, 10000);
    return () => clearInterval(t);
  }, []);

  const name = user?.name || "Budi Santoso";
  const jobRole = user?.jobRole || "Therapist";
  const branch = record?.branch || user?.branch || "Strawberry Spa & Therapy";
  const customers = record?.customersToday ?? 3;
  const target = record?.targetDaily ?? 5;
  const pct = Math.round((customers / target) * 100);
  const komisi = customers * 15000;
  const checkedIn = record?.checkedIn ?? false;
  const doneCount = schedule.filter(s => s.done).length;

  const today = new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div style={{ paddingBottom: 20 }}>

      {/* ── HEADER ── */}
      <div style={{ padding: "52px 20px 20px", position: "relative" }}>
        {/* gold glow top */}
        <div style={{ position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)", width: 300, height: 200, background: "radial-gradient(closest-side,rgba(202,162,61,.25),transparent)", pointerEvents: "none" }} />

        {/* top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: "0.3em", color: "rgba(202,162,61,.6)", textTransform: "uppercase", fontFamily: "'Cinzel',serif" }}>Kuykuy Group</div>
            <div style={{ fontSize: 12, color: GOLD, fontWeight: 600, marginTop: 2 }}>Staff Portal</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#f3ead4", fontFamily: "'Cinzel',serif", letterSpacing: 2 }}>{now}</div>
              <div style={{ fontSize: 10, color: "#5a5448", marginTop: 1 }}>{today}</div>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(160deg,#1e1c18,#111)", border: `1px solid rgba(202,162,61,.22)`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
              </div>
              <div style={{ position: "absolute", top: -2, right: -2, width: 15, height: 15, borderRadius: "50%", background: "#c0392b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700, color: "#fff", border: "2px solid #0a0a0b" }}>2</div>
            </div>
          </div>
        </div>

        {/* ── PROFILE CARD ── */}
        <div style={{ background: CARD_BG, border: CARD_BORDER, borderRadius: 20, padding: "18px 18px 16px", position: "relative", overflow: "hidden" }}>
          {/* shimmer line */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,rgba(202,162,61,.35),transparent)` }} />

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* Avatar */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div style={{
                width: 72, height: 72, borderRadius: "50%",
                background: "linear-gradient(160deg,#2a2820,#181614)",
                border: `2.5px solid ${GOLD}`,
                boxShadow: `0 0 20px rgba(202,162,61,.35)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 28, fontWeight: 700, color: GOLD_LIGHT,
                fontFamily: "'Cinzel',serif",
              }}>
                {name.charAt(0)}
              </div>
              <div style={{
                position: "absolute", bottom: 2, right: 2, width: 14, height: 14, borderRadius: "50%",
                background: checkedIn ? "#2fb16b" : "#c0392b",
                border: "2px solid #121214",
                animation: checkedIn ? "kkBreathe 2.5s ease-in-out infinite" : undefined,
              }} />
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 10, color: "rgba(202,162,61,.55)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 3 }}>Welcome back</div>
              <div style={{ fontSize: 20, fontWeight: 600, color: "#f3ead4", fontFamily: "'Cinzel',serif", lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 6 }}>
                <span style={{
                  fontSize: 10, padding: "3px 10px", borderRadius: 20,
                  background: GOLD_GRAD, color: "#2a1d05",
                  fontWeight: 800, letterSpacing: "0.08em",
                }}>
                  {jobRole === "Therapist" ? "Therapist Elite" : jobRole}
                </span>
                <span style={{ fontSize: 11, color: "rgba(202,162,61,.7)", display: "flex", alignItems: "center", gap: 3 }}>
                  ★ 4.9
                </span>
              </div>
            </div>
          </div>

          {/* Branch location */}
          <div style={{ marginTop: 14, padding: "10px 12px", borderRadius: 12, background: "rgba(202,162,61,.05)", border: "1px solid rgba(202,162,61,.12)", display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            <span style={{ fontSize: 12, color: "#7a7060" }}>{branch}</span>
            <div style={{ marginLeft: "auto", fontSize: 10, padding: "2px 8px", borderRadius: 8, background: checkedIn ? "rgba(47,177,107,.12)" : "rgba(192,57,43,.12)", color: checkedIn ? "#2fb16b" : "#c0392b", fontWeight: 700 }}>
              {checkedIn ? "Hadir" : "Absen"}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 14 }}>

        {/* ── 3 STAT PILLS ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
          {[
            { label: "Rating", value: "4.9", suffix: "★" },
            { label: "Komisi", value: formatRp(komisi), suffix: "" },
            { label: "Target", value: `${pct}%`, suffix: "" },
          ].map(({ label, value, suffix }) => (
            <div key={label} style={{ background: CARD_BG, border: CARD_BORDER, borderRadius: 15, padding: "14px 12px", textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: GOLD_LIGHT, fontFamily: "'Cinzel',serif", lineHeight: 1 }}>{value}<span style={{ fontSize: 14 }}>{suffix}</span></div>
              <div style={{ fontSize: 10, color: "#5a5448", marginTop: 4, letterSpacing: "0.05em" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* ── PROGRESS TARGET ── */}
        <div style={{ background: CARD_BG, border: CARD_BORDER, borderRadius: 20, padding: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 10, color: "rgba(202,162,61,.55)", letterSpacing: "0.25em", textTransform: "uppercase", fontFamily: "'Cinzel',serif" }}>Target Hari Ini</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 5, marginTop: 5 }}>
                <span style={{ fontSize: 28, fontWeight: 700, color: GOLD_LIGHT, fontFamily: "'Cinzel',serif" }}>{customers}</span>
                <span style={{ fontSize: 14, color: "#4a4640" }}>/ {target} Customer</span>
              </div>
            </div>
            {/* Donut */}
            <div style={{ position: "relative", width: 64, height: 64, flexShrink: 0 }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: `conic-gradient(${GOLD_LIGHT} 0 ${pct}%, #2c2c30 ${pct}% 100%)`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{ width: 46, height: 46, borderRadius: "50%", background: "#121214", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: GOLD_LIGHT, fontFamily: "'Cinzel',serif" }}>{pct}%</span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ height: 6, background: "rgba(202,162,61,.1)", borderRadius: 99, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg,${GOLD_DARK},${GOLD_LIGHT})`, borderRadius: 99, transition: "width .5s" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <span style={{ fontSize: 11, color: "#4a4640" }}>{target - customers} lagi untuk target</span>
            <span style={{ fontSize: 11, color: "#2fb16b", fontWeight: 600 }}>+{formatRp(komisi)} komisi</span>
          </div>
        </div>

        {/* ── QUICK ACTIONS ── */}
        <div>
          <div style={{ fontSize: 10, color: "rgba(202,162,61,.5)", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "'Cinzel',serif", marginBottom: 10 }}>Menu</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
            {[
              { href: "/staff/absensi", label: "Absensi", icon: "✓", color: "#2fb16b" },
              { href: "/staff/kinerja", label: "Kinerja", icon: "◈", color: "#6c9ef5" },
              { href: "/staff/profile", label: "Profil", icon: "◉", color: GOLD },
              { href: "/staff/settings", label: "Setting", icon: "⚙", color: "#a07040" },
            ].map(({ href, label, icon, color }) => (
              <Link key={href} href={href} style={{ textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "14px 8px", background: CARD_BG, border: CARD_BORDER, borderRadius: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", background: `${color}18`, fontSize: 18, color }}>
                  {icon}
                </div>
                <span style={{ fontSize: 10, color: "#7a7060", textAlign: "center" }}>{label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* ── JADWAL HARI INI ── */}
        <div style={{ background: CARD_BG, border: CARD_BORDER, borderRadius: 20, padding: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 10, color: "rgba(202,162,61,.55)", letterSpacing: "0.25em", textTransform: "uppercase", fontFamily: "'Cinzel',serif" }}>Jadwal Hari Ini</div>
              <div style={{ fontSize: 12, color: "#4a4640", marginTop: 3 }}>{doneCount} dari {schedule.length} sesi selesai</div>
            </div>
            <Link href="/staff/kinerja" style={{ fontSize: 11, color: GOLD, textDecoration: "none", fontWeight: 600 }}>Lihat semua →</Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {schedule.map((s, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
                borderRadius: 14, border: `1px solid ${s.done ? "rgba(255,255,255,.04)" : "rgba(202,162,61,.18)"}`,
                background: s.done ? "rgba(255,255,255,.02)" : "rgba(202,162,61,.04)",
                opacity: s.done ? 0.5 : 1,
              }}>
                <div style={{ textAlign: "center", minWidth: 38 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: s.done ? "#3a3830" : GOLD_LIGHT, fontFamily: "'Cinzel',serif" }}>{s.time}</div>
                </div>
                <div style={{ width: 1, height: 32, background: s.done ? "#2a2820" : "rgba(202,162,61,.25)", flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: s.done ? "#3a3830" : "#f3ead4", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: "#4a4640" }}>{s.service} · {s.duration}</div>
                </div>
                {s.done
                  ? <span style={{ fontSize: 16, color: "#2fb16b" }}>✓</span>
                  : <span style={{ fontSize: 9, padding: "3px 8px", borderRadius: 8, background: "rgba(202,162,61,.12)", color: GOLD, fontWeight: 700, whiteSpace: "nowrap" }}>Akan Datang</span>}
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes kkBreathe {
          0%,100% { box-shadow: 0 0 0 0 rgba(47,177,107,.5); }
          50% { box-shadow: 0 0 0 6px rgba(47,177,107,0); }
        }
      `}</style>
    </div>
  );
}
