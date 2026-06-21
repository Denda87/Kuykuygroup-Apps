"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { login } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    await new Promise(r => setTimeout(r, 600));
    const user = login(email, password);
    if (!user) {
      setError("Email atau password salah.");
      setLoading(false);
      return;
    }
    router.push(user.role === "admin" ? "/dashboard" : "/staff/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Logo size={90} />
          <h1 className="text-2xl font-bold mt-4 text-white">Welcome Back</h1>
          <p className="text-gray-500 text-sm mt-1">Masuk ke akun Kuykuy Anda</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Email / No. Handphone"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-[#111] border border-[#C9A84C33] rounded-lg px-10 py-3.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#C9A84C] transition-colors"
              required
            />
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type={showPw ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-[#111] border border-[#C9A84C33] rounded-lg px-10 py-3.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#C9A84C] transition-colors"
              required
            />
            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button type="submit" disabled={loading} className="gold-btn w-full py-4 rounded-lg text-black font-bold tracking-widest">
            {loading ? "MEMPROSES..." : "LOGIN"}
          </button>
        </form>

        <div className="mt-8 p-4 bg-[#111] rounded-lg border border-[#C9A84C22] text-xs text-gray-600">
          <p className="font-semibold text-gray-500 mb-2">Demo credentials:</p>
          <p>Staff: staff@kuykuy.com / kuykuy123</p>
          <p>Admin: admin@kuykuy.com / admin123</p>
        </div>

        <div className="text-center mt-6">
          <a href="/" className="text-[#C9A84C] text-sm hover:underline">← Kembali ke Website</a>
        </div>
      </div>
    </div>
  );
}
