"use client";
import { useEffect, useRef, useState } from "react";
import AdminPageShell from "@/components/AdminPageShell";
import Logo, { CUSTOM_LOGO_KEY } from "@/components/Logo";
import { Building2, Cog, Image as ImageIcon, Upload, Trash2, Check, ChevronDown } from "lucide-react";

const GOLD = "#d4af37";
const GOLD_GRAD = "linear-gradient(135deg,#f4d886,#d4af37 55%,#b8860b)";
const PANEL_BG = "linear-gradient(155deg,#15110a 0%,#0d0a05 100%)";
const BORDER = "1px solid rgba(212,175,55,.16)";

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,.03)",
  border: "1px solid rgba(212,175,55,.2)",
  borderRadius: 10,
  color: "#f3ecda",
  padding: "10px 13px",
  fontSize: 13,
  outline: "none",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
};

const labelStyle: React.CSSProperties = { fontSize: 11, color: "#9a8f70", display: "block", marginBottom: 6, fontWeight: 500 };

const SETTINGS_KEY = "kuykuy_settings";

type Settings = {
  companyName: string;
  email: string;
  phone: string;
  address: string;
  language: string;
  timezone: string;
  emailNotif: boolean;
  autoBackup: string;
};

const DEFAULT_SETTINGS: Settings = {
  companyName: "Kuykuy Group",
  email: "admin@kuykuy.com",
  phone: "+62 21 555-0100",
  address: "Jakarta Selatan",
  language: "Bahasa Indonesia",
  timezone: "WIB (GMT+7)",
  emailNotif: true,
  autoBackup: "Setiap Hari",
};

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input style={inputStyle} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <div style={{ position: "relative" }}>
        <select style={{ ...inputStyle, appearance: "none", cursor: "pointer" }} value={value} onChange={(e) => onChange(e.target.value)}>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={14} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "#776d54", pointerEvents: "none" }} />
      </div>
    </div>
  );
}

function Toggle({ label, on, onToggle }: { label: string; on: boolean; onToggle: () => void }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <button
        onClick={onToggle}
        className="flex items-center justify-between transition-all"
        style={{ width: "100%", padding: "10px 13px", borderRadius: 10, cursor: "pointer", background: "rgba(255,255,255,.03)", border: "1px solid rgba(212,175,55,.2)", color: on ? "#5fae7d" : "#9a8f70", fontSize: 13, fontWeight: 600 }}
      >
        {on ? "Aktif" : "Nonaktif"}
        <span style={{ width: 40, height: 22, borderRadius: 12, background: on ? GOLD_GRAD : "rgba(255,255,255,.1)", position: "relative", transition: "all .2s", flexShrink: 0 }}>
          <span style={{ position: "absolute", top: 2, left: on ? 20 : 2, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "all .2s", boxShadow: "0 1px 3px rgba(0,0,0,.4)" }} />
        </span>
      </button>
    </div>
  );
}

function SectionCard({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: PANEL_BG, border: BORDER, borderRadius: 16, padding: 22, boxShadow: "0 14px 34px rgba(0,0,0,.5)" }}>
      <div className="flex items-center" style={{ gap: 10, marginBottom: 18 }}>
        <div style={{ width: 32, height: 32, borderRadius: 9, background: "rgba(212,175,55,.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={16} color={GOLD} />
        </div>
        <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 15, fontWeight: 600, color: "#e8d49a", letterSpacing: ".5px" }}>{title}</h3>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>{children}</div>
    </div>
  );
}

export default function PengaturanPage() {
  const [s, setS] = useState<Settings>(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);
  const [logoVersion, setLogoVersion] = useState(0);
  const [hasCustomLogo, setHasCustomLogo] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      try { setS({ ...DEFAULT_SETTINGS, ...JSON.parse(stored) }); } catch {}
    }
    setHasCustomLogo(!!localStorage.getItem(CUSTOM_LOGO_KEY));
  }, []);

  const set = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setS((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  function handleSave() {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function handleLogoFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { alert("File harus berupa gambar (PNG/JPG/SVG)."); return; }
    if (file.size > 1.5 * 1024 * 1024) { alert("Ukuran logo maksimal 1.5 MB."); return; }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      localStorage.setItem(CUSTOM_LOGO_KEY, dataUrl);
      window.dispatchEvent(new Event("kuykuy-logo-updated"));
      setHasCustomLogo(true);
      setLogoVersion((v) => v + 1);
    };
    reader.readAsDataURL(file);
  }

  function resetLogo() {
    localStorage.removeItem(CUSTOM_LOGO_KEY);
    window.dispatchEvent(new Event("kuykuy-logo-updated"));
    setHasCustomLogo(false);
    setLogoVersion((v) => v + 1);
  }

  return (
    <AdminPageShell title="Pengaturan">
      {/* ===== LOGO DASHBOARD ===== */}
      <div style={{ background: PANEL_BG, border: BORDER, borderRadius: 16, padding: 22, boxShadow: "0 14px 34px rgba(0,0,0,.5)" }}>
        <div className="flex items-center" style={{ gap: 10, marginBottom: 18 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: "rgba(212,175,55,.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ImageIcon size={16} color={GOLD} />
          </div>
          <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 15, fontWeight: 600, color: "#e8d49a", letterSpacing: ".5px" }}>Logo Dashboard</h3>
        </div>
        <div className="flex items-center flex-wrap" style={{ gap: 22 }}>
          {/* preview */}
          <div key={logoVersion} style={{ width: 88, height: 88, borderRadius: 16, border: "1px solid rgba(212,175,55,.4)", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 0 18px rgba(212,175,55,.2)", overflow: "hidden" }}>
            <Logo size={70} />
          </div>
          <div className="flex-1" style={{ minWidth: 240 }}>
            <p style={{ fontSize: 13, color: "#c9bfa3", marginBottom: 4, fontWeight: 600 }}>Ganti Logo Aplikasi</p>
            <p style={{ fontSize: 11.5, color: "#776d54", marginBottom: 14, lineHeight: 1.5 }}>Logo akan tampil di sidebar, halaman login, dan struk POS. Format PNG/JPG/SVG, maksimal 1.5 MB. Disarankan gambar persegi dengan latar transparan.</p>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleLogoFile} style={{ display: "none" }} />
            <div className="flex items-center flex-wrap" style={{ gap: 10 }}>
              <button onClick={() => fileRef.current?.click()} className="flex items-center" style={{ gap: 8, padding: "10px 16px", borderRadius: 10, cursor: "pointer", background: GOLD_GRAD, color: "#1a1305", fontSize: 12.5, fontWeight: 800, border: "none", boxShadow: "0 6px 18px rgba(212,175,55,.28)" }}>
                <Upload size={14} /> Upload Logo Baru
              </button>
              {hasCustomLogo && (
                <button onClick={resetLogo} className="flex items-center" style={{ gap: 8, padding: "10px 16px", borderRadius: 10, cursor: "pointer", background: "rgba(192,36,31,.1)", color: "#e0726a", fontSize: 12.5, fontWeight: 700, border: "1px solid rgba(192,36,31,.3)" }}>
                  <Trash2 size={14} /> Kembalikan Logo Default
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ===== PROFIL + SISTEM ===== */}
      <div className="grid grid-cols-2 gap-4" style={{ marginTop: 16 }}>
        <SectionCard icon={Building2} title="Profil Perusahaan">
          <Field label="Nama Perusahaan" value={s.companyName} onChange={(v) => set("companyName", v)} placeholder="Nama perusahaan" />
          <Field label="Email" value={s.email} onChange={(v) => set("email", v)} placeholder="email@perusahaan.com" />
          <Field label="Telepon" value={s.phone} onChange={(v) => set("phone", v)} placeholder="+62 ..." />
          <Field label="Alamat" value={s.address} onChange={(v) => set("address", v)} placeholder="Alamat kantor pusat" />
        </SectionCard>

        <SectionCard icon={Cog} title="Pengaturan Sistem">
          <SelectField label="Bahasa" value={s.language} onChange={(v) => set("language", v)} options={["Bahasa Indonesia", "English"]} />
          <SelectField label="Zona Waktu" value={s.timezone} onChange={(v) => set("timezone", v)} options={["WIB (GMT+7)", "WITA (GMT+8)", "WIT (GMT+9)"]} />
          <Toggle label="Notifikasi Email" on={s.emailNotif} onToggle={() => set("emailNotif", !s.emailNotif)} />
          <SelectField label="Backup Otomatis" value={s.autoBackup} onChange={(v) => set("autoBackup", v)} options={["Setiap Hari", "Setiap Minggu", "Setiap Bulan", "Nonaktif"]} />
        </SectionCard>
      </div>

      {/* ===== SAVE ===== */}
      <div className="mt-4 flex items-center justify-end" style={{ gap: 14 }}>
        {saved && (
          <span className="flex items-center" style={{ gap: 7, fontSize: 12.5, color: "#5fae7d", fontWeight: 600 }}>
            <Check size={15} /> Pengaturan tersimpan
          </span>
        )}
        <button onClick={handleSave} className="flex items-center" style={{ gap: 8, padding: "11px 24px", borderRadius: 12, cursor: "pointer", background: GOLD_GRAD, color: "#1a1305", fontSize: 13, fontWeight: 800, letterSpacing: ".5px", border: "none", boxShadow: "0 6px 20px rgba(212,175,55,.3)" }}>
          <Check size={15} /> Simpan Pengaturan
        </button>
      </div>
    </AdminPageShell>
  );
}
