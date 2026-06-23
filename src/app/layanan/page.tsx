import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

const GOLD = "linear-gradient(135deg, #C9A84C, #f5e070, #B8960C)";
const GOLD_COLOR = "#D4AF37";
const BG = "#08070a";

type Service = {
  name: string;
  price: string;
  duration: string;
  description: string;
  emoji: string;
  image: string;
};

const SERVICES: Service[] = [
  {
    name: "Express",
    price: "Rp 330.000",
    duration: "45 mnt",
    description: "Layanan cepat dan efisien untuk relaksasi singkat. Cocok untuk kamu yang butuh segar di tengah kesibukan.",
    emoji: "⚡",
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&q=80",
  },
  {
    name: "Kuy",
    price: "Rp 400.000 / 430.000",
    duration: "60 / 90 mnt",
    description: "Paket andalan Kuykuy Group. Pijat relaksasi menyeluruh dengan teknik tradisional pilihan.",
    emoji: "🌸",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80",
  },
  {
    name: "Exclume",
    price: "Rp 550.000",
    duration: "90 mnt",
    description: "Pengalaman premium eksklusif dengan minyak esensial pilihan dan teknik pijat terapeutik mendalam.",
    emoji: "✨",
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80",
  },
  {
    name: "DShoot",
    price: "Rp 650.000",
    duration: "120 mnt",
    description: "Paket mewah terlengkap — kombinasi pijat relaksasi, scrub, dan perawatan wajah dalam satu sesi.",
    emoji: "💎",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80",
  },
];

export default function LayananPage() {
  return (
    <div style={{ background: BG, minHeight: "100vh", color: "#e8d9b0" }}>
      <SiteNav />

      {/* Hero */}
      <section
        style={{
          paddingTop: 72,
          background: "linear-gradient(160deg, #12100a 0%, #1a1500 50%, #08070a 100%)",
          borderBottom: "1px solid rgba(212,175,55,0.15)",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "80px 24px 72px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.3em",
              color: GOLD_COLOR,
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Kuykuy Group
          </p>
          <h1
            style={{
              fontSize: "clamp(36px, 6vw, 64px)",
              fontWeight: 900,
              letterSpacing: "0.1em",
              background: GOLD,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: 18,
            }}
          >
            LAYANAN KAMI
          </h1>
          <p style={{ fontSize: 17, color: "#8a7a50", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
            Pilih layanan spa premium yang sesuai kebutuhan Anda
          </p>
        </div>
      </section>

      {/* Ikon ringkas */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "72px 24px 0" }}>
        <h2
          style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.2em",
            color: GOLD_COLOR,
            textTransform: "uppercase",
            textAlign: "center",
            marginBottom: 48,
          }}
        >
          Pilihan Layanan
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "center" }}>
          {SERVICES.map((s) => (
            <div key={s.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 148,
                  height: 148,
                  borderRadius: "50%",
                  overflow: "hidden",
                  position: "relative",
                  border: "2px solid rgba(212,175,55,0.35)",
                  boxShadow: "0 0 24px rgba(212,175,55,0.12)",
                }}
              >
                <img
                  src={s.image}
                  alt={s.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                    padding: 8,
                    background: "linear-gradient(to top, rgba(8,7,10,0.55) 0%, transparent 60%)",
                  }}
                >
                  <span style={{ fontSize: 22 }}>{s.emoji}</span>
                </div>
              </div>
              <span style={{ fontSize: 14, color: "#c8b88a", fontWeight: 700, textAlign: "center", maxWidth: 120, letterSpacing: "0.05em" }}>
                {s.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Kartu harga */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "72px 24px" }}>
        <h2
          style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.2em",
            color: GOLD_COLOR,
            textTransform: "uppercase",
            textAlign: "center",
            marginBottom: 48,
          }}
        >
          Menu &amp; Harga
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 28,
          }}
        >
          {SERVICES.map((s) => (
            <div
              key={s.name}
              style={{
                background: "linear-gradient(160deg, #13110c, #0e0c07)",
                border: "1px solid rgba(212,175,55,0.15)",
                borderRadius: 16,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ position: "relative", height: 200 }}>
                <img
                  src={s.image}
                  alt={s.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(8,7,10,0.7) 0%, transparent 50%)",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: 14,
                    right: 14,
                    fontSize: 26,
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.6))",
                  }}
                >
                  {s.emoji}
                </span>
              </div>
              <div style={{ padding: "24px 22px", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: "#e8d9b0", letterSpacing: "0.05em" }}>{s.name}</h3>
                  <span
                    style={{
                      fontSize: 11,
                      color: "#6b5f3e",
                      background: "rgba(212,175,55,0.08)",
                      padding: "4px 10px",
                      borderRadius: 20,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {s.duration}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: "#6b5f3e", lineHeight: 1.7, flex: 1 }}>{s.description}</p>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    background: GOLD,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    marginTop: 4,
                  }}
                >
                  {s.price}
                </div>
                <Link
                  href="/booking"
                  style={{
                    display: "block",
                    textAlign: "center",
                    padding: "11px 0",
                    background: GOLD,
                    color: "#08070a",
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: "0.06em",
                    borderRadius: 8,
                    textDecoration: "none",
                    marginTop: 8,
                  }}
                >
                  Pesan Sekarang
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: "linear-gradient(135deg, #1a1500 0%, #0e0c07 100%)",
          borderTop: "1px solid rgba(212,175,55,0.12)",
          borderBottom: "1px solid rgba(212,175,55,0.12)",
          padding: "72px 24px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(24px, 4vw, 40px)",
            fontWeight: 800,
            background: GOLD,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: 16,
          }}
        >
          Siap Merasakan Relaksasi?
        </h2>
        <p style={{ color: "#6b5f3e", fontSize: 16, marginBottom: 32 }}>
          Booking sekarang dan nikmati pengalaman spa premium kami
        </p>
        <Link
          href="/booking"
          style={{
            display: "inline-block",
            padding: "14px 40px",
            background: GOLD,
            color: "#08070a",
            fontWeight: 700,
            fontSize: 15,
            letterSpacing: "0.08em",
            borderRadius: 8,
            textDecoration: "none",
            boxShadow: "0 4px 24px rgba(212,175,55,0.35)",
          }}
        >
          Pesan Sekarang
        </Link>
      </section>

      <SiteFooter />
    </div>
  );
}
