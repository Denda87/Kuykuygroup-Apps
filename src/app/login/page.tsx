"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { login } from "@/lib/auth";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

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
    <div className="min-h-screen flex flex-col" style={{background: "linear-gradient(160deg, #0a0a0a 0%, #1a1200 50%, #0a0a0a 100%)"}}>
      {/* Premium Header Banner */}
      <div className="relative flex flex-col items-center justify-center pt-16 pb-10 px-4">
        <div className="absolute inset-0" style={{background: "linear-gradient(180deg, #D4AF3710 0%, transparent 100%)"}} />
        <div className="relative">
          <div className="absolute -inset-4 rounded-full" style={{background: "radial-gradient(circle, #D4AF3730 0%, transparent 70%)"}} />
          <Logo size={100} />
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#D4AF37] mt-4 tracking-widest">Welcome Back</h1>
        <p className="text-gray-500 text-sm mt-1 tracking-wider">KUYKUY GROUP</p>
      </div>

      {/* Form Card */}
      <div className="flex-1 px-6 pb-10">
        <div className="rounded-3xl border border-[#D4AF37]/30 p-7" style={{background: "linear-gradient(145deg, #161616, #111)", boxShadow: "0 0 40px #D4AF3715"}}>
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs text-[#D4AF37] mb-2 tracking-widest uppercase">Email / No. Handphone</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/60" />
                <input
                  type="text"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-4 rounded-2xl text-white text-sm focus:outline-none transition-all placeholder:text-gray-600"
                  style={{background: "#0d0d0d", border: "1px solid #D4AF3740"}}
                  placeholder="staff@kuykuy.com"
                  required
                />
              </div>
            </div>
            {/* Password */}
            <div>
              <label className="block text-xs text-[#D4AF37] mb-2 tracking-widest uppercase">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/60" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-4 rounded-2xl text-white text-sm focus:outline-none transition-all placeholder:text-gray-600"
                  style={{background: "#0d0d0d", border: "1px solid #D4AF3740"}}
                  placeholder="••••••••"
                  required
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#D4AF37]">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 font-bold text-black rounded-2xl text-sm uppercase tracking-widest disabled:opacity-60 mt-2"
              style={{background: "linear-gradient(135deg, #C9A84C, #D4AF37, #B8960C)", boxShadow: "0 4px 20px #D4AF3740"}}
            >
              {loading ? "Memuat..." : "LOGIN"}
            </button>
          </form>
          <div className="mt-6 pt-5 border-t border-[#D4AF37]/10 text-center text-xs text-gray-600 space-y-1">
            <p>Staff: staff@kuykuy.com / kuykuy123</p>
            <p>Admin: admin@kuykuy.com / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
