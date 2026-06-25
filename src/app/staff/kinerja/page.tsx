"use client";
import Link from "next/link";

const GOLD = "#caa23d";
const GOLD_LIGHT = "#f6dd8c";
const GOLD_DARK = "#9a6e1f";
const CARD_BG = "linear-gradient(160deg,#1b1b1e,#121214)";
const CARD_BORDER = "1px solid rgba(202,162,61,.2)";

const weekData = [
  { day: "Sen", val: 2 },
  { day: "Sel", val: 4 },
  { day: "Rab", val: 3 },
  { day: "Kam", val: 5 },
  { day: "Jum", val: 3 },
  { day: "Sab", val: 4 },
  { day: "Min", val: 3 },
];

export default function KinerjaPage() {
  const dailyActual = 3;
  const dailyTarget = 5;
  const monthlyActual = 30;
  const monthlyTarget = 100;
  const dailyPct = Math.round((dailyActual / dailyTarget) * 100);
  const monthlyPct = Math.round((monthlyActual / monthlyTarget) * 100);
  const maxVal = Math.max(...weekData.map(d => d.val));
  const todayIdx = 6;

  return (
    <div style={{ padding: "52px 20px 20px" }}>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <Link href="/staff/dashboard" style={{
          width: 38, height: 38, borderRadius: 12,
          background: CARD_BG, border: CARD_BORDER,
          display: "flex", alignItems: "center", justifyContent: "center",
          textDecoration: "none", color: GOLD, fontSize: 16,
        }}>←</Link>
        <div>
          <div style={{ fontSize: 20, fontWeight: 600, color: "#f3ead4", fontFamily: "'Cinzel',serif", letterSpacing: "0.05em" }}>KINERJA</div>
          <div style={{ fontSize: 11, color: "#5a5448", marginTop: 1 }}>Performa & Statistik</div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

        {/* DONUT */}
        <div style={{ background: CARD_BG, border: CARD_BORDER, borderRadius: 20, padding: 20, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(202,162,61,.3),transparent)" }} />
          <div style={{ fontSize: 10, color: "rgba(202,162,61,.55)", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "'Cinzel',serif", marginBottom: 16 }}>Target Harian</div>

          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ position: "relative", width: 100, height: 100, flexShrink: 0 }}>
              <div style={{
                width: 100, height: 100, borderRadius: "50%",
                background: `conic-gradient(${GOLD_LIGHT} 0 ${dailyPct}%, #2c2c30 ${dailyPct}% 100%)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 24px rgba(246,221,140,.15)",
              }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#121214", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 18, fontWeight: 700, color: GOLD_LIGHT, fontFamily: "'Cinzel',serif", lineHeight: 1 }}>{dailyPct}%</span>
                  <span style={{ fontSize: 9, color: "#5a5448", marginTop: 2 }}>selesai</span>
                </div>
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: "#7a7060", marginBottom: 4 }}>Progress hari ini</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 10 }}>
                <span style={{ fontSize: 36, fontWeight: 700, color: GOLD_LIGHT, fontFamily: "'Cinzel',serif", lineHeight: 1 }}>{dailyActual}</span>
                <span style={{ fontSize: 15, color: "#4a4640" }}>/ {dailyTarget}</span>
                <span style={{ fontSize: 12, color: "#4a4640" }}>Customer</span>
              </div>
              <div style={{ height: 5, background: "rgba(202,162,61,.1)", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${dailyPct}%`, background: `linear-gradient(90deg,${GOLD_DARK},${GOLD_LIGHT})`, borderRadius: 99 }} />
              </div>
              <div style={{ fontSize: 11, color: "#4a4640", marginTop: 6 }}>{dailyTarget - dailyActual} customer lagi untuk capai target</div>
            </div>
          </div>
        </div>

        {/* 7-DAY BAR CHART */}
        <div style={{ background: CARD_BG, border: CARD_BORDER, borderRadius: 20, padding: 20 }}>
          <div style={{ fontSize: 10, color: "rgba(202,162,61,.55)", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "'Cinzel',serif", marginBottom: 18 }}>Riwayat 7 Hari</div>

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 6, height: 90 }}>
            {weekData.map((d, i) => {
              const isToday = i === todayIdx;
              const heightPct = (d.val / maxVal) * 100;
              return (
                <div key={d.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, height: "100%" }}>
                  <div style={{ fontSize: 9, color: isToday ? GOLD_LIGHT : "#4a4640", fontWeight: isToday ? 700 : 400 }}>{d.val}</div>
                  <div style={{ flex: 1, width: "100%", background: "#2a2a2e", borderRadius: 99, overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
                    <div style={{
                      width: "100%",
                      height: `${heightPct}%`,
                      background: isToday
                        ? `linear-gradient(180deg,${GOLD_LIGHT},${GOLD_DARK})`
                        : "linear-gradient(180deg,rgba(202,162,61,.5),rgba(154,110,31,.3))",
                      borderRadius: 99,
                      boxShadow: isToday ? "0 0 10px rgba(246,221,140,.4)" : undefined,
                    }} />
                  </div>
                  <div style={{ fontSize: 9, color: isToday ? GOLD : "#4a4640", fontWeight: isToday ? 700 : 400 }}>{d.day}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* MONTHLY TARGET */}
        <div style={{ background: CARD_BG, border: CARD_BORDER, borderRadius: 20, padding: 20 }}>
          <div style={{ fontSize: 10, color: "rgba(202,162,61,.55)", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "'Cinzel',serif", marginBottom: 14 }}>Target Bulanan</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
              <span style={{ fontSize: 28, fontWeight: 700, color: GOLD_LIGHT, fontFamily: "'Cinzel',serif" }}>{monthlyActual}</span>
              <span style={{ fontSize: 14, color: "#4a4640" }}>/ {monthlyTarget}</span>
            </div>
            <span style={{ fontSize: 13, color: GOLD, fontWeight: 700 }}>{monthlyPct}%</span>
          </div>
          <div style={{ height: 10, background: "rgba(202,162,61,.08)", borderRadius: 99, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${monthlyPct}%`, background: `linear-gradient(90deg,${GOLD_DARK},${GOLD_LIGHT})`, borderRadius: 99 }} />
          </div>
          <div style={{ fontSize: 11, color: "#4a4640", marginTop: 8 }}>{monthlyTarget - monthlyActual} customer lagi hingga akhir bulan</div>
        </div>

        {/* 3 STAT CARDS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
          {[
            { label: "Rating", value: "4.9", sub: "★ Pelanggan", color: GOLD_LIGHT },
            { label: "Streak", value: "12", sub: "Hari berturut", color: "#6c9ef5" },
            { label: "Komisi", value: "45k", sub: "Hari ini", color: "#2fb16b" },
          ].map(({ label, value, sub, color }) => (
            <div key={label} style={{ background: CARD_BG, border: CARD_BORDER, borderRadius: 18, padding: "16px 12px" }}>
              <div style={{ fontSize: 22, fontWeight: 700, color, fontFamily: "'Cinzel',serif", lineHeight: 1 }}>{value}</div>
              <div style={{ fontSize: 10, color: "#5a5448", marginTop: 4 }}>{label}</div>
              <div style={{ fontSize: 9, color: "#3a3830", marginTop: 2 }}>{sub}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
