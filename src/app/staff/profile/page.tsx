"use client";
import { getUser, logout } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Phone, TrendingUp, Award, LogOut } from "lucide-react";
import GoldHeader from "@/components/GoldHeader";

export default function ProfilePage() {
  const router = useRouter();
  const user = getUser();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="pb-2">
      <GoldHeader title="PROFILE" />

      <div className="px-4 space-y-3">
        {/* Avatar & Info */}
        <div className="rounded-2xl p-6 text-center" style={{background: "linear-gradient(135deg, #1a1a0d, #161616)", border: "1px solid #D4AF3730"}}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-black font-bold text-3xl mx-auto mb-3" style={{background: "linear-gradient(135deg, #C9A84C, #D4AF37, #B8960C)", boxShadow: "0 0 20px #D4AF3740"}}>
            {user?.name?.charAt(0) || "B"}
          </div>
          <h2 className="font-serif text-xl font-bold mb-1">{user?.name || "Budi Santoso"}</h2>
          <p className="text-sm" style={{color: "#D4AF37"}}>Therapist</p>
          <p className="text-gray-600 text-xs mt-1">{user?.email}</p>
        </div>

        {/* Info Cards */}
        <div className="space-y-2">
          {[
            { icon: Phone, label: "Nomor HP", value: "+62 812-3356-7890" },
            { icon: TrendingUp, label: "Total Hari Ini", value: "3 Customer" },
            { icon: Award, label: "Performa Bulanan", value: "85 Customer" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-xl p-4 flex items-center gap-4" style={{background: "#111", border: "1px solid #D4AF3720"}}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background: "#D4AF3715"}}>
                <Icon size={18} style={{color: "#D4AF37"}} />
              </div>
              <div>
                <p className="text-gray-500 text-xs">{label}</p>
                <p className="font-medium text-sm">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full py-4 font-bold text-black rounded-2xl text-sm uppercase tracking-widest flex items-center justify-center gap-2"
          style={{background: "linear-gradient(135deg, #C9A84C, #D4AF37, #B8960C)", boxShadow: "0 4px 20px #D4AF3740"}}
        >
          <LogOut size={16} />
          LOGOUT
        </button>
      </div>
    </div>
  );
}
