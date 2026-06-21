"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { login } from "@/lib/auth";
import { Eye, EyeOff, Mail, Lock, LayoutGrid, ClipboardList, BarChart2, User } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    await new Promise(r => setTimeout(r, 600));
    const user = login(email, password);
    if (user) {
      router.push(user.role === "admin" ? "/dashboard" : "/staff/dashboard");
    } else {
      setError("Email atau password salah.");
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(160deg, #0f0f00 0%, #0a0a0a 40%, #0f0f00 100%)" }}
    >
      {/* ===== LOGO AREA ===== */}
      <div
        className="flex flex-col items-center justify-center pt-12 pb-6 px-6"
        style={{
          background: "linear-gradient(180deg, #1c1400 0%, #0a0a0a 100%)",
          borderBottom: "1.5px solid #D4AF3730",
        }}
      >
        <div style={{ filter: "drop-shadow(0 0 18px #D4AF3750)" }}>
          <Logo size={90} />
        </div>
        <h1 className="font-serif text-2xl font-bold mt-4 tracking-widest" style={{ color: "#D4AF37" }}>
          Welcome Back
        </h1>
        <div className="mt-1 w-16 h-0.5 rounded-full" style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }} />
      </div>

      {/* ===== FORM AREA ===== */}
      <div className="flex-1 px-6 pt-8 pb-6 flex flex-col gap-4">
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {/* Email */}
          <div>
            <div
              className="flex items-center gap-3 rounded-2xl px-4 py-3"
              style={{ background: "#111", border: "1px solid #D4AF3740" }}
            >
              <Mail size={18} color="#D4AF3780" />
              <input
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder:text-gray-600"
                placeholder="Email / No. Handphone"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div
              className="flex items-center gap-3 rounded-2xl px-4 py-3"
              style={{ background: "#111", border: "1px solid #D4AF3740" }}
            >
              <Lock size={18} color="#D4AF3780" />
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder:text-gray-600"
                placeholder="Password"
                required
              />
              <button type="button" onClick={() => setShowPass(!showPass)}>
                {showPass ? <EyeOff size={16} color="#666" /> : <Eye size={16} color="#666" />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-400 text-xs text-center">{error}</p>}

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 font-bold text-black rounded-2xl text-sm uppercase tracking-[0.25em] disabled:opacity-60"
            style={{
              background: "linear-gradient(135deg, #C9A84C 0%, #f5e070 40%, #D4AF37 60%, #B8960C 100%)",
              boxShadow: "0 4px 24px #D4AF3750",
            }}
          >
            {loading ? "Memuat..." : "LOGIN"}
          </button>
        </form>

        {/* Demo credentials */}
        <div className="text-center text-xs text-gray-700 space-y-0.5 mt-2">
          <p>Staff: staff@kuykuy.com / kuykuy123</p>
          <p>Admin: admin@kuykuy.com / admin123</p>
        </div>
      </div>

      {/* ===== BOTTOM NAV (decorative) ===== */}
      <div
        className="flex justify-around items-center py-3 px-4"
        style={{ borderTop: "1.5px solid #D4AF3730", background: "#0a0a0a" }}
      >
        {[{ icon: LayoutGrid, label: "Dashboard" }, { icon: ClipboardList, label: "Absensi" }, { icon: BarChart2, label: "Kinerja" }, { icon: User, label: "Profile" }].map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-0.5">
            <Icon size={20} color="#444" strokeWidth={1.8} />
            <span className="text-[10px] text-gray-700 tracking-wider">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
